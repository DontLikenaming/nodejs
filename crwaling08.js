// 셀레니엄을 이용해서 네이버 받은 메일 수 조회 후 출력

const {Builder, Browser, By, Key, until, promise} = require('selenium-webdriver');
const ncp = require('copy-paste');

// 일정시간 셀리니엄이 대기하도록 만드는 함수
let sleep = (ms) =>
    new Promise(resolve => setTimeout(resolve,ms));

async function main() {
    const URL = "http://www.naver.com/";
    const chrome = await new Builder().forBrowser(Browser.CHROME).build();

    try{
        await chrome.get(URL);

        await chrome.wait(until.elementLocated(By.css('.link_login')),5000);

        // 로그인 버튼 찾아서 클릭
        let logintbn = await chrome.findElement(By.css('.link_login'));
        await chrome.actions().move({origin:logintbn}).click().perform();

        await sleep(2000);

        //-------------------------------------------------------------------


        let inputid = await chrome.findElement(By.css('#id'));
        let inputpw = await chrome.findElement(By.css('#pw'));
        let btnlogin = await chrome.findElement(By.css('.btn_login'));


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