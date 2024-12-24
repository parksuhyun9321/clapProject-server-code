const { UserModel } = require("../model/user");
const { decryptKey } = require("../util/key");

const ResultResponse = require("../util/resultResponse");


async function keyVerify(key){
    try {
        const keyParseId = decryptKey(key);

        const userInfo = await UserModel.findOne({id : keyParseId});

        if(!userInfo) {
            return new ResultResponse(403, null, "userInfo null")
        }

        const is = userInfo["id"] === keyParseId;
    
        let resultCode = is ? 200 : 400;
        let data = {
            is : is ? "true" : keyParseId,
            admin : process.env.ADMIN_ID === key
        };
        let msg = is ? "" : "decryptKey error";
         
        return new ResultResponse(resultCode, data, msg);
    }
    catch(err) {
        throw new ResultResponse(400, err, "keyVerify UserModel MONGOOSE ERROR");
    }
}

module.exports = { keyVerify }