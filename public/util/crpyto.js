const { AES, enc } = require("crypto-js")

/**
 * 
 * @param {*} data 
 */
function dataEncrypt(paramsData){
    const data = AES.encrypt(JSON.stringify(paramsData), process.env.REACT_APP_SECRET_KEY);

    const result = data.toString();
    
    return result
}

/**
 * 암호화된 문자열을 복호화 함
 * @param {string} encryptStr 암호화된 문자열
 */
 function dataDecrypt(encryptStr){
    const decrypt = AES.decrypt(encryptStr, process.env.REACT_APP_SECRET_KEY);

    const result = JSON.parse(decrypt.toString(enc.Utf8));

    return result;
}

module.exports = { dataDecrypt, dataEncrypt }