const { ResumeModel } = require("../model/resume");
const { dataEncrypt } = require("../util/crpyto");

const ResultResponse = require("../util/resultResponse");


async function getResume(id, offset, limit){

    try {
        const postObj = { id };
 
        const data = await Promise.all([
            ResumeModel.countDocuments(postObj).exec(),
            ResumeModel.find(postObj)
            .sort({createDate : -1}) /** 내림차순 정렬 */
            .skip(Number(offset) * limit)
            .limit(limit)
        ]);

        const total = data[0];

        const resume = data[1];
 
        return new ResultResponse(200,dataEncrypt({total, resume}));

    }
    catch(err) {
        throw new ResultResponse(400, err, "getResume catch ERROR");
    }
}
 
function addResume(id, data){
    try {
        data["id"] = id;

        const resume = new ResumeModel(data);
    
        resume.save();
    
        const result = new ResultResponse(200);
    
        return result
    }
    catch(err) {
        const errorResult = new ResultResponse(404, err["stack"], err["message"]);

        throw errorResult
    }
}

function updateResume(id, data){
    try {
        const postObj = {
            id,
            _id : data["resumeId"]
        }

        return ResumeModel.updateOne(postObj, data)
        .then(rs => {
            const result = new ResultResponse(200);

            return result;
        })
    }
    catch(err) {
        const errorResult = new ResultResponse(404, err["stack"], err["message"]);
        console.log("updateResume",errorResult);
        throw errorResult        
    }
}

function deleteResume(id, objId){
    try {
        const postObj = {
            id,
            _id : objId
        }
        
        return ResumeModel.deleteOne(postObj)
        .then(rs => {
            const result = new ResultResponse(200);
     
            return result;
        })
    }
    catch(err) {
        const errorResult = new ResultResponse(404, err["stack"], err["message"]);
        console.log(errorResult);
        throw errorResult     
    }
}

// function updateResume(id, data){
//     const { cmd, data } = req.body;
    
//     if(cmd === "C") {
    
//         data["user"] = RequestToId(req);

//         const resume = new ResumeModel(data);

//         resume.save();

//         const result = new ResultResponse(200, { cmd, data });

//         return result

//     }
//     else if(cmd === "U") {
        
//         return ResumeModel.updateOne({_id: data.resumeId}, data)
//         .then(rs => {

//             const result = new ResultResponse(200, { cmd, data : rs});

//             return result   
//         })
//     }
//     else if(cmd === "D") {
//         return ResumeModel.deleteOne({_id : data})
//         .then(rs => {

//             const result = new ResultResponse(200, { cmd, data : rs});

//             return result
//         })
//     }
// }


module.exports = { getResume, updateResume, addResume, deleteResume }