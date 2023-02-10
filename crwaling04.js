// 미세먼지 공공데이터를 이용해서 특정 지역의 미세먼지 정보 출력
// https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty
// ?serviceKey=79BlhIbotMxJTKhCQdR3iVwJf2Z%2FpRVSF%2FWqdETOTwQkdAteE0Nf43hlXP9VpszC7yYGloLYd5xUpfJlnIi9Bw%3D%3D&returnType=json&numOfRows=100&pageNo=1&sidoName=서울&ver=1.0


// 사용할 패키지 가져오기 : require('패키지 이름') <-` 말고 '를 써야 함
const axios = require('axios');
const cheerio = require('cheerio');



async function main() {
    // 접속할 url, quarystring, 요청 헤더 지정
    const URL = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";
    const params = {'serviceKey':'79BlhIbotMxJTKhCQdR3iVwJf2Z/pRVSF/WqdETOTwQkdAteE0Nf43hlXP9VpszC7yYGloLYd5xUpfJlnIi9Bw==',
                     'returnType':'json',
                     'sidoName':'전국',
                     'numOfRows':500};

    const headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78'};

    // axios로 접속해서 대기오염 정보를 받아옴
    const json = await axios.get(URL, {
        params : params, headers : headers
    });

    // 받아온 데이터 확인
/*    console.log(json.data);*/
    let items = json.data['response']['body']['items']
    /*console.log(items);*/

    //미세먼지 정보 출력
    //pm25Value는 출력 안됨
    for(let item of items){
        console.log(item.sidoName, item.stationName, item.pm10Value, item.pm25Value, item.dataTime);
    }
}
main();