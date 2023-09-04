import {timeCompare} from './AutoReplace/timeCompare.mjs'  
import {autoSnippet} from './autoSnippet/autoSnippet.mjs'
import  { fileToBase64,base64ToFile } from './base64/toBase64.mjs'
import {getPageSource,checkUrl,getRedirectUrl,getPageUrl} from './checkLink/checkLink.mjs'
import {getIP} from './getIP/getIP.mjs'
import {gzipCompare} from './gzipCompare/gzipCompare.mjs'
import {openBatchPage} from './openBatchPage/openNatchPage.mjs'
import {JsonToScss,cssToJson} from './optimizeCss/cssToScss.mjs'
import {optimzizeCss} from './optimizeCss/optimizeCss.mjs'
import {removeMultipleLine} from './removeMutipleLine/removeMultipleLine.mjs'
import {removeNote} from './removeNote/removeNote.mjs'
const yueyv={
};
yueyv.timeCompare=timeCompare
yueyv.autoSnippet=autoSnippet
yueyv.fileToBase64=fileToBase64
yueyv.base64ToFile=base64ToFile
yueyv.getPageSource=getPageSource
yueyv.checkUrl=checkUrl
yueyv.getRedirectUrl=getRedirectUrl
yueyv.getPageUrl=getPageUrl
yueyv.getIP=getIP
yueyv.gzipCompare=gzipCompare
yueyv.openBatchPage=openBatchPage
yueyv.JsonToScss=JsonToScss
yueyv.cssToJson=cssToJson
yueyv.optimzizeCss=optimzizeCss
yueyv.removeMultipleLine=removeMultipleLine
yueyv.removeNote=removeNote
export default yueyv
