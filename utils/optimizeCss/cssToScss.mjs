import {writeFileSync,readFileSync} from "fs"
/** 构造树
 * @param {string} loadFile 相对运行文件路径
 * @param {string} saveFile 相对运行文件路径
 */
function cssToJson(loadFile, saveFile) {
    const mediaRegex = /^@media[\s\S]+?\{([^}]+\{[^\}]+\})+[^\}]*\}/gmis
    const mediaTitleRegex = /^@media[\s\S]+?\{/g
    const mediaContentRegex = /(\.|\#)[^\{]+?\{[^\}]+?\}/gmis;
    const regex = /^(\.|\#)[\s\S]+?\}/gmis;
    const exegesisRegex1 = /\/\/.+/gmi
    const exegesisRegex2 = /\/\*.*?\*\//gmis
    const classRegex = /^(\.|\#)[\s\S]+?\{/gs;
    const contentRegex = /\{[\s\S]+?\}/gs;
    let toJSON = []
    let cssFileData = readFileSync(loadFile, "utf-8").replace(exegesisRegex1, "").replace(exegesisRegex2, "")
    let media = cssFileData.match(mediaRegex)
    let data = cssFileData.replace(mediaRegex, "").match(regex)
    try {
        for (const item of data) {
            // console.log(item);
            let item_class = item.match(classRegex).toString().replace("{", "").replace("\r", "").replace("\n", "").replace(/[\s]+$/g, "").split(",")
            let item_content = item.match(contentRegex).toString().replace("{", "").replace("}", "")
            for (const classes of item_class) {
                let classOrder = classes.replace(/^[\s]*/g, "").split(/(?<=[^+-])\s+(?=[^+-])/g)
                let tree
                if (toJSON.find(item => item.class === classOrder[0])) {
                    tree = toJSON.find(item => item.class === classOrder[0])
                    buildTree(classOrder.slice(1), item_content, tree)
                } else {
                    tree = new Node(classOrder[0])
                    buildTree(classOrder.slice(1), item_content, tree)
                    toJSON.push(tree)
                }

            }
        }
    } catch (e) {
        // console.log(e);
        console.log("不存在普通css");
    }
    try {
        for (const item of media) {
            const media_title = item.match(mediaTitleRegex).toString().replace("{", "")
            const media_content = item.match(mediaContentRegex)
            for (const content_item of media_content) {
                const media_class = content_item.match(classRegex).toString().replace("{", "").replace(/[\s]*$/g, "").split(",")
                const media_class_content = content_item.match(contentRegex).toString().replace("{", "").replace("}", "")
                for (const classes of media_class) {
                    let classOrder = classes.replace(/^[\s]*/g, "").replace(/[\s]+<[\s]+/g, "<").split(/(?<=[^+-])\s+(?=[^+-])/g)
                    let tree
                    if (toJSON.find(item => item.class === classOrder[0])) {
                        tree = toJSON.find(item => item.class === classOrder[0])
                        MediaBuildTree(media_title, classOrder.slice(1), media_class_content, tree)
                    } else {
                        tree = new Node(classOrder[0])
                        MediaBuildTree(media_title, classOrder.slice(1), media_class_content, tree)
                        toJSON.push(tree)
                    }
                }
            }
        }
    } catch (e) {
        console.log("不存在媒体查询")
    }

    function MediaBuildTree(media_title, classes, content, node = null) {
        let length = classes.length
        if (length === 0) {
            node.media.push({
                media: media_title,
                mediaContent: content
            })
        } else {
            if (searchTree(node, classes[0])) {
                let existNode = node.child.find(item => item.class === classes[0])
                let newArr = classes.slice(1);
                MediaBuildTree(media_title, newArr, content, existNode)
            } else {
                let newNode = new Node(classes[0])
                node.child.push(newNode)
                let newArr = classes.slice(1);
                MediaBuildTree(media_title, newArr, content, newNode)
            }
        }
    }
    function buildTree(classes, content, node = null) {
        let length = classes.length
        if (length === 0) {
            node.content.push(content)
        } else {
            if (searchTree(node, classes[0])) {
                let existNode = node.child.find(item => item.class === classes[0])
                let newArr = classes.slice(1);
                buildTree(newArr, content, existNode)
            } else {
                let newNode = new Node(classes[0])
                node.child.push(newNode)
                let newArr = classes.slice(1);
                buildTree(newArr, content, newNode)
            }


        }

    }
    function searchTree(node, element) {
        if (node.child.find(item => item.class === element)) {
            return true
        } else {
            return false
        }
    }
    function Node(element) {
        this.class = element
        this.child = []
        this.content = []
        this.media = []
    }
    writeFileSync(saveFile, JSON.stringify(toJSON))
}
/** 根据树生成scss
 * @param {string} loadFile 相对文件路径
 * @param {string} scssPath 相对运行文件路径
 */
function JsonToScss(loadFile, scssPath) {
    const cssJson = require(loadFile)
    writeFileSync(scssPath, '');
    for (const item of cssJson) {
        appendFileSync(scssPath, `${item.class}{\n`)
        if (item.content) {
            appendFileSync(scssPath, `${item.content.join("")}\n`)
        }
        if (item.media != [] || item != undefined) {
            appendMedia(item.media)
        }
        if (item.child != [] || item != undefined) {
            appendChild(item.child)
        }
        appendFileSync(scssPath, `}\n`)
    }

    function appendChild(child) {
        for (const item of child) {
            appendFileSync(scssPath, `${item.class}{\n`)
            if (item.content) {
                appendFileSync(scssPath, `${item.content.join("")}\n`)
            }
            if (item.media != [] || item != undefined) {
                appendMedia(item.media)
            }
            if (item.child != [] || item != undefined) {
                appendChild(item.child)
            }
            appendFileSync(scssPath, `}\n`)
        }

    }
    function appendMedia(media) {
        for (const item of media) {
            appendFileSync(scssPath, `${item.media}{\n`)
            appendFileSync(scssPath, `${item.mediaContent}}\n`)
        }
    }
}
export {JsonToScss,cssToJson}
