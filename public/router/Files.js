const router = require("express").Router();
const { RequestToId } = require("../api/api.auth");
const { FileUpload2, FilesDelete, FileDownload } = require("../api/api.file");

router.post("/api/files/swiperData", async (req, res) => {
    try {
     
        /** @type {files} formdata 로 넘어온 파일  */
        const { files } = req;

        const id = RequestToId(req);

        const result = await FileUpload2("file", id, files);

        res.status(200).send(result)
    }
    catch(err) {
        res.status(400).send(err)
    }
});

router.post("/api/files/attachedFiles", async (req, res) => {
    try {
    
        /** @type {files} formdata 로 넘어온 파일  */
        const { files } = req;

        const id = RequestToId(req);

        const result = await FileUpload2("file", id, files);

        res.status(200).send(result)
    }
    catch(err) {
        res.status(400).send(err)
    }
});

router.post("/api/files/deleteFiles", async(req, res) => {
    try {
        const id = RequestToId(req);
        const data = req.body;
    
        const result = await FilesDelete(id, data);
    
        res.status(200).send(result)
    }
    catch(err) {
        res.status(400).send(err)
    }
});

router.post("/api/files/download", async (req, res) => {
    try {
        const id = RequestToId(req);
        const { fileName } = req.body;

        const result = await FileDownload(id, fileName)

        result.pipe(res)
    }
    catch(err) {
        console.log(err,"file router download error");
        res.status(400).send(err)
    }
})

module.exports = router;