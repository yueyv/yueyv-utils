import {readFileSync,writeFileSync} from "fs"
/**
 * 删除多次换行
 * @param {string} filePath 文件路径
 */
const removeMultipleLine=(filePath)=>{
    const fileData=readFileSync(filePath,'utf-8')
    const removeLineRegex=/^(\n|\r){2,}/gmis
    let newFileData=fileData.replace(removeLineRegex,'')
    writeFileSync(filePath,newFileData)
}
export {removeMultipleLine}