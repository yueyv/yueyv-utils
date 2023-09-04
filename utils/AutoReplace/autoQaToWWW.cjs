const yueyv = require("../const/hui.json")
const hui = yueyv[0]["yueyv"]
const fs = require("fs")
const puppeteer = require('puppeteer');
const dayjs = require("dayjs");
const filePath = "./8-17";
const allFileNameData = fs.readFileSync(`${filePath}/page.txt`, 'utf8');
const allFileName = allFileNameData.split("\r\n")
let autoLog = []
const qaToWWW = async () => {
  const browser = await puppeteer.launch({ headless: false, ignoreHttpErrors: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  await login("https://qa-sap.yueyvlunhui.com/admin", browser)
  await login("https://www.yueyvlunhui.com/admin", browser)
  for (const [index, val] of allFileName.entries()) {
    try {
      const edit_time=await autoCopy(val, browser)
      autoLog.push({
        page:val,
        last_update:edit_time
      })
    } catch (e) {
      autoLog.push({
        page: val,
        error: e
      })
    }
  }
  fs.writeFileSync(`${filePath}/autoLog.json`, JSON.stringify(autoLog))
  browser.close()
}
async function autoCopy(fileName, browser) {
  const qa_page = await browser.newPage();
  const search = fileName.replace(".html", "")
  await qa_page.goto(`https://qa-sap.yueyvlunhui.com/admin/content/search?search=${search}`);
  const qa_content = await qa_page.$eval('#content', el => el.value);
  fs.writeFileSync(`${filePath}/qa/${fileName}`, qa_content)
  qa_page.close()
  const www_page = await browser.newPage();
  await www_page.goto(`https://www.yueyvlunhui.com/admin/content/search?search=${search}`);
  const www_content = await www_page.$eval('#content', el => el.value);
  fs.writeFileSync(`${filePath}/www/${fileName}`, www_content)
  const time = await www_page.$$(".layui-word-aux");
  const edit_time = await time[2].evaluate(element => element.textContent)
  if(timeCompare(edit_time)){
    await www_page.$eval('#content', (el, content) => {
      el.value = content
    }, qa_content);
    await www_page.click(".layui-input-block a.layui-btn")
  }else{
    www_page.close()
    throw new errorMessage(`时间过近,未更新`,edit_time);
  }
  www_page.close()
  return edit_time
};
async function login(loginPage, browser) {
  const login = await browser.newPage();
  await login.goto(loginPage);
  await login.type('input[name="username"]', hui.username);
  await login.type('input[name="password"]', hui.password);
  await Promise.all([
    login.waitForNavigation(),
    login.click('button[type="submit"]')
  ]);
  login.close()
}
function timeCompare(edit_time) {
  let last_update = dayjs(edit_time)
  let now = dayjs()
  const timeDifferenceInDays = now.diff(last_update, 'day');
  if (timeDifferenceInDays > 15) {
    return true
  } else {
    return false
  }
}
function errorMessage(message,last_update){
    this.message = message;
    this.edit_time = last_update;
}
export {qaToWWW,autoCopy,login}