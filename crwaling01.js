// hanbit.co.kr 에서 `새로나온 책` 제목 긁어오기
// https://www.hanbit.co.kr/store/books/new_book_list.html

// 사용할 패키지 가져오기 : require('패키지 이름') <-` 말고 '를 써야 함
const axios = require('axios');

const main = () =>{
    // 접속할 url 지정
    const URL = "https://www.hanbit.co.kr/store/books/new_book_list.html";

    //axios로 접속해서 html을 불러옴
    axios.get(URL)
         .then((html) => {
             console.log(html.data);

    })
         .catch((error)=>{console.log(error);});
}
main();