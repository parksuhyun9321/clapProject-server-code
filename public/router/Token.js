const router = require("express").Router();

const { Verify } = require("../api/api.auth");
const { deCompressData } = require("../util/compression");

/** 토큰 유효성 검사 */
router.get("/api/token/verify", async (req, res) => {
    try {
        const encrpytToken = req["headers"]["auth"];
        
        const token = deCompressData(encrpytToken, true)
        const result = await Verify(token);
 
        res.status(200).send(result);
    }
    catch(err) {
        console.log(err,"err")
        res.status(400).send(err)
    }
});

module.exports = router;