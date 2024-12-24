const router = require("express").Router();

const { RequestToId } = require("../api/api.auth");
const { getHashTag, setHashTag } = require("../api/api.hashTag");

const { dataDecrypt } = require("../util/crpyto");

router.get("/api/hashTag/get", async (req, res) => {

    
    try {
        const id = RequestToId(req);

        const result = await getHashTag(id);

        res.status(200).send(result)
    }
    catch(err) {

    }
})

router.post("/api/hashTag/update",async (req, res) => {

    try {
        const id = RequestToId(req);

        const data = dataDecrypt(req.body.data);

        const result = await setHashTag(id, data);

        res.status(200).send(result);
    }
    catch(err) {

    }
})

module.exports = router;