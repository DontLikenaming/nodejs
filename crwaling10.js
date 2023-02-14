// hanbit.co.kr 에서 `새로나온 책` 제목 긁어오기
// https://www.hanbit.co.kr/store/books/new_book_list.html
// 수집된 데이터들은 newbooks라는 테이블에 저장해둘 것

const axios = require('axios');
const cheerio = require('cheerio');
const oracledb = require('oracledb');
const dbconfig = require('./dbconfig.js');

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


    //let sql1 = "create table newbooks (bookno number(6), title varchar(250) not null, writer varchar(100) not null, price number(6) not null, regdate date default sysdate, primary key (bookno))";
    //let sql2 = "create sequence bkno";
    let sql3 = "insert into newbooks(bookno, title, writer, price) values (bkno.nextval, :1, :2, :3)";
    //let sql4 = "select SEQUENCE_NAME, last_number from USER_SEQUENCES";
    //let sql5 = "drop table newbooks"


    let conn = null;

    try{
        oracledb.initOracleClient({libdir:'C:/Java/instantclient_19_17'});
        conn = await oracledb.getConnection(dbconfig);

        /*let result = await conn.execute(sql1);
        await conn.commit();*/

        /*result = await conn.execute(sql2);
        await conn.commit();*/

        for(bk of books){
            params = [bk.title, bk.writer, bk.price];
            result = await conn.execute(sql3,params);
            await conn.commit();
        }

        /*result = await conn.execute(sql4);
        console.log(result);*/

        /*let result = await conn.execute(sql5);
        await conn.commit();*/

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