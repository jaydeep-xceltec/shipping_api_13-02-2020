const knex = require('knex')(require('../knexfile'))



module.exports.moduleactionCreate = (actionmdata) =>
{
    return new Promise(async(resolve,reject) =>
    {
        console.log(actionmdata.userroleid);
        console.log(actionmdata.createdBy);
        console.log(actionmdata.updatedBy);
        console.log(actionmdata.data);
        console.log(actionmdata.data.length);
        if(actionmdata.userroleid && actionmdata.createdBy && actionmdata.updatedBy && (actionmdata.data.length>0))
        {
            var userid = actionmdata.userroleid;
            await knex('role_module_action').where({userroleId:actionmdata.userroleid}).then(async(rdata) =>
            {
                for(moduleid of rdata)
                {
                    await knex('module_actions').delete().where('id',moduleid.moduleactionId).then( (deletedata) =>
                    {
                    })
                }
            })
            
            await knex('role_module_action').delete().where({userroleId:actionmdata.userroleid}).then((roldata) =>
            {
            })
        
            var userroleid = actionmdata.userroleid;
            
            for(dt of actionmdata.data)
            {
                var insertdata =
                {
                    moduleId:dt.moduleId,
                    actionId:dt.actionId,
                    createdBy:actionmdata.createdBy,
                    updatedBy:actionmdata.updatedBy
                }

                await knex('module_actions').insert(insertdata).then(async(result)=>
                {
                    for(data1 of result)
                    {
                        var datause =
                        {
                            userroleid : actionmdata.userroleid,
                            moduleactionid : data1,
                            updatedBy: actionmdata.updatedBy,
                            createdBy: actionmdata.createdBy
                        }
                        await knex('role_module_action').insert(datause).then((rdata) => {})
                    }
                });
            }
            const responseData =
            {
                'success': true,
                'message': "Your Module Action is created successfully"
            }
            resolve(responseData);
        } else {
            const responseData =
            {
                'success': false,
                'message': "pls provide correct data"
            }
            resolve(responseData)
        }
    })
}

module.exports.selectroleList = (roleid) =>{
        var roleid = roleid.id;
        return new Promise((resolve,reject) =>{
          knex.select('ma.moduleId','ma.actionId').from('role_module_action as rma').innerJoin('module_actions as ma','rma.moduleactionId','ma.id').where({'rma.userroleId':roleid}).then( async (datares) => {
            if(datares.length>0){
              const responseData = {
                'success': true,
                'message': "Role assign list",
                'data' : datares
              }
              resolve(responseData);
            }else{
              const responseData = {
                'success': false,
                'message': "Data not found"
              }
              resolve(responseData);
            }
          })
        })
}
