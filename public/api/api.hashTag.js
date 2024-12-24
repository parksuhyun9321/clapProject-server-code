const { UserModel } = require("../model/user");
const { dataEncrypt } = require("../util/crpyto");
const ResultResponse = require("../util/resultResponse");


async function getHashTag(id){

    try {
        
        const postObj = { id };

        return UserModel.findOne(postObj)
        .then(userInfo => {    
            const result = {
                user : userInfo["id"],
                hashTag : userInfo["hashTag"]
            };
    
            return new ResultResponse(200, dataEncrypt(result));
        })
    }
    catch(err) {

    }
}

function setHashTag(id, data){

    const postObj = { id };

    return UserModel.findOne(postObj)
    .then(userInfo => {

        /** 데이터 회수 */
        // parserData = null;

        userInfo["hashTag"] = data;

        userInfo.save();

        // const result = {
        //     user : userInfo["id"],
        //     hashTag : userInfo["hashTag"]
        // };

        return new ResultResponse(200);
    })
}

module.exports = { getHashTag, setHashTag }