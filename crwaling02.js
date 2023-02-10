// hanbit.co.kr 에서 `새로나온 책` 제목 긁어오기
// https://www.hanbit.co.kr/store/books/new_book_list.html

// 사용할 패키지 가져오기 : require('패키지 이름') <-` 말고 '를 써야 함
const axios = require('axios');         //axios 관련 라이브러리
const cheerio = require('cheerio');     //DOM 관련 라이브러리


async function main() {
    // 접속할 url 지정
    const URL = "https://www.hanbit.co.kr/store/books/new_book_list.html";

    //axios로 접속해서 html을 불러옴
    const html = await axios.get(URL);  //비동기 I/O 지원

    //불러온 html을 parsing해서 DOM 생성
    const dom = cheerio.load(html.data);
    /*console.log(dom);*/

    //css 선택자로 도서제목을 담고 있는 요소 지정
    let elements = dom('.book_tit');

    //찾은 요소를 순회하면서 요소의 텍스트 출력
    elements.each((idx, title)=>{
        console.log(dom(title).text());
    })

    elements = dom('.book_writer');
    elements.each((idx, writer)=>{
        console.log(dom(writer).text());
    })

    elements = dom('.price');
    elements.each((idx, price)=>{
        console.log(dom(price).text());
    })
}
main();