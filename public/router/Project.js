const router = require("express").Router();

const { RequestToId } = require("../api/api.auth");
const { getProject, addProject, updateProject, deleteProject, getProjectItem } = require("../api/api.project");
const { dataDecrypt } = require("../util/crpyto");

/** 등록한 프로젝트 리스트 조회 */
router.get("/api/project/get", async (req, res) => {

    
    try { 
        const id = RequestToId(req);
        const { offset, limit } = req.query;

        const result = await getProject(id, offset, limit);
  
        res.status(200).send(result);
    }
    catch(err) {
        console.log("err",err)
    }
})

/** 프로젝트 등록 */
router.post("/api/project/add", async (req, res) => {
    try {
        const id = RequestToId(req);
        const data = dataDecrypt(req.body.data);
        const result = await addProject(id, data);

        res.status(200).send(result);
    }
    catch(err) {
        console.log("err",err)
    }
})

/** 등록한 프로젝트 수정 */
router.post("/api/project/update", async (req, res) => {
    try {
        const id = RequestToId(req);
        const data = dataDecrypt(req.body.data);
        const result = await updateProject(id, data);

        res.status(200).send(result);
    }
    catch(err) {
        console.log("err",err)
    }
});
 
/** 등록한 프로젝트 삭제 */
router.post("/api/project/delete",async (req, res) => {
    try {
        const id = RequestToId(req);
        const data = dataDecrypt(req.body.data);
 
        const result = await deleteProject(id, data);
  
        res.status(200).send(result);
    }
    catch(err) {
        console.log("/api/project/delete err",err)
    }
});

/** 프로젝트 디테일 페이지 조회 */
router.get("/api/project/:itemKey", async(req, res) => {
    try {
        const id = RequestToId(req);
        const { itemKey } = req.params;
     
        const result = await getProjectItem(id, itemKey) 
        
        res.status(200, result).send(result);
    }
    catch(err) {
        console.log("/api/project/:itemKey", err)
        res.status(400).send(err)
    }
})

module.exports = router;