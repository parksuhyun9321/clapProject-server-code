let ProjectModel=require("../model/project").ProjectModel,ResultResponse=require("../util/resultResponse"),FilesDelete=require("./api.file").FilesDelete,dataEncrypt=require("../util/crpyto").dataEncrypt;async function getProject(e,t,o){try{t=t||0,o=o||1e3;var r={id:e},c=await Promise.all([ProjectModel.countDocuments(r).exec(),ProjectModel.find(r).sort({createDate:-1}).skip(Number(t)*o).limit(Number(o))]),n=c[0],s=c[1];return new ResultResponse(200,dataEncrypt({total:n,project:s}))}catch(e){throw new ResultResponse(400,e,"project api Error")}}function addProject(t,e){try{e.id=t;new ProjectModel(e).save();var o=new ResultResponse(200);return o}catch(e){t=new ResultResponse(404,e.stack,e.message);throw console.log("addProject",t),t}}function updateProject(t,e){try{var o={id:t,_id:e.projectId};return ProjectModel.updateOne(o,e).then(e=>new ResultResponse(200))}catch(e){t=new ResultResponse(404,e.stack,e.message);throw console.log("updateProject",t),t}}async function deleteProject(t,o){try{for(let e=0;e<o.length;e++){var r={id:t,_id:o[e]},c=await ProjectModel.findOne(r);if(!c)throw new ResultResponse(403,c,"projectInfo null");var{swiperFiles:n,attachedFiles:s}=c;if(await FilesDelete(t,[...n,...s]),await ProjectModel.deleteOne(r),e===o.length-1)return new ResultResponse(200)}}catch(e){console.log("err",e)}}function getProjectItem(t,e){try{var o={id:t,_id:e};return ProjectModel.findOne(o).then(e=>new ResultResponse(200,dataEncrypt(e))).catch(e=>new ResultResponse(403,e,"projectInfo null. itemKey error"))}catch(e){t=new ResultResponse(404,e.stack,e.message);throw console.log("getProjectItem",t),t}}module.exports={getProject:getProject,addProject:addProject,updateProject:updateProject,deleteProject:deleteProject,getProjectItem:getProjectItem};// build date : 2024. 12. 23. 오후 10:15:20