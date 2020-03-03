// CP Form Management
const knex = require('knex')(require('../knexfile'))
var moment = require('moment');
// CP Form Create
module.exports.userSettingcreate = (data) =>
{
    var heading = data.heading;
    return new Promise((resolve, reject) =>
    {
        knex('user_setting').where({config_key: data.config_key }).then((rdata) =>
        {
            if (rdata.length > 0)
            {
                const responseData =
                {
                    'success': false,
                    "message": "condition Exists"
                }
                resolve(responseData)
            } else {
                return knex('user_setting').insert(
                {
                    config_key: data.config_key,
                    config_value:data.config_value,
                    createdBy: data.createdBy,
                    createdAt: new Date(),
                    updatedBy: data.updatedBy,
                    updatedAt: new Date(),
                    isActive: "Y",
                    isDelete: "N",
                }).then((result) =>
                {
                    const responseData =
                    {
                        'success': true,
                        "message": " Created Successfully"
                    }
                    resolve(responseData)
                })
            }
        })
    })
}
// CP Form Records
module.exports.userSettinglist = () =>
{
    return new Promise(async (resolve, reject) =>
    {
        await knex('user_setting').where({ isDelete: 'N' }).orderBy('id', 'desc').then(async (data) =>
        {
            var arr = []
            if (data.length > 0)
            {
                for (dat of data)
                {
                    var createdat = await dat.createdAt;
                    var dateobject =
                    {
                        'id'         : dat.id,
                        'config_key' : dat.config_key,
                        'config_value':dat.config_value,
                        'createdAt'  : dat.createdAt,
                        'createdBy'  : dat.createdBy,
                        'updatedAt'  : dat.updatedAt,
                        'updatedBy'  : dat.updatedBy,
                        'isActive'   : dat.isActive,
                        'isDelete'  : dat.isDelete
                    }
                    arr.push(dateobject)
                }
                console.log(arr);

                const responseData =
                {
                    'success': true,
                    'message': "terms condition  Records",
                    'data'   : arr
                }
                console.log(responseData);

                resolve(responseData);
            } else {
                const responseData =
                {
                    'success': false,
                    'message': "Record Not Found"
                }

                console.log(responseData);
                
                resolve(responseData);
            }
        })
    })
}
// CP Form Update
module.exports.userSettingupdate = (data) =>
{
    var id = data.id;
    var heading = data.config_key;
console.log(data);
console.log(id);
console.log(heading);



    return new Promise((resolve, reject) =>
    {
        knex('user_setting').where({ config_key: heading }).where({ isDelete: 'N' }).then((rdata) =>
        {
            if (rdata.length > 0)
            {
                if(rdata[0].id == data.id)
                {
                    return knex('user_setting').update(
                    {
                        config_key: data.config_key,
                        config_value:data.config_value,
                        updatedAt: new Date(),
                        updatedBy: data.updatedBy,
                      
                    }).where('id', id).then((data) =>
                    {
                        if (data)
                        {
                            const responseData =
                            {
                                'success': true,
                                'message': "Record Updated Successfully",
                                'body': data
                            }
                            resolve(responseData);
                        }
                    })
                } else {
                    const responseData =
                    {
                        'success': false,
                        'message': "user_setting Already Exists"
                    }
                    resolve(responseData);
                }
            } else {
                return knex('user_setting').update(
                {
                    config_key: data.config_key,
                    config_value:data.config_value,
                    updatedAt: data.updatedAt,
                    updatedBy: data.updatedBy,
                   
                }).where('id', id).then((data) =>
                {
                    if (data)
                    {
                        const responseData =
                        {
                            'success': true,
                            'message': "Record Updated Successfully",
                            'body': data
                        }
                        resolve(responseData);
                    }
                })
            }
        })
    })
}
// CP Form Remove
module.exports.userSettingdelete = (data) =>
{
    var id = data.id;
    return new Promise((resolve, reject) =>
    {
        return knex('user_setting').update({ isDelete: 'Y' }).where('id', id).then(async (data) =>
        {
            if (data)
            {
                await knex('user_setting').update({ isDelete: 'Y' }).where({ id: id }).then((rdata) =>
                {
                    if (rdata)
                    {
                        const responseData =
                        {
                            'success': true,
                            'message': "Record Removed Successfully"
                        }
                        resolve(responseData);
                    } else {
                        const responseData =
                        {
                            'success': true,
                            'message': "Record Removed Successfully"
                        }
                        resolve(responseData);
                    }
                })
            } else {
                const responseData =
                {
                    'success': false,
                    'message': "Record Not Found"
                }
                resolve(responseData);
            }
        })
    })
}
// CP Form Status Update
module.exports.userSettingStatusUpdate = (data) =>
{
    var id = data.id;
    return new Promise((resolve, reject) =>
    {
        return knex('user_setting').update(
        {
            'isActive'  :   data.isActive,
            'updatedBy' :   data.updatedBy,
            'updatedAt' :   new Date()
        }).where('id', id).then((data) =>
        {
            if (data)
            {
                const responseData =
                {
                    'success': true,
                    'message': "Status Updated Successfully",
                    'body':data
                }
                resolve(responseData);
            }
        })
    })
}