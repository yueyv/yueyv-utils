
let fs = require("fs");
let img_data = fs.readFileSync('./updateTag/data3rd.txt', 'utf-8')
data = Array.from(img_data.replace("\'","").split('\r\n'))
let obj_arr = []
data.forEach(item => {
    // console.log(item);
    if (item.indexOf("label") > 0) {
        let page_start_index = item.indexOf('page="') + 'page="'.length;
        let page_end_index = item.indexOf('"', page_start_index);
        let page = item.substring(page_start_index, page_end_index);
        // console.log(item.indexOf("title"));
        let src_start_index = item.indexOf('src="') + 'src="'.length;
        let src_end_index = item.indexOf('"', src_start_index);
        let src = item.substring(src_start_index, src_end_index);

        // 提取label属性的值
        let label_start_index = item.indexOf('label="') + 'label="'.length;
        let label_end_index = item.indexOf('"', label_start_index);
        let label = item.substring(label_start_index, label_end_index);
        let obj = {
            page: page,
            src: src,
            label: label,
        };
        obj_arr.push(obj)
    }
});
let mergedArray = obj_arr.reduce((acc, curr) => {
    let existingPage = acc.find(item => item.page === curr.page);
  
    if (existingPage) {
      existingPage.items.push({
        src: curr.src,
        label: curr.label,
        title: curr.title
      });
    } else {
      acc.push({
        page: curr.page,
        items: [{
          src: curr.src,
          label: curr.label,
          title: curr.title
        }]
      });
    }
  
    return acc;
  }, []);
// 将 JSON 字符串写入文件
fs.writeFileSync('./updateTag/data.json', JSON.stringify(mergedArray))
console.log("转换完成");