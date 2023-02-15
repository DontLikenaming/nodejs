// 코로나 19 시도별 확진자 데이터를 이용해서 특정 지역의 확진자 현황 출력
// https://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api
// serviceKey=79BlhIbotMxJTKhCQdR3iVwJf2Z%2FpRVSF%2FWqdETOTwQkdAteE0Nf43hlXP9VpszC7yYGloLYd5xUpfJlnIi9Bw%3D%3D&pageNo=1&numOfRows=500&apiType=xml&std_day=2023-02-12&gubun=서울


const axios = require('axios');
const cheerio = require('cheerio');
const {XMLParser} = require('fast-xml-parser'); //xml 처리기 라이브러리


async function main() {
    const URL = "http://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api";
    const params = {'serviceKey':'79BlhIbotMxJTKhCQdR3iVwJf2Z/pRVSF/WqdETOTwQkdAteE0Nf43hlXP9VpszC7yYGloLYd5xUpfJlnIi9Bw==',
        'apiType':'JSON',       //xml 또는 JSON(대문자)
        'std_day':'2023-02-12',
        'gubun':'',
        'numOfRows':500};

    const headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78'};

    const xml = await axios.get(URL, {
        params : params, headers : headers
    });

    console.log(xml.data);

    // const parser = new XMLParser();
    // let json = parser.parse(xml.data);

    let items = xml.data['items'];
    console.log(items);


    for(let item of items){
        console.log(`측정일자 : ${item.stdDay}
지역명 : ${item.gubun}
전일 확진자 수 : ${item.incDec}
누적 확진자 수 : ${item.defCnt}
누적 사망자 수 : ${item.deathCnt}
`);
    }

}
main();