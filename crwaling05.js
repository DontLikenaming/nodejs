// 미세먼지 공공데이터를 이용해서 특정 지역의 미세먼지 정보 출력
// https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty
// ?serviceKey=79BlhIbotMxJTKhCQdR3iVwJf2Z%2FpRVSF%2FWqdETOTwQkdAteE0Nf43hlXP9VpszC7yYGloLYd5xUpfJlnIi9Bw%3D%3D&returnType=json&numOfRows=100&pageNo=1&sidoName=서울&ver=1.3


// 사용할 패키지 가져오기 : require('패키지 이름') <-` 말고 '를 써야 함
const axios = require('axios');
const cheerio = require('cheerio');
const {XMLParser} = require('fast-xml-parser'); //xml 처리기 라이브러리


async function main() {
    // 접속할 url, quarystring, 요청 헤더 지정
    // 인증 v 인가
    const URL = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";
    const params = {'serviceKey':'79BlhIbotMxJTKhCQdR3iVwJf2Z/pRVSF/WqdETOTwQkdAteE0Nf43hlXP9VpszC7yYGloLYd5xUpfJlnIi9Bw==',
        'returnType':'xml',
        'sidoName':'서울',
        'numOfRows':500,
        'ver':1.3};

    const headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78'};

    // axios로 접속해서 대기오염 정보를 받아옴
    const xml = await axios.get(URL, {
        params : params, headers : headers
    });

/*    console.log(xml.data);*/

    // XML을 JSON으로 변환하기
    const parser = new XMLParser();
    let json = parser.parse(xml.data);

    let items = json['response']['body']['items'];
/*    console.log(items);*/

    // 등급별 이모지
    let grade = (val) =>{
        if(val===null||val==='')val=5;
        let num = parseInt(val);

        let emojis = ['😀', '😐', '😮', '😱', '-'];

        return emojis[num-1];
    }

    // console로 출력하기
    for(let item of items['item']){
        console.log(item.sidoName, item.stationName, item.pm10Value, grade(item.pm10Grade), item.pm25Value, grade(item.pm25Grade), item.dataTime);
    }

}
main();