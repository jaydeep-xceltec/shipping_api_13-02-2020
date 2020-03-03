const knex = require('knex')(require('../knexfile'))


module.exports = {
	 moduleCreate(moduledata){
	 	var moduleName = moduledata.moduleName;
	 	var icon = moduledata.icon;
	 	var isActive = moduledata.isActive;
	 	var isDelete = moduledata.isDelete;
	 	var createdBy = moduledata.createdBy;
	 	var updatedBy = moduledata.updatedBy;
	 	return new Promise((resolve,reject) => {
	 		return knex('module').insert({
               moduleName:moduleName,
               icon:icon,
               isActive:isActive,
               isDelete:isDelete,
               createdBy:createdBy,
               updatedBy:updatedBy
            }).then((result)=>{
              const responseData = {
                'success': true,
                "message": "Your module is created successfully"               
              }
              resolve(responseData)
            });
	 	})
	 },
	 moduleRead(){
	 	return new Promise((resolve,reject) => {
			return knex('module').where({}).then((data) =>{
				if(data){
					const  responseData = {
						'success':true,
						'message':"Data fetch successfully",
						 'data':data
					}
					resolve(responseData);
				}
			})
		})
	 },
	 moduleUpdate(moduleupdatedata){
         var id = moduleupdatedata.id;
         var moduleName = moduleupdatedata.moduleName;
         var icon = moduleupdatedata.icon;

         return new Promise((resolve,reject) => {

           if(moduleName && icon){
           	  return knex('module').update({moduleName:moduleName,icon:icon}).where('id',id).then((data) =>{
				if(data){
					const  responseData = {
						'success':true,
						'message':"Both modulename and icon successfully updated"
					}
					resolve(responseData);
				}
			})
           }else{
           	if(moduleName){
           		return knex('module').update({moduleName:moduleName}).where('id',id).then((data) =>{
				if(data){
					const  responseData = {
						'success':true,
						'message':"modulename successfully updated"
					}
					resolve(responseData);
				}
			})
           	}
           	if(icon){
               return knex('module').update({icon:icon}).where('id',id).then((data) =>{
				if(data){
					const  responseData = {
						'success':true,
						'message':"icon successfully updated"
					}
					resolve(responseData);
				}
			})
           	}
           } 

         })
	 },
	 moduleDelete(moduledelete){
	 		var id = moduledelete.id;
		    var isDelete = moduledelete.isDelete;
		return new Promise((resolve,reject) => {
			return knex('module').update({isDelete:isDelete}).where('id',id).then((data) => {
				if(data){
					const responseData = {
						'success': true,
						'message':"module remove successfully"
					}
					resolve(responseData);
				}
			})
		})
	 }

}