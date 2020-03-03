const knex = require('knex')(require('../knexfile'))

module.exports.userRolemanage = (userrole) => {
		var rolename = userrole.rolename;
		var roleName = rolename[0].toUpperCase() + rolename.slice(1);
		var roleactive = userrole.active;
		var roledelete = userrole.delete
		return new Promise((resolve,reject) => {
			knex('user_role_management').where({roleName:roleName}).then((rdata) => {
				if(rdata.length>0){
					const responseData = {
						'success': false,
						"message": "Role already exists"               
					}
					resolve(responseData)
				}else{
					return knex('user_role_management').insert({
						roleName : roleName,
						isActive : roleactive,
						isDelete : roledelete
					}).then((result)=>{
						const responseData = {
							'success': true,
							"message": "Your role is created successfully"               
						}
						resolve(responseData)
					});
				}

			})

		}) 
	}

module.exports.userRoleread = () => {
		return new Promise((resolve,reject) => {
			return knex('user_role_management').where({isDelete:'N'}).orderBy('id', 'desc').then((data) =>{
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
	} 

module.exports.userRoleupdate = (userrole) =>{
		var rolename = userrole.roleName;
		var roleName = rolename[0].toUpperCase() + rolename.slice(1);
		var isActive = userrole.isActive;
		var id = userrole.id;
		return new Promise((resolve,reject) => {
			knex('user_role_management').where({roleName:roleName}).where({isDelete:'N'}).whereNot({id:id}).then((rdata) => {
                   if(rdata.length>0){
                   const  responseData = {
						'success':false,
						'message':"Role already exists"
					}
					resolve(responseData);
			}else{
			return knex('user_role_management').update({roleName:roleName,isActive:isActive}).where('id',id).then((data) =>{
				if(data){
					const  responseData = {
						'success':true,
						'message':"Role successfully updated"
					}
					resolve(responseData);
				}
			})
		}
			})
	})
	}
	
module.exports.userRoledelete = (userrole) => {
	var id = userrole.id;
	var isDelete = userrole.isDelete;
	return new Promise((resolve,reject) => {
		return knex('user_role_management').update({isDelete:'Y'}).where('id',id).then((data) => {
			if(data){
				knex('users_management').update({isDelete:'Y'}).where({userRoleId: id}).then((rdata) => {
					if(rdata){
						const responseData = {
							'success': true,
							'message':"Role and all users related this role removed successfully"
						}
						resolve(responseData); 
					}else{
						const responseData = {
							'success': true,
							'message':"Role remove successfully"
						}
						resolve(responseData); 
					}
					
				})
				
			}else{
				const responseData = {
					'success': false,
					'message':"Id not found"
				}
				resolve(responseData);
			}
		})
	})
}
	
module.exports.userRoleactive = (userroleactive) => {
	var id = userroleactive.id;
	var isActive = userroleactive.isActive;
	return new Promise((resolve,reject) => {
		return knex('user_role_management').update({isActive:isActive}).where({id:id}).then(async(data) => {
			if(data){
			await knex('users_management').update({isActive:isActive}).where({userRoleId : id}).then((userdata) => {        
				})
				if(userroleactive.isActive == 'Y'){
					const responseData = {
						'success': true,
						'message':"User role and all related users active"
					}
					resolve(responseData);
				  
				}else{
					const responseData = {
						'success': false,
						'message':"User role and all related users Inactive"
					}
					resolve(responseData);
				}
			}else{
				const responseData = {
					'success': false,
					'message':"Id not found"
				}
				resolve(responseData);
			}
		})
	})
}