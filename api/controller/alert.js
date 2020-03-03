const knex = require('knex')(require('../knexfile'))


module.exports.Alerlist = (req, res) => {
	return new Promise( async (resolve,reject) => {
		var arr = [];
		await knex('system_activity_alerts_category').where({'parentId':0,'isDelete':'N'}).orderBy('id','desc').then(async (data) =>{
			if(data){

				var newdata = await data;
				var newarray=[];
				var count = 0;
				for(var item of newdata){
					//console.log(item.id)
					await knex('system_activity_alerts_category').where({parentId:item.id,'isDelete':'N'}).orderBy('id','desc').then((result) =>{
						newarray.push(result) ;
					});
					var temp = {
						'id' : item.id,
						'parentId':item.parentId,
						' categoryName':item.categoryName,

						'alertdata' :newarray[count]
					};
					arr.push(temp);
					count++;
				}

			}
		});
		const responseData = {
			'success':true,
			'message':"Data fetch successfully",
			'data':arr
		}
		resolve(responseData);
	})
}

module.exports.categoryInsert = (updatedata)=>{
	var addata = updatedata;
	var dataobj = {
		categoryName:addata.categoryName,
		createdBy:addata.createdBy,
		updatedBy:addata.updatedBy,

	}
	return new Promise(async (resolve,reject) => {
		knex('system_activity_alerts_category').where({'categoryName':addata.categoryName}).where({'isDelete':'N'}).then((resultdata)=>{
			if(resultdata.length>0){
				resolve({'success':false,'message':'Alert category is already Exists'})
			}else{
				knex('system_activity_alerts_category').insert(dataobj).then( (data) =>{
					for(var key of data){
						var maincategoryid={categoryid:key};

						const responseData = {
							'success':true,
							'message':"Alert Category insert successfully ",
							'data':maincategoryid
						}
						resolve(responseData)
					}

				})
			}
		})

	})
}
module.exports.categoryUpdate = (Editdata)=>{
	var editdata = Editdata;
	var category_id = editdata.category_id;

	var dataobj = {

		categoryName:editdata.CategoryName,
		updatedBy:editdata.updatedBy
	}


	//console.log(dataobj)
	return new Promise(async (resolve,reject) => {
		knex('system_activity_alerts_category').where({'categoryName':editdata.CategoryName}).whereNot({id:category_id}).then((resultinfo)=>{
			if(resultinfo.length>0){
				const responseData = {
					'success':false,
					'message':"Alert category already Exists",

				}
				resolve(responseData)
			}else{
				knex('system_activity_alerts_category').update(dataobj).where({'id':category_id}).then( (data) =>{

					const responseData = {
						'success':true,
						'message':"Alert category update successfully ",

					}
					resolve(responseData)

				})
			}
		})


	})
}
module.exports.categoryDelete = (Deletedata)=>{
	var deletedata = Deletedata;
	var category_id = deletedata.category_id;
	//console.log(category_id)
	return new Promise(async(resolve,reject)=>{

		knex('system_activity_alerts_category').update({'isDelete':'Y'}).where({'id':category_id}).then( (data) =>{
			//console.log(data)
			if(data>0){
				const responseData = {
					'success':true,
					'message':"Yor are deleted Alert category successfully",

				}
				resolve(responseData)
			}else{
				const responseData = {
					'success':false,
					'message':"somthing wrong... ",

				}
				resolve(responseData)
			}
		})

	})
}





module.exports.subcategoryAdd = (updatedata)=>{
	var addata = updatedata;
//console.log(addata);
return new Promise(async (resolve,reject) => {
	for (var item of addata.subcategory){
		var dataobj = {
			parentId :addata.parentId,
			categoryName :item.subcategory_name,
			createdBy :addata.createdBy,
			updatedBy :addata.updatedBy,

		}
//console.log(item.subcategory_name)
await knex('system_activity_alerts_category').where({'categoryName':item.subcategory_name}).then(async(info)=>{
	//console.log(info)
	if(info.length>0){
		const responseData = {
			'success':false,
			'message':"This category already Exists ",

		}
		resolve(responseData)
	}else{

		await knex('system_activity_alerts_category').insert(dataobj).then( (data) =>{
			const responseData = {
				'success':true,
				'message':"data insert successfully ",
				'data':data
			}
			resolve(responseData)

		})
	}
})



}
})


}

module.exports.subcategoryUpdate = (Editdata)=>{
	var editdata = Editdata;
	var category_id = editdata.category_id;
	var parentId = editdata.parentId;
	var dataobj = {

		categoryName:editdata.subCategoryName,
		updatedBy:editdata.updatedBy
	}


//console.log(dataobj)
return new Promise(async (resolve,reject) => {
	await knex('system_activity_alerts_category').where({'categoryName':editdata.subCategoryName}).then((resinfo)=>{
		if(resinfo.length>0){
			const responseData = {
				'success':false,
				'message':"Alert category name already present .",

			}
			resolve(responseData)
		}else{
			knex('system_activity_alerts_category').update(dataobj).where({'id':category_id,'parentId':parentId}).then( (data) =>{

				const responseData = {
					'success':true,
					'message':"Alert subcategory data update successfully .",

				}
				resolve(responseData)

			})
		}
	})
	await knex('system_activity_alerts_category').where({'parentId':0,'isDelete':'N'}).then(async (data) =>{});

})
}
module.exports.subcategoryDelete = (Deletedata)=>{
	var deletedata = Deletedata;
	var category_id = deletedata.category_id;
	var parentId=deletedata.parentId;
	//console.log(category_id)

	//console.log(parentId)

	return new Promise(async(resolve,reject)=>{

		knex('system_activity_alerts_category').update({'isDelete':'Y'}).where({'id':category_id,'parentId':parentId}).then( (data) =>{
			//console.log(data)
			if(data>0){
				const responseData = {
					'success':true,
					'message':"Yor are deleted Alert subcategory successfully",

				}
				resolve(responseData)
			}else{
				const responseData = {
					'success':false,
					'message':"somthing wrong... ",

				}
				resolve(responseData)
			}
		})

	})
}

module.exports.BrokerManegeAlerlist = (req, res) => {
	return new Promise( async (resolve,reject) => {
		var arr = [];
		await knex('system_activity_alerts_category').where({'parentId':0,'isDelete':'N'}).orderBy('id','desc').then(async (data) =>{
			if(data){

				var newdata = await data;
				var newarray=[];
				var count = 0;
				for(var item of newdata){
//console.log(item.id)
await knex('system_activity_alerts_category').where({parentId:item.id,'isDelete':'N'}).orderBy('id','desc').then((result) =>{
	newarray.push(result) ;
});
var temp = {
	'id' : item.id,
	'parentId' : item.parentId,
	'categoryName':item.categoryName,

	'alertdata' :newarray[count]
};
arr.push(temp);
count++;
}

}
});
		const responseData = {
			'success':true,
			'message':"Data fetch successfully",
			'data':arr
		}
		resolve(responseData);
	})
}





















































// module.exports.BrokerManegeAlertinsert = (updatedata)=>{

// return new Promise(async (resolve,reject) => {

// var parentId = updatedata.parentId
// //knes delete via role_id
// knex('system_activity_alerts_category').delete().where('parentId',parentId).then( (data) =>{

// })

// for(let items of updatedata.data){
// for(let item of items.alertdata){
// if(item.checked){

// var insertobject = {
// parentId : item.parentId,
// categoryName : item.categoryName,
// createdBy : item.createdBy,
// updatedBy : item.updatedBy,
// isActive : item.isActive,
// isDelete : item.isDelete
// }
//// console.log(insertobject)
// knex('system_activity_alerts_category').insert(insertobject).then( (data) =>{
// const responseData = {
// 'success':true,
// 'Message':"data insert successfully in role_module_action ",
// 'data':data
// }
// resolve(responseData)

// })


// }
// }
// }
// })
// }