let{deCompressData,compressData}=require("./compression"),ResultResponse=require("./resultResponse");function encryptKey(e){var r=e.substring(0,Math.round(e.length/2)),e=e.substring(Math.round(e.length/2),e.length);return compressData(e+`-${r}-${r}-`+e)}function decryptKey(e){e=decodeURIComponent(e);var r,t,s,e=deCompressData(e);return e?(r=e.split("-")).length<=0?new ResultResponse(400,r,"key split error"):(t=r[1])+r[0]!==r[2]+(s=r[3])?new ResultResponse(400,r,"key check error"):t+s:new ResultResponse(400,e,"decrypt error")}module.exports={encryptKey:encryptKey,decryptKey:decryptKey};// build date : 2024. 12. 23. 오후 10:15:20