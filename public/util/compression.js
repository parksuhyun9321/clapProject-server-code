const pako = require("pako");

/**
 * 문자 인코딩
 * @param {string} str base64 인코딩할 문자
 */
const compressData = (str) => {
    const compressStr = pako.deflate(str, {level : 9});
    
    const base64Str = Buffer.from(compressStr).toString("base64");

    return base64Str
}

/**
 * 
 * @param {string} encodeStr base64 인코딩 된 문자
 * @param {boolean} isObj true : 리턴시 object, false : 리턴시 string
 */
const deCompressData = (encodeStr, isObj) => {

    if(!encodeStr || encodeStr === "null") return null;

    const deCompressStr = Buffer.from(encodeStr,"base64");

    const result = pako.inflate(deCompressStr, {to : "string"});


    return isObj ? JSON.parse(result) : result
}

module.exports = { compressData, deCompressData }