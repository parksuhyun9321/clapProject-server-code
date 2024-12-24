const { MessageModel } = require("../model/message");
const { dataEncrypt } = require("../util/crpyto");
const ResultResponse = require("../util/resultResponse");




function getMessage(id, offset, limit){
    try {
        const postObj = { id };

        return Promise.all([
            MessageModel.countDocuments(postObj).exec(),
            MessageModel.find(postObj)
            .sort({sendDate : -1}) /** 내림차순 정렬 */
            .skip(Number(offset) * limit)
            .limit(limit)
        ])
        .then(rs => {
            /** @type {number} 메세지 전체 갯수 */
            const total = rs[0];
    
            /** @type {array} 모든 메세지 데이터 */
            const message = rs[1];

            const result = dataEncrypt({total, message})

            return new ResultResponse(200, result);
        })
        .catch(err => {
            throw new ResultResponse(403, err, "getMessage ERROR");
        })
    }
    catch(err) {
        throw new ResultResponse(404, err, "getMessage catch ERROR");
    }
}

async function readMessage(id, messageId) {

    try {

        const postObj = { 
            id,
            _id : messageId 
        };

        const messageInfo = await MessageModel.findOne(postObj);
        
        if(!messageInfo) throw new ResultResponse(403, err, "readMessage ERROR");

        messageInfo["isRead"] = true;

        messageInfo.save();

        return new ResultResponse(200)
    }
    catch(err) {
        throw new ResultResponse(404, err, "readMessage catch ERROR");
    }
}

async function deleteMessage(id, deleteData){
    try {

        if(deleteData.length <= 0) throw ResultResponse(403, deleteData, "deleteData.length <= 0");

        for(let _id of deleteData) {
            const postObj = { id, _id };

           const abc = await MessageModel.findOneAndDelete(postObj) 
        };

        return new ResultResponse(200, deleteData);
        
    }
    catch(err) {
        throw new ResultResponse(404, err, "DeleteMessage catch ERROR");
    }
}

async function postMessage(messageData){
    try {
        const data = {
            sender : messageData["name"],
            senderPhone : messageData["phone"],
            senderEmail : messageData["email"],
            contents : messageData["contents"],
            id : messageData["id"],
        }

        const message = new MessageModel(data); 

        message.save();

        return new ResultResponse(200);
    }
    catch(err) {
        throw new ResultResponse(404, err, "postMessage catch ERROR");
    }
}

module.exports = { getMessage, readMessage, deleteMessage, postMessage }