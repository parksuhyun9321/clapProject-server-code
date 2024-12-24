const mongoose = require("mongoose");

const ResumeScheme = mongoose.Schema({
    companyName : {
        type : String,
        trim : true,
    },
    startDate : {
        type: String,
        trim : true,
    },
    endDate : {
        type: String,
        trim : true,
    },
    id : {
        type: String,
    },
    createDate : {
        type : Date,
        default : Date
    }
})

const ResumeModel = mongoose.model("Resume",ResumeScheme);

module.exports = { ResumeModel }