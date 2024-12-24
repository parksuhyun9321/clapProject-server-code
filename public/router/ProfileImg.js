const router = require("express").Router();

const { RequestToId } = require("../api/api.auth");
const { getProfileImg, setProfileImg } = require("../api/api.profileImg");

/** 등록한 프로필 이미지 조회 */
router.get("/api/profileImg/get", async (req, res) => {
    try {
        
        const id = RequestToId(req);

        const result = await getProfileImg(id);
 
        res.status(200).send(result)
    }
    catch(err) {

    }
}) 

/** 프로필 이미지 수정 */
router.post("/api/profileImg/update", async (req, res) => {
    try {
        const id = RequestToId(req);

        /** @type {files} formdata 로 넘어온 파일  */
        const { files } = req;
 
        const result = await setProfileImg(id, files);

        res.status(200).send(result)
    }
    catch(err) {
        res.status(400).send(err)

    }
})

module.exports = router;