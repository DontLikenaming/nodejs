// movie.daum.net 에서 `상영 중인 영화`에 대한 정보를 긁어오기
// https://movie.daum.net/main
// 순위, 영화제목, 평점, 예매율

const axios = require('axios');
const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

async function main() {
    const URL = "https://movie.daum.net/main";

    let titles = [], ranks = [], tickets = [], rates = [];

    const chrome = await new Builder().forBrowser(Browser.CHROME).build();

    try{
        await chrome.get(URL);

        await chrome.wait(until.elementLocated(By.css('.tit_item')),5000);

        let title = await chrome.findElements(By.css('.feature_home .tit_item'));
        let Rate = await chrome.findElements(By.css('.feature_home .txt_num:first-child'));
        let ticket = await chrome.findElements(By.css('.feature_home .txt_num:last-child'));
        let rank = await chrome.findElements(By.css('.feature_home .rank_num'));


        for(let movie_title of title){
            /*console.log(await movie_title.getText());*/   //어떤 입력도 없는 화면에 보이는 요소의 텍스트만 출력됨
            let titldata = (await movie_title.getAttribute('textContent')).trim();
            titles.push(titldata);
        }

        for(let movie_Rate of Rate){
            let ratedata = (await movie_Rate.getAttribute('textContent')).trim();
            rates.push(ratedata);

        }

        for(let movie_ticket of ticket){
            let tcktdata = (await movie_ticket.getAttribute('textContent')).trim();
            tickets.push(tcktdata);
        }

        for(let movie_rank of rank){
            let rankdata = (await movie_rank.getAttribute('textContent')).trim();
            ranks.push(rankdata);
        }

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
        await chrome.quit();
    }
}
main();