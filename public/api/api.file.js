const fs = require("fs");
const path = require("path");
const { v4 } = require("uuid");
const { dataEncrypt } = require("../util/crpyto");

const { UserModel } = require("../model/user");

const ResultResponse = require("../util/resultResponse");

/**
 * 파일 업로드
 * @param {string} type profile, portfolio
 * @param {string} id 
 * @param {object || array} files  
 */
function FileUpload(type, id, files){

    try {

        if(!id || !files || !files["item"]) throw "error";

        /** @type {string} 유저 폴더를 생성할 경로 */
        const BASE_FILE_URL = path.join(__dirname, "..", process.env.FILE_DIRECTORY_NAME);
        console.log("BASE_FILE_URL",BASE_FILE_URL)
        let obj = files["item"];

        /** @type {string} 새로 생성한 파일 이름 */
        const fileName = v4() + new Date().getTime()+path.extname(obj.name);

        /** @type {string} 파일이 저장될 경로 */
        const filePath = path.join(BASE_FILE_URL, id, type);

        /** @type {string} 파일경로/파일이름 */
        const result = path.join(filePath, fileName);

        return fs.readdir(filePath, (readdirError, _files) => {

            if(readdirError) return new ResultResponse(400,readdirError, "폴더 조회 실패");

            if(_files.length === 0) {
                obj.mv(result, (err) => {
                
                    if(err) return new ResultResponse(400,files, err);
                    
                    return UserModel.updateOne({id : id}, { profileImg : fileName }).then(rs => {
                        return new ResultResponse(200,files);
                    })
                    .catch(updateErr => {
                        return new ResultResponse(400,files, updateErr);
                    })
                })

                return
            }

            for(let i = 0; i < _files.length; i++){
             
                /** @type {string} 폴더경로/삭제할파일이름 */
                const deleteFile = path.join(filePath, _files[i]);
            
                /** 폴더안 파일 삭제 */
                fs.unlink(deleteFile, (unlinkError) => {
                    if(unlinkError) return new ResultResponse(400,unlinkError, "기존 파일 삭제 실패");

                    if(i === (_files.length - 1)) {
                        obj.mv(result, (err) => {
                
                            if(err) return new ResultResponse(400,files, err);
                            
                            return UserModel.updateOne({id : id}, { profileImg : fileName }).then(rs => {
                                return new ResultResponse(200,files);
                            })
                            .catch(updateErr => {
                                return new ResultResponse(400,files, updateErr);
                            })
                        })
                    }
                })
            }
        })  
    }
    catch(err) {

    }
}

function FileUpload2(type, id, files){

    if(!id || !files) throw "error";

    return new Promise((resolve, reject) => {
        
        /** @type {string} 유저 폴더를 생성할 경로 */
            const BASE_FILE_URL = path.join(__dirname, "..", "..", process.env.FILE_DIRECTORY_NAME);
        
        /** 배열로 여러개 넘어옴 */
        if(Array.isArray(files["item"])) {

            let fileArr = files["item"];

            let arr = [];

            for(let i = 0; i < fileArr.length; i++){

                const parseName = Buffer.from(fileArr[i].name,"latin1").toString("utf8")  

                /** @type {string} 새로 생성한 파일 이름 */
                const fileName = v4() + new Date().getTime()+path.extname(parseName);

                /** @type {string} 파일이 저장될 경로 */
                const filePath = path.join(BASE_FILE_URL, id, "file");

                /** @type {string} 파일경로/파일이름 */
                
                const result = path.join(filePath, fileName);

                let obj = {
                    name: parseName,
                    fileName : result.replace(`${filePath}/`,""),
                    type : fileArr[i].mimetype,
                    id : id,
                }

                arr.push(obj);

                fileArr[i].mv(result, (err) => {

                    if(i === fileArr.length-1) {


                        if(err) return reject(new ResultResponse(400,arr, err)); 

                        
                        resolve(new ResultResponse(200,dataEncrypt(arr)))
                    }
                });
            }
        }
        else {
            let obj = files["item"];

            const parseName = Buffer.from(obj.name,"latin1").toString("utf8")  

            /** @type {string} 새로 생성한 파일 이름 */
            const fileName = v4() + new Date().getTime()+path.extname(parseName);
    
            /** @type {string} 파일이 저장될 경로 */
            const filePath = path.join(BASE_FILE_URL, id, type);
     
            /** @type {string} 파일경로/파일이름 */
            
            const result = path.join(filePath, fileName);

            obj.mv(result, (err) => {

                if(err) return reject(new ResultResponse(400,arr, err)); 

                let obj2 = {
                    name : parseName,
                    fileName : result.replace(`${filePath}/`,""),
                    type : obj.mimetype,
                    id : id,
                }

                resolve(new ResultResponse(200, dataEncrypt([obj2])))
            });
        }
    })
}

function FilesDelete(id, deleteItems){
    try {

        /** @type {string} 유저 폴더를 생성할 경로 */
        const BASE_FILE_URL = path.join(__dirname,"../..",process.env.FILE_DIRECTORY_NAME);

        /** @type {string} 파일이 저장될 경로 */
        const filePath = path.join(BASE_FILE_URL, id, "file");
 
        if(deleteItems.length <= 0) return 
 
        for(let i = 0; i < deleteItems.length; i++) {
            const item = deleteItems[i];

            const { fileName } = item;
            const resultPath = path.join(filePath, fileName);

            if(fs.existsSync(resultPath)) fs.unlinkSync(resultPath);
        }
 
        return new ResultResponse(200);
    }
    catch(err) {
        const errorResult = new ResultResponse(404, err["stack"], err["message"]);
        console.log("FilesDelete", errorResult);
        throw errorResult
    } 

}

async function FileDownload(id, fileName){

    try {
        /** @type {string} 유저 폴더를 생성할 경로 */
            const BASE_FILE_URL = path.join(__dirname, "..", "..", process.env.FILE_DIRECTORY_NAME);

        /** @type {string} 파일이 저장될 경로 */
        const filePath = path.join(BASE_FILE_URL, id, "file");

        const result = path.join(filePath, fileName);

        const stream = await fs.createReadStream(result);

        console.log(stream)
        return stream
    }
    catch(err) {
        console.log(err,"fileDownload err")
    }
 
    // fs.createReadStream(fileName)
}



module.exports = { FileUpload, FileUpload2, FilesDelete, FileDownload }