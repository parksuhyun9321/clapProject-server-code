const fs = require("fs");
const path = require("path");
const { v4 } = require("uuid");

const { UserModel } = require("../model/user");
const { dataEncrypt } = require("../util/crpyto");
const ResultResponse = require("../util/resultResponse");

async function getProfileImg(id) {
    
    try {

        const postObj = { id };

        const userInfo = await UserModel.findOne(postObj);

        const result = {
            user : userInfo["id"],
            img : userInfo["profileImg"],
            gender : userInfo["gender"]
        };

        return new ResultResponse(200, dataEncrypt(result));
    }
    catch(err) {
        throw new ResultResponse(400, err, "getProfileImg ERROR");
    }
}

function setProfileImg(id, files){

    try {

        return new Promise((resolve, reject) => {
            if(!id || !files) throw "error";

            /** @type {string} 유저 폴더를 생성할 경로 */
            const BASE_FILE_URL = path.join(__dirname, "..", "..", process.env.FILE_DIRECTORY_NAME);

            let obj = files["item"];
    
            /** @type {string} 새로 생성한 파일 이름 */
            const fileName = v4() + new Date().getTime()+path.extname(obj.name);
    
            /** @type {string} 파일이 저장될 경로 */
            const filePath = path.join(BASE_FILE_URL, id, "profile");
    
            /** @type {string} 파일경로/파일이름 */
            const result = path.join(filePath, fileName);
    
            fs.readdir(filePath, (readdirError, _files) => {
    
                if(readdirError) return reject(new ResultResponse(400,readdirError, "폴더 조회 실패"));
    
                if(_files.length === 0) {
                    obj.mv(result, (err) => {
                    
                        if(err) return reject(new ResultResponse(400,files, err));
                        
                        UserModel.updateOne({id : id}, { profileImg : fileName }).then(rs => {
                            // resolve(new ResultResponse(200,files));
                            resolve(new ResultResponse(200));
                        })
                        .catch(updateErr => {
                            resolve(new ResultResponse(400,files, updateErr));
                        })
                    })
                }
                else {
                    for(let i = 0; i < _files.length; i++){
                 
                        /** @type {string} 폴더경로/삭제할파일이름 */
                        const deleteFile = path.join(filePath, _files[i]);
                    
                        /** 폴더안 파일 삭제 */
                        fs.unlink(deleteFile, (unlinkError) => {
                            if(unlinkError) return reject(new ResultResponse(400,unlinkError, "기존 파일 삭제 실패"));
        
                            if(i === (_files.length - 1)) {
                                obj.mv(result, (err) => {
                        
                                    if(err) return new ResultResponse(400,files, err);
                                    
                                    UserModel.updateOne({id : id}, { profileImg : fileName }).then(rs => {
                                        // return resolve(new ResultResponse(200,files))
                                        resolve(new ResultResponse(200))
                                    })
                                    .catch(updateErr => {
                                        return reject(new ResultResponse(400,files, updateErr));
                                    })
                                })
                            }
                        })
                    }
                }
            })  
        })
    }
    catch(err) {
        const errorResult = new ResultResponse(404, err["stack"], err["message"]);
        console.log(errorResult);
        throw errorResult     
    }

    // try {
    //     const uploadResult = await FileUpload("profile",id, files);

    //     return uploadResult
    // }
    // catch(err) {
    //     throw new ResultResponse(400, err, "setProfileImg ERROR");
    // }
}

module.exports = { getProfileImg, setProfileImg }