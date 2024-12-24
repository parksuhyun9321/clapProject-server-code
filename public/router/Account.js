const requestIp = require("request-ip");
const { Register, Experience, Login, Logout, IdSearch, PwSearch, PwChange, Withdrawal } = require("../api/api.account");
const { GetToken, RequestToId } = require("../api/api.auth");
const { dataDecrypt } = require("../util/crpyto");
const ResultResponse = require("../util/resultResponse");


const router = require("express").Router();

router.post("/api/account/register", async (req, res) => {

    try {
        const { data } = req.body;

        const decryptData = dataDecrypt(data);

        const response = await Register(decryptData);

        res.status(200).send(response)
    }
    catch(err) {
         
        res.status(400).send(err)
    }
    
});

router.post("/api/account/experience", async (req, res) => {

    try { 
        console.log("requestIp",requestIp.getClientIp(req))
        const { data } = req.body;
 
        const decryptData = dataDecrypt(data);
 
        const { key, accountObj } = decryptData;

        if(key !== process["env"]["REACT_APP_SECRET_KEY"]) {
            res.status(400).send(new ResultResponse(404, null, "secret key 오류"))
        }
        else {
            const response = await Experience(accountObj);

            res.status(200).send(response)
        }
    }
    catch(err) {
         
        res.status(400).send(err)
    }
    
});


router.post("/api/account/login", async (req, res) => {

    try {
        // const { id, pw } = req.body;

        const { data } = req.body;

        const { id, pw } = dataDecrypt(data);

        const response = await Login(id, pw);

        res.status(200).send(response)
    }
    catch(err) {
        res.status(400).send(err)
    }
    
});

router.post("/api/account/idSearch", async (req, res) => {
    try {
        const { data } = req.body;

        const decryptData = dataDecrypt(data);

        const result = await IdSearch(decryptData);

        res.status(200).send(result)
    }
    catch(err) {

    }
})

router.post("/api/account/pwSearch", async (req, res) => {
    try {
        const { data } = req.body;

        const decryptData = dataDecrypt(data);

        const result = await PwSearch(decryptData);

        console.log("result",result)
        res.status(200).send(result)
    }
    catch(err) {

    }
})

router.post("/api/account/pwChange", async (req, res) => {
    try {
        const { data } = req.body;

        const decryptData = dataDecrypt(data);
 
        const result = await PwChange(decryptData);

        res.status(200).send(result)
    }
    catch(err) {
        console.log("err",err)
    }
})

router.get("/api/account/logout",async (req, res) => {
    try {
        const token = GetToken(req);

        const result = await Logout(token);

        res.status(200).send(result)
    }
    catch(err) {

    }
});
 
/** 회원탈퇴 */
router.get("/api/account/withdrawal",async (req, res) => {

    try {
        const id = RequestToId(req);

        const result = await Withdrawal(id);
    
        res.status(200).send(result);
    }
    catch(err) {

    }
});

module.exports = router;