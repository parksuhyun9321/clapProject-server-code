const router = require("express").Router();

const { RequestToId } = require("../api/api.auth");
const { getMessage, readMessage, deleteMessage, postMessage } = require("../api/api.message");
const { dataDecrypt } = require("../util/crpyto");
const { MessageModel } = require("../model/message");

// const test = {
//     sender : "박수현",
//     senderPhone : "01094629321",
//     senderEmail : "bboynastyfact9321@naver.com",
//     contents : "메세지 메세지 메세지 메세지 메세지 메세지 메세지 메세지 메세e지 메세지 메세지 메세지 메세지 메세지 메세지 메세지 메세지 메세지 메세지 메세지 메세지 메세지 메세지 메세지",
//     id : "psh9321"
// }

// for(let i = 0; i < 20; i++){
//     const a = new MessageModel(test); 

//     a.save()
// }


router.get("/api/message/get", async (req, res) => {

    try {
        const { offset, limit } = req.query;
        const id = RequestToId(req);

        const result = await getMessage(id, offset, limit);

        res.status(200).send(result)
    }
    catch(err) {
        console.log(err,"err")
        res.status(400).send(err)
    }
});

router.post("/api/message/read",async (req, res) => {
    try {
        const id = RequestToId(req);
        const { messageId } = dataDecrypt(req.body.data)

        const result = await readMessage(id, messageId)

        res.status(200).send(result);
    }
    catch(err) {

    }
});

router.post("/api/message/delete",async (req, res) => {
    try {
        const id = RequestToId(req);
        const { deleteData } = dataDecrypt(req.body.data)

        const result = await deleteMessage(id, deleteData)

        res.status(200).send(result);
    }
    catch(err) {

    }
});

router.post("/api/message/post", async(req, res) => {
    try {
        const id = RequestToId(req);
        const data = dataDecrypt(req.body.data);
        
        const messageData = { 
            ...data,
            id
        }
        
        const result = await postMessage(messageData)
        
        res.status(200).send(result);
    }
    catch(err) {
        
    }
})

module.exports = router;