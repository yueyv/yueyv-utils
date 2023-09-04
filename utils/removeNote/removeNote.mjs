import {writeFileSync,readFileSync,mkdirSync,existsSync} from 'fs'
// const filePath = "./utils/removeNote/test.js"
/**
 * 
 * @param {string} fileName 相对根目录
 */
function removeNote(fileName) {
    const exegesisRegex = [/\/\/.+/gmi, /\/\*.*?\*\//gmis]
    const savePath = filePath.match(/.*\//gis).toString().replace(",", "")
    const newFileName = filePath.match(/(?<=\/)[^\/]*$/g).toString()
    const newSavePath = savePath + "new_" + newFileName
    const notePath = `./.note/${fileName.replace(/\.|\//gmis,"-").replace(/(\.[^\.]*$)/g, "")}.txt`
    const data = readFileSync(filePath, "utf-8")
    let newData = data
    let node = []
    for (const item of exegesisRegex) {
        node.push(data.match(item))
        newData = newData.replace(item, "")
    }
    newData=newData.replace(/^(\n|\r){2,}/gmis,"")
    writeFileSync(newSavePath, newData)
    if (!existsSync("./.note")) {
        mkdirSync("./.note")
    }
    writeFileSync(notePath, node.join("\n"))
}
export {removeNote}
