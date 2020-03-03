const knex = require('knex')(require('../knexfile'))
var moment = require('moment');

module.exports.companyCreate = (data) => {
	var  companyName = data.companyName;
	var cmail = data.companyEmail;
	var email = cmail.toLowerCase();
	return new Promise((resolve,reject) => {
		knex('company_management').where({companyName:companyName}).then((rdata) => {
			if(rdata.length>0){
				const responseData = {
					'success': false,
					"message": "company already exists"               
				}
				resolve(responseData)
			}else{
				return knex('company_management').insert({
					companyName       : data.companyName,
					companyEmail      : email,
					mobile            : data.mobile,
					companyAddress    : data.companyAddress,
					companyFax        : data.companyFax,
					owner             : data.owner,
					createdBy         : data.createdBy,
					updatedBy         : data.updatedBy,
					isDelete          : "N",
					isActive          : "Y",
					cityId            : "1",
					stateId           : "1",
					countryID         : "1"
				}).then((result)=>{
					const responseData = {
						'success': true,
							'result':result,
						"message": "company created successfully"               
					}
					resolve(responseData)
				})
			}
			
		})
	})
}

module.exports.companylist = () => {
	return new Promise(async(resolve,reject) => {
		await knex('company_management').where({isDelete:'N'}).orderBy('id', 'desc').then(async (data) =>{
			var arr =[]
			if(data.length>0){
				for(dat of data){
                  var createdat = await dat.createdAt;
                  var datetime = await moment(createdat).format('lll');
                  var dateobject = {
                     'createdAt'           : datetime,
                     'id'                  : dat.id,
                     'companyName'         : dat.companyName,
                     'companyEmail'        : dat.companyEmail,
                     'mobile'              : dat.mobile,
                     'companyAddress'      : dat.companyAddress,
                     'postNumber'          : dat.postNumber,
                     'mainOffice'          : dat.mainOffice,
                     'companyFax'          : dat.companyFax,
                     'owner'               : dat.owner,
                     'createdBy'           : dat.createdBy,
                     'updatedBy'           : dat.updatedBy,
                     'isActive'            : dat.isActive,
                     'isDelete'            : dat.isDelete
                  }
				arr.push(dateobject)
				}
				 // console.log(arr)
				const  responseData = {
					'success':true,
					'message':"company list",
					'data': arr
				}
				resolve(responseData);
			}else{
				const  responseData = {
					'success':false,
					'message':"Data not found"
				}
				resolve(responseData);
			}
		})
	})
}

module.exports.getUsersCompanyList = (filterConditions) =>
{
		return new Promise(async(resolve,reject) =>
		{
            await knex('company_management')
					.where({isDelete:'N'}).whereIn('id', filterConditions.companyIDS).orderBy('id', 'desc').then(async (data) =>{
			var arr =[]
			if(data.length>0){
				for(dat of data){
                  var createdat = await dat.createdAt;
                  var datetime = await moment(createdat).format('lll');
                  var dateobject = {
                     'createdAt'           : datetime,
                     'id'                  : dat.id,
                     'companyName'         : dat.companyName,
                     'companyEmail'        : dat.companyEmail,
                     'mobile'              : dat.mobile,
                     'companyAddress'      : dat.companyAddress,
                     'postNumber'          : dat.postNumber,
                     'mainOffice'          : dat.mainOffice,
                     'companyFax'          : dat.companyFax,
                     'owner'               : dat.owner,
                     'createdBy'           : dat.createdBy,
                     'updatedBy'           : dat.updatedBy,
                     'isActive'            : dat.isActive,
                     'isDelete'            : dat.isDelete
                  }
				arr.push(dateobject)
				}
				 // console.log(arr)
				const  responseData = {
					'success':true,
					'message':"company list",
					'data': arr
				}
				resolve(responseData);
			}else{
				const  responseData = {
					'success':false,
					'message':"Data not found"
				}
				resolve(responseData);
			}
		})
	})
}


module.exports.companyupdate = (data) => {
	var   id              = data.id;
	var   companyName     = data.companyName;
	var cmail = data.companyEmail;
	var companyEmail = cmail.toLowerCase();
	var	  mobile          = data.mobile;
	var   companyAddress  = data.companyAddress;
	var   companyFax      = data.companyFax;
	var	  owner           = data.owner;

	return new Promise((resolve,reject) => {
			knex('company_management').where({ companyName:companyName }).where({isDelete:'N'}).whereNot({id:id}).then((rdata) => {
                   if(rdata.length>0){
                   const  responseData = {
						'success':false,
						'message':"company name  already exists"
					}
					resolve(responseData);
			}else{
			return knex('company_management').update({companyName:companyName,companyEmail:companyEmail,mobile:mobile,companyAddress:companyAddress,companyFax:companyFax,owner:owner}).where('id',id).then((data) =>{
			if(data){
				const  responseData = {
					'success':true,
					'message':"Data successfully updated"
				}
				resolve(responseData);
					}
				})
		}
			})
		
	})

}

module.exports.companydelete = (data) => {
	var id = data.id;
	return new Promise((resolve,reject) => {
		return knex('company_management').update({isDelete:'Y'}).where('id',id).then( async (data) => {
			if(data){
				await	knex('users_management').update({isDelete:'Y'}).where({companyId : id}).then((rdata) => {
					if(rdata){
                    const responseData = {
						'success': true,
						'message':"Company and all users related this company removed successfully"
					}
					resolve(responseData);
					}else{
						 const responseData = {
						'success': true,
						'message':"Company remove successfully"
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