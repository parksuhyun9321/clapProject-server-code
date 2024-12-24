let router=require("express").Router(),RequestToId=require("../api/api.auth").RequestToId,{getMessage,readMessage,deleteMessage,postMessage}=require("../api/api.message"),dataDecrypt=require("../util/crpyto").dataDecrypt,MessageModel=require("../model/message").MessageModel;router.get("/api/message/get",async(e,a)=>{try{var{offset:s,limit:t}=e.query,r=RequestToId(e),d=await getMessage(r,s,t);a.status(200).send(d)}catch(e){console.log(e,"err"),a.status(400).send(e)}}),router.post("/api/message/read",async(e,a)=>{try{var s=RequestToId(e),t=dataDecrypt(e.body.data).messageId,r=await readMessage(s,t);a.status(200).send(r)}catch(e){}}),router.post("/api/message/delete",async(e,a)=>{try{var s=RequestToId(e),t=dataDecrypt(e.body.data).deleteData,r=await deleteMessage(s,t);a.status(200).send(r)}catch(e){}}),router.post("/api/message/post",async(e,a)=>{try{var s=RequestToId(e),t={...dataDecrypt(e.body.data),id:s},r=await postMessage(t);a.status(200).send(r)}catch(e){}}),module.exports=router;// build date : 2024. 12. 23. 오후 10:15:20