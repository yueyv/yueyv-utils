const cheerio = require("cheerio");
const fs = require("fs")

const alterImg=async(fileName,filePath)=>{
    let json_data = fs.readFileSync(`${filePath}/data.json`, 'utf-8');
    let jsonData = JSON.parse(json_data);
    let page_data = fs.readFileSync(`${filePath}/qa/${fileName}`, "utf-8")
    let $ = cheerio.load(page_data)
    let page = `${fileName}`
    let filteredItems = jsonData.find(item => item.page === page)?.items || [];
    // console.log(filteredItems);
    
    $('img').each((index, element) => {
            let src = $(element).attr("src");
            
            let filteredArray = filteredItems.filter(item => item.src === src);
            // console.log(filteredArray);
            if (filteredArray[0] != undefined) {
                // console.log($(element).attr());
                // console.log(src);
                const { _, label } = filteredArray[0]
                $(element).attr("alt",label)
                $(element).attr("title",label)
                // console.log($(element).attr());
            }
            
    });
    try {
        let result=$.html().replace("<body>","").replace("</body>","").replace("<html>","").replace("</html>","").replace("<head>","").replace("</head>","")
        fs.writeFileSync(`${filePath}/after/${fileName}`,result)
        return result
    } catch {
        return "error"
    }
}
module.exports.alterImg=alterImg