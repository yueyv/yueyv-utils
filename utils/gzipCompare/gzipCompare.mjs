import fs from 'fs'
import zlib from 'zlib';



function gzipCompare(originalFilePath){
  const originalContent = fs.readFileSync(originalFilePath);
zlib.gzip(originalContent, (err, compressedContent) => {
  if (err) {
    console.error('Error compressing the file:', err);
    return;
  }
  const originalSize = originalContent.length;
  const compressedSize = compressedContent.length;
  console.log(originalFilePath)
  console.log(`原始文件大小：${originalSize} 字节`);
  console.log(`Gzip 压缩后文件大小：${compressedSize} 字节`);
});
}
export {gzipCompare}

