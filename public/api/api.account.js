const fs = require("fs");
const path = require("path");
const { UserModel } = require("../model/user");
const { compressData } = require("../util/compression");
const { SetToken } = require("./api.auth");
const { dataEncrypt } = require("../util/crpyto");



const ResultResponse = require("../util/resultResponse");

/**
 * 
 * @param {object} info 
 * @property {string} id
 * @property {string} pw
 * @property {string} job
 * @property {string} name
 * @property {string} birth
 * @property {string} phone
 * @property {number} gender
 * @returns 
 */
async function Register(info){

    try {

        /** 프로퍼티 갯수 만큼 반복문을 돌림 (프로퍼티 정보 로 가입된 계정이 없을시 넘어감) */
        for(let key in info) {

            /** id, phone, email 제외 continue 로 넘어감 */
            if(key === "name" || key === "birth" || key === "gender" || key === "pw" || key === "job") continue

            let obj = new Object();
    
            if(key === "id") {
                obj[key] = info[key];
            }
            else {
                obj[`${key}.value`] = info[key];
            }
            
            let result = await UserModel.findOne(obj);

            /** 가입된 id, phone, email 일시 리턴으로 빠짐 */
            if(result) {
                let msg = `register ${key} exists`;
            
                /** 가입된 정보 일시 (id, email, phone) */
                return new ResultResponse(403, null, msg);
            }
        }

        /** 새유저 생성 */
        const user = new UserModel(info);
        
        /** 비밀번호 난독화 */
        user.pw = compressData(user.pw);

        user["email"] = {
            value : info["email"],
            isPublic : true,
        }

        user["phone"] = {
            value : info["phone"],
            isPublic : true,
        } 

        user["birth"] = {
            value : info["birth"],
            isPublic : true,
        }

        user["profileImg"] = null

        /** @type {string} 유저 아이디 */
        const userID = user.id;

        /** @type {string} 유저 폴더를 생성할 경로 */
        const BASE_FILE_URL = path.join(__dirname, "..","..",`/${process.env["FILE_DIRECTORY_NAME"]}`);

        /** 유저 폴더 생성 */
        fs.mkdir(path.join(`${BASE_FILE_URL}`,userID), (err) => {
            if(err) return console.log(err)

            /** 유저 프로필 사진 폴더 생성 */
            fs.mkdir(path.join(`${BASE_FILE_URL}/${userID}`,"profile"), (err1) => {
                if(err1){
                    return console.log(err1)
                }
            }),
    
            /** 유저 포트폴리오 사진 폴더 생성 */
            fs.mkdir(path.join(`${BASE_FILE_URL}/${userID}`,"file"), (err3) => {
                if(err3){
                    return console.log(err3)
                }
            })
        });

        /** 회원정보 저장 */
        user.save();

        /** @type {object} response */
        const result = new ResultResponse(200);
        
        return result

    }
    catch(err) {
        const errorResult = new ResultResponse(404, err["stack"], err["message"]);
        console.log(errorResult);
        throw errorResult
    }
}

async function Experience(info){

    /** @type {array} db에 존재하는 테스트 계정 수 */
    const testUserArr = await UserModel.find({isExperience : true});

    /** 새유저 생성 */
    const user = new UserModel(info);
    
    /** 비밀번호 난독화 */
    user.pw = compressData(user.pw);

    /** 성별 숫자 */
    let genderStr = "01";

    /** 랜덤으로 성별 선택 */
    let randomGender = genderStr.charAt(Math.floor(Math.random() * genderStr.length));

    user["gender"] = Number(randomGender);
    user["name"] = `유저 ${testUserArr.length}`
    user["job"] = `테스트 직업`

    user["email"] = {
        value : `test${testUserArr.length}@test.com`,
        isPublic : true,
    }

    user["phone"] = {
        value : `0100000000${testUserArr.length}`,
        isPublic : true,
    } 

    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    user["birth"] = {
        value : `${year}${month}${day}`,
        isPublic : true,
    }

    user["hashTag"] = ["테스트 계정입니다.", "본인의 이력을 등록해보세요.", "지금까지 진행한 프로젝트들을 등록해보세요", "본인과 관련된 문장, 단어를 추가해보세요.", "본인을 나타내는 프로필 이미지를 등록해보세요.", `id : ${info["id"]}`, `pw : ${info["pw"]}`, "계정은 밤12시 삭제 됩니다.", "헤더의 햄버거 버튼을 클릭해 본인의 포트폴리오를 확인 해보세요."]

    user["isExperience"] = true;

    user["profileImg"] = "";

    /** @type {string} 유저 아이디 */
    const userID = user.id;

    /** @type {string} 유저 폴더를 생성할 경로 */
    const BASE_FILE_URL = path.join(__dirname, "..","..",`/${process.env["FILE_DIRECTORY_NAME"]}`);

    /** 유저 폴더 생성 */
    fs.mkdir(path.join(`${BASE_FILE_URL}`,userID), (err) => {
        if(err) return console.log(err)

        /** 유저 프로필 사진 폴더 생성 */
        fs.mkdir(path.join(`${BASE_FILE_URL}/${userID}`,"profile"), (err1) => {
            if(err1){
                return console.log(err1)
            }
        }),

        /** 유저 포트폴리오 사진 폴더 생성 */
        fs.mkdir(path.join(`${BASE_FILE_URL}/${userID}`,"file"), (err3) => {
            if(err3){
                return console.log(err3)
            }
        })
    });

    /** 회원정보 저장 */
    user.save();
    
    /** accessToken */
    const accessToken = SetToken(user["id"]);

    /** accessToken */
    const refreshToken = SetToken(user["id"], true);

    /** 토큰 박스 */
    const tokenObj = JSON.stringify({
        a : accessToken,
        r : refreshToken
    });

    return new ResultResponse(200, compressData(tokenObj));
}
 
/**
 * 로그인 api
 * @param {string} id 
 * @param {string} pw 
 * @returns 
 */
async function Login(id, pw){

    try {
        const userInfo = await UserModel.findOne({id : id});

        if(!userInfo) return new ResultResponse(403, null, "null User");
    
        /** @type {boolean} true : 로그인 성공 false : 로그인 실패 */
        const loginSuccess = userInfo["pw"] === compressData(pw);
    
        /** 비밀번호 틀림 */
        if(!loginSuccess) return new ResultResponse(403, null, "wrong Password");
    
        /** accessToken */
        const accessToken = SetToken(userInfo["id"]);
    
        /** accessToken */
        const refreshToken = SetToken(userInfo["id"], true);
    
        /** 토큰 박스 */
        const tokenObj = JSON.stringify({
            a : accessToken,
            r : refreshToken
        });
    
        return new ResultResponse(200, compressData(tokenObj));
    }
    catch(err) {
        throw ResultResponse(400, err, "Login API error");
    }
}

function Logout(token){

    try {

        token["a"] = null;
        token["r"] = null;

        const result = new ResultResponse(200, "logout success");

        return result;
    }
    catch(err) {
        throw new ResultResponse(400, data, "Logout Error error")
    }
}

async function IdSearch(data){
    try {
        const { name, email, phone } = data;
        const userInfo = await UserModel.findOne({
            name : name,
            "email.value" : email,
            "phone.value" : phone
        });
    
        if(!userInfo) return new ResultResponse(403, null, "userInfo null")
    
        return new ResultResponse(200, dataEncrypt(userInfo["id"]))
    }
    catch(err) {

    }

}

async function PwSearch(data){
    try {
        const { id, name, email, phone } = data;
        const userInfo = await UserModel.findOne({
            id : id,
            name : name,
            "email.value" : email,
            "phone.value" : phone
        });
    
        if(!userInfo) return new ResultResponse(403, null, "userInfo null")
    
        return new ResultResponse(200);
    }
    catch(err) {

    }

}

async function PwChange(data){
    try {
        const { id, pw } = data;

        const userInfo = await UserModel.findOne({id});
    
        if(!userInfo) return new ResultResponse(403, null, "userInfo null");
    
        if(userInfo["pw"] === compressData(pw)) return new ResultResponse(403, null, "same as previous pw");
    
        userInfo["pw"] = compressData(pw);
    
        userInfo.save();
    
        return new ResultResponse(200);
    }
    catch(err) {

    }
}

async function Withdrawal(id){
    try {
        const userInfo = await UserModel.findOne({id});

        /** @type {string} 유저 폴더를 생성할 경로 */
        const BASE_FILE_URL = path.join(__dirname, "..","..",`/${process.env["FILE_DIRECTORY_NAME"]}`);
    
        const resultPath = path.join(BASE_FILE_URL, id);

        const deleteResult = await UserModel.deleteOne({id});

        if(deleteResult.deletedCount === 0) {
            return new ResultResponse(403, deleteResult, "withdrawal fail")
        }
 
        if(fs.existsSync(resultPath)) fs.rmSync(resultPath, {recursive : true, force : true});
        
        return  new ResultResponse(200);
    
    }
    catch(err) {
        console.log(err,"Withdrawal err")
    }
}

module.exports = { Register, Experience, Login, Logout, IdSearch, PwSearch, PwChange, Withdrawal }