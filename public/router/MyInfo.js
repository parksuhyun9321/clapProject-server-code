const router = require("express").Router();

const { RequestToId } = require("../api/api.auth");
const { getMyInfo, setMyInfo, getMyHome } = require("../api/api.myInfo");
const { dataDecrypt } = require("../util/crpyto");


/** 내정보 가져오기 */
router.get("/api/myInfo/get", (req, res) => {

    const id = RequestToId(req);
 
    getMyInfo(id)
    .then(result => {
        res.status(200).send(result)
    })
}); 

/** 
 * 내정보 (직업 수정, 생년월일 공개or비공개, 이메일공개or비공개, 휴대폰 번호공개or비공개) 수정 */
router.post("/api/myInfo/update", (req, res) => {

    const { target, value } = dataDecrypt(req.body.data);
    
    const id = RequestToId(req);

    setMyInfo(id, target, value)
    .then(result => {
        res.status(200).send(result)
    }) 
});

/** 내 포트폴리오 사이트 링크 조회 */
router.get("/api/myInfo/home",(req, res) => {
 
    const id = RequestToId(req);

    getMyHome(id)
    .then(result => {
        res.status(200).send(result)
    })
});
 
module.exports = router;