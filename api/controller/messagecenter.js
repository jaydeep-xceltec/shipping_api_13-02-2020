const knex = require('knex')(require('../knexfile'));
const moment = require('moment')
module.exports.nudgelist = () => {

	return new Promise((resolve, reject) => {
		knex('chat_management').where({'isDelete': 'N'}).orderBy('id', 'desc').then((result)=>{
           if(result.length>0){

			resolve({'data':result})
		}else{
			resolve({'message':'data not found'})
		}
		})
	})
}
module.exports.nudgedelete = (deleteid) => {
	var id = deleteid;
	//console.log(id)
	return new Promise((resolve, reject) => {
		if(id){
			knex('chat_management').update({'isDelete':'Y'}).where(id).then((result)=>{
				if(result){
					resolve({'success':true,'message':'nudge deleted..'})
				}else{
					resolve({'success':false,'message':'nudge not deleted try again..'})
				}
			})
		}else{
			resolve({'message':'id not found'})
		}
	})
}

module.exports.singleNudgeview = (userid) => {
	var id = userid

	return new Promise((resolve, reject) => {
		if(id){
			knex('chat_management').where(id).then((result)=>{
				resolve({'data':result})
			})
		}
	})
}

module.exports.addNudge = (nudgeinfo) => {

	var times= moment().format('LTS');
	//var newtime = times.split('A')[0]

   
	var insertnudge={
		'message' 	: nudgeinfo.message ,
		'fixture'	: nudgeinfo.fixture,
		'senderId'  : nudgeinfo.senderId,
		'replayMsg'	: nudgeinfo.replayMsg ,
		'replayBy'  : nudgeinfo.replayBy ,
		'createdBy' : nudgeinfo.createdBy ,
		'updatedBy' : nudgeinfo.updatedBy,
		'isActive'  : nudgeinfo.isActive,
		'isDelete'  : nudgeinfo.isDelete,
		'time'      : times  
	}


	return new Promise((resolve, reject) => {
		if(insertnudge){	
			knex('chat_management').insert(insertnudge).then((result)=>{
				if(result){

					resolve({'success':true,'message':'nudge add successfully'})
				}else{
					resolve({'success':false,'message':'nudge not saved try again'})
				}
			})
		}
	})
}

module.exports.editNudge = (nudgeinfo) => {

	var times= moment().format('LTS');
	//var newtime = times.split('P')[0]
     var id = nudgeinfo.id;
   //// console.log(newtime)
	var updatenudge={
		'message' 	: nudgeinfo.message ,
		'fixture'	: nudgeinfo.fixture,
		'senderId'  : nudgeinfo.senderId,
		'replayMsg'	: nudgeinfo.replayMsg ,
		'replayBy'  : nudgeinfo.replayBy ,
		'createdBy' : nudgeinfo.createdBy ,
		'updatedBy' : nudgeinfo.updatedBy,
		'isActive'  : nudgeinfo.isActive,
		'isDelete'  : nudgeinfo.isDelete,
		'time'      : times  
	}
   //// console.log(id)

	return new Promise((resolve, reject) => {
		
			knex('chat_management').update(updatenudge).where({'id':id}).then((result)=>{
				if(result){

					resolve({'success':true,'message':'nudge update successfully'})
				}else{
					resolve({'success':false,'message':'nudge not update try again'})
				}
			})
		
	})
}
module.exports.messageread=(userinfo)=>{
var id = userinfo;
return new Promise((resolve,reject)=>{
	if(id){
		knex('chat_management').update({'isActive':'N'}).where(id).then((result)=>{
			if(result){
				resolve({'message':'message read..'})
			}
		})
	}else{
		resolve({'success':false,'message':'id not found'})
	}
})
}
module.exports.messageSystemAlertlist=()=>{
	return new Promise((resolve,reject)=>{
		knex('user_allow_system_activity_alerts').where({'isDelete':'N'}).orderBy('id', 'desc').then((result)=>{
			if(result){
                 resolve({'data':result}) 
			}else{
				resolve({'success':false,'message':'data not found'})
			}
		})
	})
}




