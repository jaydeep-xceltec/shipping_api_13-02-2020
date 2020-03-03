const knex = require('knex')(require('../knexfile'))


module.exports = {
 
	async RoleAssigncreate(roleassigndata){
		return new Promise((resolve,reject) => {

          var data = roleassigndata;
          for(var i=0;i<data.user_management.length;i++){
            let item = knex('role_module_action').insert({
                userroleId: data.user_management[i].role_id,
                moduleactionId: data.user_management[i].moduleactionId,
                createdBy:data.user_management[i].createdBy,
                updatedBy:data.user_management[i].updatedBy,
                isActive: 'Y',
                isDelete: 'N'
            })
        }
        
    })
		return true;
	}
}
module.exports.roleActionView = (req, res) => {
    return new Promise( async (resolve,reject) => {
        var arr = [];
        await knex('module').then(async (data) =>{
          if(data){

            var newdata = await data;
            var newarray=[];
            var count=0;
            for(var item of newdata){
                await knex('action').where({moduleid:item.id}).then((result) =>{
                    newarray.push(result) ;
                });
                var temp = {
                    'id' : item.id,
                    'moduleName' : item.moduleName,
                    'action_arr' :newarray[count]
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
module.exports.rolePermision = (updatedata)=>{

    return new Promise(async (resolve,reject) => {

        var userroleId = updatedata.userroleId
//knes delete via role_id
knex('role_module_action').delete().where('userroleId',userroleId).then( (data) =>{

})

for(let items of updatedata.data){
    for(let item of items.action_arr){
        if(item.checked){

            var insertobject = {
                userroleId : item.userroleId,
                moduleactionId  : item.moduleactionId,
                createdBy   : item.createdBy,
                updatedBy   : item.updatedBy,
                isActive    : item.isActive,
                isDelete    : item.isDelete
            }
           // console.log(insertobject)
            knex('role_module_action').insert(insertobject).then( (data) =>{
                const responseData = {
                    'success':true,
                    'message':"Your role action created successfully",
                    'data':data
                }
                resolve(responseData) 

            })

//Insert into role
//INSERT INTO `role_module_action` (`userroleId`, `moduleactionId`, `createdBy`, `createdAt`, `updatedBy`, `updatedAt`, `isActive`, `isDelete`) VALUES (NULL, '1', '1', '7', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP, 'Y', 'N')
}
 

}
}
})
}