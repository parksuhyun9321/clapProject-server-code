const { UserModel } = require("../model/user");
const { encryptKey } = require("../util/key");

const ResultResponse = require("../util/resultResponse");
const { dataEncrypt } = require("../util/crpyto");

 
async function getMyInfo(id){
 
    try {
        const postObj = { id };

        const userInfo = await UserModel.findOne(postObj);

        const result = {
            id : userInfo["id"],
            name : userInfo["name"],
            email : userInfo["email"],
            phone : userInfo["phone"],
            birth : userInfo["birth"],
            job : userInfo["job"]
        }

        return new ResultResponse(200, dataEncrypt(result));
    }
    catch(err) {
        throw new ResultResponse(400, err, "getMyInfo ERROR");
    }
}

async function setMyInfo(id, target, value){
    try {

        const postObj = { id };

        const userInfo = await UserModel.findOne(postObj);

        if(!userInfo) return new ResultResponse(403, postObj["id"], "userInfo null");

        if(target === "job") {
            userInfo["job"] = value
        }
        else {
            userInfo[target]["isPublic"] = value
        }

        userInfo.save();

        const result = {
            id : userInfo["id"],
            name : userInfo["name"],
            email : userInfo["email"],
            phone : userInfo["phone"],
            birth : userInfo["birth"],
            job : userInfo["job"]
        }

        return new ResultResponse(200, result);
    }
    catch(err) {
        throw new ResultResponse(400, err, "setMyInfo ERROR");
    }

}

async function getMyHome(id){
 
    try {
        const postObj = { id };

        const userInfo = await UserModel.findOne(postObj);
    
        
        const result = encryptKey(userInfo["id"]);
    
        return new ResultResponse(200, dataEncrypt(encodeURIComponent(result)));
    }
    catch(err) {
        throw new ResultResponse(400, err, "getMyHome ERROR");
    }
}


// let data = {
//     name : "박수현",
//     id:"psh9321",
//     pw : "qkrtngus2953@",
//     profileImg : "",
//     birth : {value : "1994.07.11", isPublic : true},
//     email: {value : "nastyfact9321@gmail.com", isPublic : true},
//     phone:{value : "01094629321", isPublic : true},
//     job : "프론트엔드 개발자",
//     gender : 0,
// }

// const user = new UserModel(data)

// /** 비밀번호 난독화 */
// user.pw = compressData(user.pw);

//         /** 회원정보 저장 */
//         user.save();

module.exports = { getMyInfo, setMyInfo, getMyHome }