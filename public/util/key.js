const { deCompressData, compressData } = require("./compression");
const ResultResponse = require("./resultResponse");


/**
 * 아이디를 암호화
 * @param {string} id 
 * @returns {string} 암호화/생성된 키
 */ 
 function encryptKey(id){
    const encryptLeft8 = id.substring(0,Math.round(id.length/2));
    const encryptRight8 = id.substring(Math.round(id.length/2), id.length);

    let result = compressData(`${encryptRight8}-${encryptLeft8}-${encryptLeft8}-${encryptRight8}`);

    return result
}

/**
 * 암호화된 키 복호화
 * @param {string} encryptKey 암호화된 키
 * @returns {string} 복호화된 키
 */
function decryptKey(encryptKey){
    encryptKey = decodeURIComponent(encryptKey)
    const decrypt = deCompressData(encryptKey);

    if(!decrypt) return new ResultResponse(400, decrypt, "decrypt error");

    const split = decrypt.split("-");

    if(split.length <= 0) return new ResultResponse(400, split, "key split error");

    const a = split[0];
    const b = split[1];
    const c = split[2];
    const d = split[3];

    if((b+a) !== (c+d)) return new ResultResponse(400, split, "key check error");

    return b+d
}

module.exports = { encryptKey, decryptKey }