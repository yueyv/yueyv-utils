import { readFileSync, writeFileSync } from 'fs'
// const loadPath="./utils/autoSnippet/test.html"
// const savepath="./utils/autoSnippet/test.json"
// const prefix="squareli"
// const scope="html"
// const description="前面带方块的li标签"
// const label="带方块的li标签"
/**
 * 生成snippet
 * @param {string} loadPath 文件路径
 * @param {string} savepath 保存路径
 * @param {string} prefix 键入值
 * @param {string} scope 使用作用域
 * @param {string} description 描述
 * @param {string} label 标签
 */
const autoSnippet=(loadPath, savepath, prefix, scope, description, label)=> {
  const snippetData = readFileSync(loadPath)
  const tranRegex = /(\"|\'|\\|\\n|\\r|\\t|\/)/gmis
  const snippet_body = snippetData.toString().replace(tranRegex, `\$1`)
  const snippet = {
    [label]: {
      scope: scope,
      prefix: prefix,
      body: [
        `${snippet_body}`
      ],
      description: description
    }
  }
  writeFileSync(savepath, JSON.stringify(snippet))
}
export { autoSnippet }
