let router=require("express").Router(),RequestToId=require("../api/api.auth").RequestToId,{getResume,addResume,updateResume,deleteResume}=require("../api/api.resume"),dataDecrypt=require("../util/crpyto").dataDecrypt;router.get("/api/resume/get",async(e,t)=>{try{var{offset:a,limit:s}=e.query,u=RequestToId(e),r=await getResume(u,a,s);t.status(200).send(r)}catch(e){t.status(400).send(e)}}),router.post("/api/resume/add",async(t,a)=>{try{var s=RequestToId(t),u=dataDecrypt(t.body.data);let e=await addResume(s,u);a.status(200).send(e)}catch(e){a.status(400).send(result)}}),router.post("/api/resume/update",async(t,a)=>{try{var s=RequestToId(t),u=dataDecrypt(t.body.data);let e=await updateResume(s,u);a.status(200).send(e)}catch(e){a.status(400).send(result)}}),router.post("/api/resume/delete",async(t,a)=>{try{var s=RequestToId(t),u=dataDecrypt(t.body.data).resumeId;let e=await deleteResume(s,u);a.status(200).send(e)}catch(e){a.status(400).send(result)}}),module.exports=router;// build date : 2024. 12. 23. 오후 10:15:20