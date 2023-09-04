import { timeCompare } from './utils/AutoReplace/timeCompare.mjs'
import { autoSnippet } from './utils/autoSnippet/autoSnippet.mjs'
import { fileToBase64, base64ToFile } from './utils/base64/toBase64.mjs'
import { getPageSource, checkUrl, getRedirectUrl, getPageUrl } from './utils/checkLink/checkLink.mjs'
import { getIP } from './utils/getIP/getIP.mjs'
import { gzipCompare } from './utils/gzipCompare/gzipCompare.mjs'
import { openBatchPage } from './utils/openBatchPage/openNatchPage.mjs'
import { JsonToScss, cssToJson } from './utils/optimizeCss/cssToScss.mjs'
import { optimzizeCss } from './utils/optimizeCss/optimizeCss.mjs'
import { removeMultipleLine } from './utils/removeMutipleLine/removeMultipleLine.mjs'
import { removeNote } from './utils/removeNote/removeNote.mjs'
import yueyv from './utils/yueyv.mjs'
// (async()=>{
//     const ip= await yueyv.getIP()
//     console.log(ip);
// })()

export {
    yueyv as default,
    timeCompare,
    autoSnippet,
    fileToBase64,
    base64ToFile,
    getPageSource,
    checkUrl,
    getRedirectUrl,
    getPageUrl,
    getIP,
    gzipCompare,
    openBatchPage,
    JsonToScss,
    cssToJson,
    optimzizeCss,
    removeMultipleLine,
    removeNote,
}