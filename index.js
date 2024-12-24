const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

/** 환경변수 셋팅 */
dotenv.config();

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json({limit:"10000mb"})); /** application/json */
app.use(bodyParser.urlencoded({limit:"10000mb",extended:true}));

const fileUpload = require("express-fileupload");

app.use(fileUpload());
app.use("/contents", express.static("contents"));

const isProduction = process.env.NODE_ENV === "production";

const API_ROUTER_PROJECT = require(isProduction ? "./public_dist/router/Project" : "./public/router/Project");
const API_ROUTER_RESUME = require(isProduction ? "./public_dist/router/Resume" : "./public/router/Resume");
// const API_ROUTER_POST = require("./public/router/Post");
const API_ROUTER_MYINFO = require(isProduction ? "./public_dist/router/MyInfo" : "./public/router/MyInfo");
const API_ROUTER_HASHTAG = require(isProduction ? "./public_dist/router/HashTag" : "./public/router/HashTag");
const API_ROUTER_PROFILEIMG = require(isProduction ? "./public_dist/router/ProfileImg" :"./public/router/ProfileImg");
const API_ROUTER_FILES = require(isProduction ? "./public_dist/router/Files" : "./public/router/Files");
const API_ROUTER_ACCOUNT = require(isProduction ? "./public_dist/router/Account" : "./public/router/Account");
const API_ROUTER_TOKEN = require(isProduction ? "./public_dist/router/Token" : "./public/router/Token");
const API_ROUTER_KEY = require(isProduction ? "./public_dist/router/Key" : "./public/router/Key");
const API_ROUTER_MESSAGE = require(isProduction ? "./public_dist/router/Message" : "./public/router/Message");

const ExperienceDelete = require(isProduction ? "./public_dist/api/api.experience" : "./public/api/api.experience");

// const port = 80
const port = isProduction ? 80 : 9321;

const cors = require("cors");

app.use(cors({
  origin : "*",
  credentials : true
}));

app.get("/health",(req, res) => {
  res.status(200).send("success health check")
})


mongoose.connect(process.env.CONNECT_URL)
.then(() => {
    app.listen(port, () => {
        
        app.use(API_ROUTER_PROJECT);
        app.use(API_ROUTER_RESUME); 

        app.use(API_ROUTER_MYINFO);
        app.use(API_ROUTER_HASHTAG);
        app.use(API_ROUTER_PROFILEIMG);

        app.use(API_ROUTER_FILES);

        app.use(API_ROUTER_ACCOUNT); 

        app.use(API_ROUTER_TOKEN);

        app.use(API_ROUTER_KEY);

        app.use(API_ROUTER_MESSAGE);

        ExperienceDelete(0, 0);

        console.log("connect",port)
    })
})
.catch(err => {
    console.log("connect error",err)
})