const fs=require("fs")
const cheerio = require("cheerio");
const filePath="./updateTag"
let json_data = fs.readFileSync(`${filePath}/data.json`, 'utf-8');
let jsonData = JSON.parse(json_data);
let usedImg=[]
for(const item of jsonData){
    let page_data = fs.readFileSync(`${filePath}/after/${item.page}`, "utf-8")
    let $ = cheerio.load(page_data)
    let used=item.items
    $('img').each((index, element) => {
        used = used.filter(item => item.src !==$(element).attr("src"));  
});
    if(used.length!=0){
        usedImg.push({
            page:item.page,
            item:used
        })
    }
}
fs.writeFileSync(`${filePath}/compare/result.json`,JSON.stringify(usedImg))
