// http://www.k-apt.go.kr/

const {Builder, Browser, By, Key, until, promise, Select} = require('selenium-webdriver');
const ncp = require('copy-paste');
const cheerio = require("cheerio");
let sleep = (ms) =>
    new Promise(resolve => setTimeout(resolve,ms));

async function main() {
    const URL = "http://www.k-apt.go.kr/";
    const chrome = await new Builder().forBrowser(Browser.CHROME).build();

    try{
        await chrome.get(URL);

        await chrome.wait(until.elementLocated(By.css('.header')),5000);

/*        let nav = await chrome.findElement(By.css('.fr'));
        let danji = await nav.findElement(By.tagName("a"));*/
        let danji = await chrome.findElement(By.xpath('//a[@title="단지정보"]'));
        await chrome.actions().move({origin:danji}).perform();

        await sleep(1000);

/*        let movewoori = await nav.findElement(By.css(".wp220"));
        let woori = await movewoori.findElement(By.tagName("a"));*/
        let woori = await chrome.findElement(By.xpath('//a[@title="우리단지 기본정보"]'));
        await chrome.actions().move({origin:woori}).click().perform();

        await sleep(3000);

        //-------------------------------------------------------------------

        let syear = '2023년';
        let smonth = '01월';
        let sido = '서울특별시';
        let gugun = '강남구';
        let dong = '삼성동';
        let apt = '아이파크삼성동';


        let select = await chrome.findElement(By.name('searchYYYY'));
        let fstopt = await new Select(select).selectByVisibleText(syear);

        await chrome.actions().move({origin:select}).click().perform();
        await sleep(500);
        await chrome.actions().move({origin:fstopt}).click().perform();
        await sleep(1500);

        select = await chrome.findElement(By.name('searchMM'));
        let scdopt = await new Select(select).selectByVisibleText(smonth);

        await chrome.actions().move({origin:select}).click().perform();
        await sleep(500);
        await chrome.actions().move({origin:scdopt}).click().perform();
        await sleep(1500);

        select = await chrome.findElement(By.name('combo_SIDO'));
        let thropt = await new Select(select).selectByVisibleText(sido);

        await chrome.actions().move({origin:select}).click().perform();
        await sleep(500);
        await chrome.actions().move({origin:thropt}).click().perform();
        await sleep(1500);

        select = await chrome.findElement(By.name('combo_SGG'));
        let foropt = await new Select(select).selectByVisibleText(gugun);

        await chrome.actions().move({origin:select}).click().perform();
        await sleep(500);
        await chrome.actions().move({origin:foropt}).click().perform();
        await sleep(1500);

        select = await chrome.findElement(By.name('combo_EMD'));
        let fifopt = await new Select(select).selectByVisibleText(dong);

        await chrome.actions().move({origin:select}).click().perform();
        await sleep(500);
        await chrome.actions().move({origin:fifopt}).click().perform();
        await sleep(1500);

        let apts = await chrome.findElements(By.css('.aptS_rLName'));

/*        for(let apt of apts){
            console.log(await apt.getAttribute('textContent'));
        }*/

        await sleep(1500);

        // 아이파크 삼성동 항목을 찾아 인덱스값 추출
        let idx = 0;
        for(let val of apts){
            console.log(`${idx++}${await val.getAttribute('textContent')}`);
            if(await val.getText()==apt)break;
        }

        // 추출한 인덱스값을 이용해서 항목 직접 클릭
        //await chrome.executeScript('arguments[0].click();', apts[--idx]);
        let list = await chrome.findElement(By.css(`.mCSB_container ul li:nth-child(${idx}) a`));
        await chrome.actions().move({origin:list}).click().perform();

        await sleep(1000);

        //-------------------------------------------------------------------

        //관리시설 정보 클릭
        await chrome.wait(until.elementLocated(By.css('.lnbNav li:nth-child(3) a')),5000);

        let menu = await chrome.findElement(By.css('.lnbNav li:nth-child(3) a'));
        await chrome.actions().move({origin:menu}).click().perform();

        //지상/지하 주차장 대수 추출
        let pcnt = await chrome.findElement(By.css('#kaptd_pcnt')).getText();
        let pcntu = await chrome.findElement(By.css('#kaptd_pcntu')).getText();
        let tpcnt = await chrome.findElement(By.css('#kaptd_total_pcnt')).getText();

        console.log(pcnt, pcntu, tpcnt);

        await sleep(3000);

}catch(e){
console.log(e);
}finally {
await chrome.sleep(3000);
await chrome.quit();
}
}
main();