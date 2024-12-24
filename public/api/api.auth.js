const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user");
const { deCompressData, compressData } = require("../util/compression");
const ResultResponse = require("../util/resultResponse");


/**
 * 토큰 발급
 * @param {string} userID
 * @param {boolean} refresh true : refreshToken, false || undefined : accessToken
 */
function SetToken(userID, refresh) {                

    /** @type {string} 타입에 따른 토큰키 */
    const secretKey = refresh ? process.env.REFRESH_KEY : process.env.ACCESS_KEY;          

    /** @type {string} 타입에 따른 토큰시간 */
    const time = refresh ? process.env.REFRESH_TIME : process.env.ACCESS_TIME;

    let obj = {
        id:userID,
        pw:null,
        name:null,      
    }
    
    const result = jwt.sign(obj, secretKey, {
        expiresIn : time, 
        issuer : process.env.ADMIN_ISSUER
    });

    return result;
}

/**
 * 암호화된 토큰을 파싱후 리턴함
 * @param {request} req 
 * @returns {object} { a : accessToken, r : refreshToken }
 */
function GetToken(req) {
    if(!req || !req["headers"] || !req["headers"]["auth"]) return "!req";

    let data = req["headers"]["auth"];

    if(!data) return "!data";

    let tokenObj = deCompressData(data, true);

    let decodeAccess = jwt.decode(tokenObj["a"]);

    let decodeRefresh = jwt.decode(tokenObj["r"]);

    return {
        a : decodeAccess,
        r : decodeRefresh
    }    
}

/**
 * 암호화 된 토큰, 키 를 파싱후 유저 아이디를 리턴함
 * @param {request} req 
 * @returns {string} userId
 */
function RequestToId(req) {
 
    if(!req || !req["headers"]) return null

    const { key, auth } = req["headers"];

    if(auth) {
        let getToken = deCompressData(auth, true);

        let decodeToken = jwt.decode(getToken["a"]);

        return decodeToken["id"]??null
    }

    if(key) {
        const decryptId = deCompressData(key);

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
 
/**
 * 
 * @param {object} token { a : string, r : string }
 * @returns 
 */
function Verify(token){

    try {

        /** accessToken 조회 */
        return jwt.verify(token["a"], process.env.ACCESS_KEY, async (accessErr) => {
            /** accessToken 기간만료 */
            if(accessErr) {
                return jwt.verify(token["r"], process.env.REFRESH_KEY, async (refreshErr, refresh) => {
                    /** refreshToken 기간만료 */
                    if(refreshErr) {
                        return new ResultResponse(403, null, "Expiration Token")
                    }
                    /** 토큰 갱신 */
                    else {
                        const accessToken = SetToken(refresh.id);
                        
                        token["a"] = accessToken;

                        const parseToken = jwt.decode(token["a"]);

                        const userInfo = await UserModel.findOne({id : parseToken["id"]})
        
                        /** 유저가 존재하지 않음 */
                        if(!userInfo) return new ResultResponse(403, null, "user null")

                        return new ResultResponse(200, compressData(JSON.stringify(token)));
                    }
                })
            }   
            /** 토큰이 유효함 */
            else {

                const parseToken = jwt.decode(token["a"]);

                const userInfo = await UserModel.findOne({id : parseToken["id"]})

                /** 유저가 존재하지 않음 */
                if(!userInfo) return new ResultResponse(403, null, "user null")
                
                return new ResultResponse(200)
            }     
        })
    }
    catch(err) {
        return new ResultResponse(400, err, "jwt verify catch");
    }
}

module.exports = { SetToken, Verify, GetToken, RequestToId }