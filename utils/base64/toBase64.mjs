import {writeFileSync,readFileSync,readFile,writeFile} from 'fs';
import path from 'path'; 
/**
 * 
 * @param {string} filePath 文件路径
 * @param {string} saveDir 保存路径
 * @param {string} format base64文件信息 data: image / jpeg; base64
 */
function fileToBase64(filePath, saveDir, format) {
  readFile(filePath, (error, data) => {
    if (error) {
      console.error('读取文件时出错:', error);
      return;
    }
    const base64Data = data.toString('base64');
    const fileName = path.basename(filePath);
    const savePath = path.join(saveDir, `${fileName}.base64`);
    writeFile(savePath, `${format},${base64Data}`, (error) => {
      if (error) {
        console.error('保存出错:', error);
        return;
      }
      console.log(`成功: ${savePath}`);
    });
  });
}
/**
 * 
 * @param {string} filePath 文件路径
 * @param {string} savePath 保存路径
 */
function base64ToFile(filePath, savePath) {
  const data = readFileSync(filePath, 'utf-8')
  let base64Data = data;
  let bufferData = Buffer.from(base64Data, 'base64');
  writeFileSync(savePath,bufferData)
}
export { fileToBase64,base64ToFile }

