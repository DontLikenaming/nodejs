// hanbit.co.kr 에서 `새로나온 책` 제목 긁어오기
// https://www.hanbit.co.kr/store/books/new_book_list.html
// 수집된 데이터들은 newbooks라는 테이블에 저장해둘 것

const axios = require('axios');
const cheerio = require('cheerio');
const mariadb = require('mariadb');
const dbconfig2 = require('./dbconfig2.js');

async function main() {
    const URL = "https://www.hanbit.co.kr/store/books/new_book_list.html";
    const headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78'};

    //수집한 개별정보를 저장하기 위해 배열 선언 - 전개구문(spread syntax)
    let [titles, writers, prices, books] = [[],[],[],[]];

    const html = await axios.get(URL, {headers : headers});

    const dom = cheerio.load(html.data);

    let elements = dom('.book_tit');

    elements.each((idx, title)=>{
        titles.push(dom(title).text());
    })

    elements = dom('.book_writer');
    elements.each((idx, writer)=>{
        writers.push(dom(writer).text());
    })

    elements = dom('.price');
    elements.each((idx, price)=>{
        prices.push(dom(price).text());
    })


    for(let i=0;i<titles.length;i++){
        let book = {};
        book.title = titles[i];
        book.writer = writers[i].replace(/ /g,'');
        book.price = prices[i].replace(/[,원]/g,'');
        books.push(book);
    }

    //console.log(books);


    let sql1 = " create table newbooks (bookno int auto_increment, title varchar(250) not null, writer varchar(100) not null, price int not null, regdate datetime default current_timestamp, primary key (bookno))";
    let sql2 = "insert into newbooks(title, writer, price) values (?, ?, ?)";
    let conn = null;
    try{
        conn = await mariadb.createConnection(dbconfig2);


        let result = await conn.execute(sql1);

        for(bk of books) {
            params = [bk.title, bk.writer, bk.price];
            result = await conn.execute(sql2, params);
            await conn.commit();
        }

        //console.log(result);




    }
    catch (e){console.error(e);}
    finally {
        if(conn){
            try{
                await conn.close();
                console.log('오라클 데이터베이스 접속 해제 성공')
            }
            catch (e){console.error(e);}
        }
    }


}
main();