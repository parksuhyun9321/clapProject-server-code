const jwt = require("jsonwebtoken");
const { deCompressData } = require("./compression")

/**
 * 암호화 된 토큰을 파싱후 유저 아이디를 리턴함
 * @param {request} req 
 * @returns {string} userId
 */
function RequestToId(req) {

    if(!req || req["headers"]) return null

    const { key, auth } = req["headers"];

    if(auth) {
        let getToken = deCompressData(auth, true);

        let decodeToken = jwt.decode(getToken["a"]);

        return decodeToken["id"]??null
    }

    if(key) {
        const decryptId = deCompressData(encryptKey);

        const split = decryptId.split("-");
    
        // const objId = split[0];
    
        // const id = split[1];
        const a = split[0];
        const b = split[1];
        const c = split[2];
        const d = split[3];
    
        if((b+a) !== (c+d)) return "key error";
    
        return c + a
    }
}

function ParseToken(req){
    if(!req || !req["headers"] || !req["headers"]["auth"]) return "!req";

    let data = req["headers"]["auth"];

    if(!data) return "!data";

    let tokenObj = deCompressData(data, true);

    let decodeAccess = jwt.decode(getToken["a"]);

    let decodeRefresh = jwt.decode(getToken["r"]);

    return {
        a : decodeAccess,
        r : decodeRefresh
    }
}

module.exports = { RequestToId, ParseToken }