const { ProjectModel } = require("../model/project")
const ResultResponse = require("../util/resultResponse");
const { FilesDelete } = require("./api.file");
const { dataEncrypt } = require("../util/crpyto");

async function getProject(id, offset, limit){
    try {
        
        if(!offset) offset = 0;
        if(!limit) limit = 1000;
    
        const postObj = { id };
    
        const data = await Promise.all([
            ProjectModel.countDocuments(postObj).exec(),
            ProjectModel.find(postObj)
            .sort({createDate : -1}) /** 내림차순 정렬 */
            .skip(Number(offset) * limit)
            .limit(Number(limit))
        ])

        /** @type {number} 조회한 포트폴리오 데이터 전체 갯수 */
        const total = data[0];
            
        /** @type {array} 조회한 이력 포트폴리오 데이터 */
        const project = data[1];

        return new ResultResponse(200,dataEncrypt({total, project}));
    }
    catch(err) {
        const error = new ResultResponse(400,err, "project api Error");

        throw error
    }
}

function addProject(id, data){
    try {
        data["id"] = id; 
 
        const project = new ProjectModel(data);

        project.save();

        const result = new ResultResponse(200);
    
        return result
    }
    catch(err) {
        const errorResult = new ResultResponse(404, err["stack"], err["message"]);
        console.log("addProject", errorResult);
        throw errorResult
    }
}

function updateProject(id, data){
    try {
        const postObj = {
            id,
            _id : data["projectId"]
        }

        return ProjectModel.updateOne(postObj, data)
        .then(rs => {
            const result = new ResultResponse(200);

            return result;
        })
    }
    catch(err) {
        const errorResult = new ResultResponse(404, err["stack"], err["message"]);
        console.log("updateProject", errorResult);
        throw errorResult  
    }
}

/**
 * 
 * @param {string} id 
 * @param {array} data [...string(objId)]
 */
async function deleteProject(id, data){
    try {
        
        for(let i = 0; i < data.length; i++) {
            const projectId = data[i];
            const postObj = {
                id,
                _id : projectId
            };

            const projectInfo = await ProjectModel.findOne(postObj);

            if(!projectInfo) {
                throw new ResultResponse(403, projectInfo, "projectInfo null")
            }

            const { swiperFiles, attachedFiles } = projectInfo;

            await FilesDelete(id,[...swiperFiles, ...attachedFiles]);

            await ProjectModel.deleteOne(postObj);

            if(i === data.length-1) {
                return new ResultResponse(200)
            }
        }
    }
    catch(err) {
        console.log("err",err)
    }
}

function getProjectItem(id, objKey){
    try {
        const postObj = {
            id,
            _id : objKey
        }

        return ProjectModel.findOne(postObj)
        .then(projectInfo => {

            const result = new ResultResponse(200, dataEncrypt(projectInfo));
            
            return result
        })
        .catch(err => {
            
            return new ResultResponse(403, err, "projectInfo null. itemKey error");
        })
    }
    catch(err) {
        const errorResult = new ResultResponse(404, err["stack"], err["message"]);
        console.log("getProjectItem", errorResult);
        throw errorResult  
    }
}

module.exports = { getProject, addProject, updateProject, deleteProject, getProjectItem }