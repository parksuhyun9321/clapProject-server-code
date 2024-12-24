const mongoose = require("mongoose");

const ProjectScheme = mongoose.Schema({

    /** 프로젝트 명 */
    projectName : {
        type : String,
        trim : true,
    },

    /** 첨부 링크 */
    urls : {
        type:Array
    },

    /** 해쉬태그 */
    hashTag : {
        type:Array
    },

    /** 배너 콘텐츠 파일 */
    swiperFiles : {
        type:Array
    },

    /** 첨부 파일 */
    attachedFiles : {
        type:Array
    },

    /** 시작 월 ~ 일 */
    startDate : {
        type: String,
        trim : true,
    },

    /** 종료 월 ~ 일 */
    endDate : {
        type: String,
        trim : true,
    },

    /** 프로젝트 내용 */
    contents : {
        type : String
    },

    /** 유저 아이디 */
    id : {
        type: String,
    },

    /** 생성일 */
    createDate : {
        type : Date,
        default : Date
    }
});

const ProjectModel = mongoose.model("Project",ProjectScheme);

module.exports = { ProjectModel }