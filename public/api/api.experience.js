const path = require("path");
const fs = require("fs");

const { UserModel } = require("../model/user");

/**
 * 지정한 시간에 체험 유저를 삭제함 (재귀함수)
 * @param {*} targetHour 함수 호출 시간
 * @param {*} targetMinute 함수 호출 분
 */
function ExperienceDelete(targetHour, targetMinute) {
    try {
        const now = new Date();
        const target = new Date();
      
        /** 특정 시각 설정 */
        target.setHours(targetHour, targetMinute, 0, 0);
        if (target < now) {
            /** 목표 시각이 이미 지나갔다면 다음 날로 설정 */
            target.setDate(target.getDate() + 1); 
        }
      
        /** 현재 시각부터 목표 시각까지의 밀리초 차이 */
        const delay = target - now; 
    
        let timer = setTimeout(async () => {

            const userList = await UserModel.find({isExperience : true});

            if(userList.length > 0) {

                await UserModel.deleteMany({isExperience : true});
    
                for(let user of userList) {
                    /** @type {string} 유저 폴더를 생성할 경로 */
                    const BASE_FILE_URL = path.join(__dirname, "..","..",`/${process.env["FILE_DIRECTORY_NAME"]}`);
                    const resultPath = path.join(BASE_FILE_URL, user["id"]);
    
                    if(fs.existsSync(resultPath)) await fs.rmSync(resultPath, {recursive : true, force : true});
                }
            }

            /** 함수 재 호출 */
            ExperienceDelete(targetHour, targetMinute);

            clearTimeout(timer);
            timer = null;
        }, delay);
    }
    catch(err) {
        console.log(`${new Date()} : 체험유저 삭제 에러`)
    }
}

module.exports = ExperienceDelete