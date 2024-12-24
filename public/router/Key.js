const router = require("express").Router();

const { keyVerify } = require("../api/api.key");

router.get("/api/key/:key", async (req, res) => {

    try {
        const { key } = req.params;

        const result = await keyVerify(key);

        res.status(200).send(result);
    }
    catch(err) {
        res.status(400).send(err);
    }
})

module.exports = router;