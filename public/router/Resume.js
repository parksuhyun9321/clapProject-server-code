const router = require("express").Router();
const { RequestToId } = require("../api/api.auth");
const { getResume, addResume, updateResume, deleteResume } = require("../api/api.resume");
const { dataDecrypt } = require("../util/crpyto");
 
 
/** 등록한 이력 리스트 조회 */
router.get("/api/resume/get", async (req, res) => {
    try { 
        const { offset, limit } = req.query;
        const id = RequestToId(req);

        const result = await getResume(id, offset, limit);

        res.status(200).send(result);
    }
    catch(err) {
        res.status(400).send(err);
    }
});

/** 이력 등록 */
router.post("/api/resume/add", async (req, res) => {
    try {
        const id = RequestToId(req);
        const data = dataDecrypt(req.body.data);
        const result = await addResume(id, data);

        res.status(200).send(result);
    }
    catch(err) {
        res.status(400).send(result);
    }
});

/** 등록한 이력 수정 */
router.post("/api/resume/update", async (req, res) => {

    try {
        const id = RequestToId(req);
        const data = dataDecrypt(req.body.data);
    
        const result = await updateResume(id, data);
     
        res.status(200).send(result);
    }
    catch(err) {
        res.status(400).send(result);
    }
});

/** 등록한 이력 삭제 */
router.post("/api/resume/delete", async (req, res) => {
    try { 
        const id = RequestToId(req);
        const { resumeId } = dataDecrypt(req.body.data);
    
        const result = await deleteResume(id, resumeId)
        
        res.status(200).send(result);
    }
    catch(err) {
        res.status(400).send(result);
    }
})



module.exports = router;