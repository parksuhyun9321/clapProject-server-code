let fs=require("fs"),path=require("path"),v4=require("uuid").v4,dataEncrypt=require("../util/crpyto").dataEncrypt,UserModel=require("../model/user").UserModel,ResultResponse=require("../util/resultResponse");function FileUpload(e,a,p){try{if(!a||!p||!p.item)throw"error";var t=path.join(__dirname,"..",process.env.FILE_DIRECTORY_NAME);console.log("BASE_FILE_URL",t);let l=p.item,i=v4()+(new Date).getTime()+path.extname(l.name),o=path.join(t,a,e),s=path.join(o,i);return fs.readdir(o,(e,n)=>{if(e)return new ResultResponse(400,e,"폴더 조회 실패");if(0===n.length)l.mv(s,e=>e?new ResultResponse(400,p,e):UserModel.updateOne({id:a},{profileImg:i}).then(e=>new ResultResponse(200,p)).catch(e=>new ResultResponse(400,p,e)));else for(let t=0;t<n.length;t++){var r=path.join(o,n[t]);fs.unlink(r,e=>{if(e)return new ResultResponse(400,e,"기존 파일 삭제 실패");t===n.length-1&&l.mv(s,e=>e?new ResultResponse(400,p,e):UserModel.updateOne({id:a},{profileImg:i}).then(e=>new ResultResponse(200,p)).catch(e=>new ResultResponse(400,p,e)))})}})}catch(e){}}function FileUpload2(u,f,R){if(f&&R)return new Promise((i,o)=>{var e=path.join(__dirname,"..","..",process.env.FILE_DIRECTORY_NAME);if(Array.isArray(R.item)){let n=R.item,r=[];for(let t=0;t<n.length;t++){var l=Buffer.from(n[t].name,"latin1").toString("utf8"),s=v4()+(new Date).getTime()+path.extname(l),a=path.join(e,f,"file"),s=path.join(a,s),l={name:l,fileName:s.replace(a+"/",""),type:n[t].mimetype,id:f};r.push(l),n[t].mv(s,e=>{if(t===n.length-1){if(e)return o(new ResultResponse(400,r,e));i(new ResultResponse(200,dataEncrypt(r)))}})}}else{let t=R.item,n=Buffer.from(t.name,"latin1").toString("utf8");var p=v4()+(new Date).getTime()+path.extname(n);let r=path.join(e,f,u),l=path.join(r,p);t.mv(l,e=>{if(e)return o(new ResultResponse(400,arr,e));e={name:n,fileName:l.replace(r+"/",""),type:t.mimetype,id:f};i(new ResultResponse(200,dataEncrypt([e])))})}});throw"error"}function FilesDelete(e,t){try{var n=path.join(__dirname,"../..",process.env.FILE_DIRECTORY_NAME),r=path.join(n,e,"file");if(!(t.length<=0)){for(let e=0;e<t.length;e++){var l=t[e].fileName,i=path.join(r,l);fs.existsSync(i)&&fs.unlinkSync(i)}return new ResultResponse(200)}}catch(e){n=new ResultResponse(404,e.stack,e.message);throw console.log("FilesDelete",n),n}}async function FileDownload(e,t){try{var n=path.join(__dirname,"..","..",process.env.FILE_DIRECTORY_NAME),r=path.join(n,e,"file"),l=path.join(r,t),i=await fs.createReadStream(l);return console.log(i),i}catch(e){console.log(e,"fileDownload err")}}module.exports={FileUpload:FileUpload,FileUpload2:FileUpload2,FilesDelete:FilesDelete,FileDownload:FileDownload};// build date : 2024. 12. 23. 오후 10:15:20