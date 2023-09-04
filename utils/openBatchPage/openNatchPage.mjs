import {writeFileSync,readFileSync, appendFileSync} from 'fs';
import {join} from 'path';
const _filePath="./utils/批量打开"
const _fileName="./openNatchPage.bat"

const openBatchPage=(_filePath,_fileName)=>{
    const filePath=join(_filePath,_fileName)
    const newFilePath=join(_filePath,`${_fileName}.open.bat`)
    const PageData=readFileSync(filePath,'utf-8').split(/(\r|\n)+/gm)
    writeFileSync(newFilePath,"")
    appendFileSync(newFilePath,"@echo off\n title 打开网页\n")
    for(const item of PageData){
        appendFileSync(newFilePath,`start chrome.exe ${item}\n`)
    }
}
export {openBatchPage}