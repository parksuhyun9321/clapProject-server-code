const mongoose = require("mongoose");

const UserScheme = mongoose.Schema({
    id : String,
    pw: String,
    name : String,
    createRegister : Date,
    gender : Number,
    profileImg : String,
    job : String,
    hashTag : Array,
    isExperience :Boolean,
    phone : {
        value : {
            type : String,
            
        },
        isPublic : {
            type : Boolean,
            default:false
        },
    },
    email : {
        value : {
            type : String,
            trim: false,
            required: true
        },
        isPublic : {
            type : Boolean,
            default:false
        }
    },
    birth : {
        value : {
            type : String,
            required: true
        },
        isPublic : {
            type : Boolean,
            default:false
        }
    },
})

const UserModel = mongoose.model("User",UserScheme);

module.exports = { UserModel }