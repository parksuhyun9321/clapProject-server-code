let router=require("express").Router(),{getResume,postResume}=require("../api/api.resume"),{getProject,postProject}=require("../api/api.project"),dataType={resume:"resume",project:"project"};router.get("/api/post",async(t,r)=>{try{var a=t.query.type;let e;a===dataType.resume&&(e=await getResume(t)),a===dataType.project&&(e=await getProject(t)),r.status(200).send(e)}catch(e){}}),router.post("/api/post",async(t,r)=>{try{var a=t.body.type;let e;switch(a){case dataType.resume:e=await postResume(t);break;case dataType.project:e=await postProject(t)}r.status(200).send(e)}catch(e){}}),module.exports=router;// build date : 2024. 12. 15. 오후 1:54:22