const yueyv = require("../const/hui.json")
const hui = yueyv[0]["yueyv"]
const fs = require("fs")
const puppeteer = require('puppeteer');
const filePath = "./updateTag";
const dayjs = require("dayjs");
const alter = require("./marge.cjs");
const index=5
const allFileNameData = fs.readFileSync(`${filePath}/page/part${index}.txt`, 'utf8');
const allFileName = allFileNameData.split("\r\n")
let autoLog = []
const updateTag = async () => {
  const browser = await puppeteer.launch({ headless: false, ignoreHttpErrors: true ,executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' } );
  await login("https://qa-sap.yueyvlunhui.com/admin", browser)
  for (const [index, val] of allFileName.entries()) {
    try {
      let edit_time=await automatizationImg(val, browser)
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
  fs.writeFileSync(`${filePath}/page/autoLog${index}.json`, JSON.stringify(autoLog))
  browser.close()
}
async function automatizationImg(fileName,browser) {
  const qa_page = await browser.newPage();
  const search = fileName.replace(".html", "")
  await qa_page.goto(`https://qa-sap.yueyvlunhui.com/admin/content/search?search=${search}`);
  const qa_content = await qa_page.$eval('#content', el => el.value);
  let afterContent
  await Promise.all([
    fs.writeFileSync(`${filePath}/qa/${fileName}`, qa_content),
    (async () => {
      afterContent = await alter.alterImg(fileName, filePath);
    })()
  ]);
  const time = await qa_page.$$(".layui-word-aux");
  const edit_time = await time[2].evaluate(element => element.textContent)
  if (afterContent !== "error" && afterContent !== "" && afterContent !== undefined && afterContent !== null) {
    if(timeCompare(edit_time)){
      await qa_page.$eval('#content', (el, afterContent) => {
        console.log(afterContent);
        el.value = afterContent
      }, afterContent);
      console.log(`${fileName}写入成功`)
      await qa_page.click(".layui-input-block a.layui-btn")
    }else{
      qa_page.close()
      throw new errorMessage(`时间过近,未更新`,edit_time);
    }
  }
  else {
    qa_page.close()
    console.log(`${fileName}失败，请检查`);
    throw new errorMessage(`更改html出错`,edit_time);
  }
  qa_page.close()
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
  if (timeDifferenceInDays > 10) {
    return true
  } else {
    return false
  }
}
function errorMessage(message,last_update){
  this.message = message;
  this.edit_time = last_update;
}
export {updateTag}