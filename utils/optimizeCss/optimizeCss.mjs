
import {readFileSync,writeFileSync,appendFileSync} from 'fs'
const cssFile="./test/indexPerformance-new.css"
const newCssFile="./test/new.css"
/**
 * 将scss编译后的css合并@media
 * @param {string} cssFile css文件路径
 * @param {string} newCssFile 新的css文件路径
 */
function optimzizeCss(cssFile,newCssFile){
   writeFileSync(newCssFile,"")
    const cssData=readFileSync(cssFile,"utf-8")
    const mediaRegex = /^@media[\s\S]+?\{([^}]+\{[^\}]+\})+[^\}]*\}/gmis
    const mediaTitleRegex = /^@media[\s\S]+?(?=\{)/g
    const mediaContentRegex = /(\.|\#)[^\{]+?\{[^\}]+?\}/gmis;
    const exegesisRegex2= /\/\*.*?\*\//gmis
    const media=cssData.match(mediaRegex)
    // console.log(media);
    let mediaTree=[]
    for(const item of media){
        const media_title=item.match(mediaTitleRegex).toString().replace(/[\s]*$/g,"")
        const media_content=item.match(mediaContentRegex).join("")
        let tree
        if (mediaTree.find(item => item.media ===media_title)) {
            tree = mediaTree.find(item => item.media === media_title)
            tree.content.push(media_content)
        } else {
            tree = new Node(media_title)
            tree.content.push(media_content)
            mediaTree.push(tree)
        }
    }
    function Node(element){
        this.media=element
        this.content=[]
    }
    const otherData=cssData.replace(mediaRegex,"").replace(/[\n]+/g,"\n").replace(exegesisRegex2,"")
   appendFileSync(newCssFile,otherData)
    for(const item of mediaTree){
       appendFileSync(newCssFile,`${item.media}{\n`)
       appendFileSync(newCssFile,`${item.content.join("")}\n`)
       appendFileSync(newCssFile,`}\n`)
    }
    
}
export {optimzizeCss}