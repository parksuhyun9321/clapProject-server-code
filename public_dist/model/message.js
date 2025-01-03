const mongoose = require("mongoose");

const MessageScheme = mongoose.Schema({
    sender : {
        type : String,
        trim : true,
    },
    senderPhone : {
        type : String,
        trim : true,
    },
    senderEmail : {
        type : String,
        trim : true,
    },
    contents : {
        type : String
    },
    sendDate : {
        type : Date,
        default : Date
    },
    id : {
        type : String
    },
    
    isRead : Boolean
});

const MessageModel = mongoose.model("Message",MessageScheme);

module.exports = { MessageModel }// build date : 2024. 12. 23. 오후 10:15:20