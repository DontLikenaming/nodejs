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
        let addrs = await chrome.findElements(By.css('.aptS_rLAdd'));

        for(let apt of apts){
            console.log(await apt.getAttribute('textContent'));
        }

        await sleep(1500);

        for(let add of addrs){
            console.log(await add.getAttribute('textContent'));
        }




        //-------------------------------------------------------------------


        /*let inputid = await chrome.findElement(By.css('#id'));
        let inputpw = await chrome.findElement(By.css('#pw'));
        let btnlogin = await chrome.findElement(By.css('.btn_login'));*/


        // 작동은 하지만 네이버 2차인증에 막힘
/*        // sendKeys를 이용한 직접 입력
        await chrome.actions().sendKeys(inputid, id).perform();
        sleep(1000);

        await chrome.actions().move({origin:inputpw}).click().sendKeys(pswd).perform();
        sleep(2000);

        // 아이디/비밀번호를 클립보드로 복사/붙여넣기
        ncp.copy(id);
        await chrome.actions().click(inputid).keyDown(Key.CONTROL).sendKeys('v').perform();
        await sleep(3000);

        ncp.copy(pswd);
        await chrome.actions().click(inputpw).keyDown(Key.CONTROL).sendKeys('v').perform();
        await sleep(2000);

        await chrome.actions().move({origin:btnlogin}).click().perform();
        await sleep(2000);*/

}catch(e){
console.log(e);
}finally {
await chrome.sleep(3000);
await chrome.quit();
}
}
main();