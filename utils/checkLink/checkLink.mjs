import {Axios} from 'axios';
/**
 * 
 * @param {string} url 需检查的链接url
 * @returns url状态
 */
async function getPageSource(url) {
    try {
        const response = await Axios.get(url);
        return response
    } catch (error) {
        console.error('Error:', error.message);
        return { status: "error", error: error.message }
    }
}
/**
 * 
 * @param {string} url 页面url
 * @returns 页面所有的超链接
 */
async function getPageUrl(url) {
    let result
    let link = []
    let cheerio = require("cheerio")
    let response = await getPageSource(url);
    if (response.status === 200) {
        const $ = cheerio.load(response.data)
        $("a").each((index, element) => {
            let href = $(element).attr("href")
            if (typeof (href) === 'undefined' || href === "#" || href === "javascript:void(null)" || href === "javascript:;" || href === '/' || href === '') {
            } else {
                if (href[0] === '/')
                    if (href.includes("/location?href=")) {
                        href = urlString.origin + href.replace("/location?href=", "")
                        link.push({ href: href, type: "文件" })
                    }
                    else {
                        href = urlString.origin + href
                        link.push({ href: href })
                    }
            }

        })
        let uniqueLinksSet = new Set();
        for (let i = 0; i < link.length; i++) {
            let linkString = JSON.stringify(links[i]);
            uniqueLinksSet.add(linkString);
        }
        let uniqueLinksArray = Array.from(uniqueLinksSet).map(linkString => JSON.parse(linkString));
        result = {
            url: url,
            link: uniqueLinksArray
        }
    } else {
        result = {
            url: url,
            link: "ERROR"
        }
    }
    return result
}
/**
 * 
 * @param {string} url 
 * @returns 
 */
async function getRedirectUrl(url) {
    try {
        const response = await Axios.get(url,{maxRedirects: 0});
        return response
    } catch (error) {
        return { status: "error", error: error.message }
    }
}
/**
 * 
 * @param {JSON} data 获取的链接
 */
async function checkUrl(data){
    let links=data.link
    if(links!=="ERROR"){
        for(let link of links){
            let result= await getPageSource(link.href)
            console.log(result.status);
        }
    }
}

export{getPageSource,checkUrl,getRedirectUrl,getPageUrl}