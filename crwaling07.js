// movie.daum.net 에서 `상영 중인 영화`에 대한 정보를 긁어오기
// https://movie.daum.net/main
// 순위, 영화제목, 평점, 예매율

const cheerio = require('cheerio');
const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

async function main() {
    const URL = "https://movie.daum.net/main";

    let titles = [], ranks = [], tickets = [], rates = [];

    const chrome = await new Builder().forBrowser(Browser.CHROME).build();

    try{
        //지정한 url로 접속
        await chrome.get(URL);

        //특정 요소가 화면에 위치할 때까지 최대 5초간 대기
        await chrome.wait(until.elementLocated(By.css('.tit_item')),5000);

        //접속한 사이트의 html 소스를 가져오기
        const html = await chrome.getPageSource();
        /*console.log(html);*/

        //페이지 소스를 dom 객체로 변환
        const dom = cheerio.load(html);

        //영화 제목들 추출
        let title = dom('.feature_home .tit_item');
        let Rate = dom('.feature_home .txt_num:first-child');
        let ticket = dom('.feature_home .txt_num:last-child');
        let rank = dom('.feature_home .rank_num');


        //추출된 제목들 출력
        title.each((idx, movie_title)=>{
            titles.push(dom(movie_title).text().trim());
        });

        Rate.each((idx, movie_rate)=>{
            rates.push(dom(movie_rate).text().trim());
        });

        ticket.each((idx, movie_ticket)=>{
            tickets.push(dom(movie_ticket).text().trim());
        });

        rank.each((idx, movie_rank)=>{
            ranks.push(dom(movie_rank).text().trim());
        });

        for(i=0;i<titles.length;i++){
            console.log(`${ranks[i]}위`);
            console.log(`제목 : ${titles[i]}`);
            console.log(`평점 : ${rates[i]}점`);
            console.log(`예매율 : ${tickets[i]}`);
            console.log(``);
        }

    }catch(e){
        console.log(e);
    }finally {
        await chrome.quit();    //크롬 브라우저 닫기
    }
}
main();