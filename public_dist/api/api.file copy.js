let fs=require("fs"),path=require("path"),v4=require("uuid").v4,UserModel=require("../model/user").UserModel,ResultResponse=require("../util/resultResponse");function FileUpload(e,a,p){try{if(!a||!p||!p.item)throw"error";var t=path.join(__dirname,"..","..",process.env.FILE_DIRECTORY_NAME);let l=p.item,i=v4()+(new Date).getTime()+path.extname(l.name),s=path.join(t,a,e),o=path.join(s,i);return fs.readdir(s,(e,n)=>{if(e)return new ResultResponse(400,e,"폴더 조회 실패");if(0===n.length)l.mv(o,e=>e?new ResultResponse(400,p,e):UserModel.updateOne({id:a},{profileImg:i}).then(e=>new ResultResponse(200,p)).catch(e=>new ResultResponse(400,p,e)));else for(let t=0;t<n.length;t++){var r=path.join(s,n[t]);fs.unlink(r,e=>{if(e)return new ResultResponse(400,e,"기존 파일 삭제 실패");t===n.length-1&&l.mv(o,e=>e?new ResultResponse(400,p,e):UserModel.updateOne({id:a},{profileImg:i}).then(e=>new ResultResponse(200,p)).catch(e=>new ResultResponse(400,p,e)))})}})}catch(e){}}function FileUpload2(u,R,f){if(R&&f)return new Promise((a,p)=>{var e=path.join(__dirname,"..","..",process.env.FILE_DIRECTORY_NAME);if(Array.isArray(f.item)){let s=f.item,o=[];for(let i=0;i<s.length;i++){let n=Buffer.from(s[i].name,"latin1").toString("utf8");var t=v4()+(new Date).getTime()+path.extname(n);let r=path.join(e,R,u),l=path.join(r,t);s[i].mv(l,e=>{var t={name:n,fileName:l.replace(r+"/",""),type:s[i].mimetype,id:R};if(o.push(t),i===s.length-1){if(e)return p(new ResultResponse(400,o,e));a(new ResultResponse(200,o))}})}}else{let t=f.item,n=Buffer.from(t.name,"latin1").toString("utf8");var i=v4()+(new Date).getTime()+path.extname(n);let r=path.join(e,R,u),l=path.join(r,i);t.mv(l,e=>{if(e)return p(new ResultResponse(400,arr,e));e={name:n,fileName:l.replace(r+"/",""),type:t.mimetype,id:R};a(new ResultResponse(200,[e]))})}});throw"error"}function FilesDelete(e,n){try{var t=path.join(__dirname,"..","..",process.env.FILE_DIRECTORY_NAME),r=path.join(t,e,"file");if(!(n.length<=0))for(let t=0;t<n.length;t++){var l=n[t].fileName,i=path.join(r,l);fs.unlink(i,e=>{if(e)throw new ResultResponse(403,e,"deleteErr");if(t===n.length-1)return new ResultResponse(200)})}}catch(e){t=new ResultResponse(404,e.stack,e.message);throw console.log("FilesDelete",t),t}}async function FileDownload(e,t){try{var n=path.join(__dirname,"..","..",process.env.FILE_DIRECTORY_NAME),r=path.join(n,e,"file"),l=path.join(r,t);return await fs.createReadStream(l)}catch(e){console.log(e,"fileDownload err")}}module.exports={FileUpload:FileUpload,FileUpload2:FileUpload2,FilesDelete:FilesDelete,FileDownload:FileDownload};// build date : 2024. 12. 13. 오전 6:13:37