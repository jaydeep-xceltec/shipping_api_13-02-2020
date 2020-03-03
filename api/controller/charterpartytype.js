// Charter Party Type Management
const knex = require('knex')(require('../knexfile'))
var moment = require('moment');
// Create Charter Party Type
module.exports.charterpartytypecreate = (data) =>
{
    var typename = data.name;
    return new Promise((resolve, reject) =>
    {
        knex('charter_party_type').where({ name: typename }).then((rdata) =>
        {
            if (rdata.length > 0)
            {
                const responseData =
                {
                    'success': false,
                    "message": "Charter Party Type Name Already Exists"
                }
                resolve(responseData)
            } else {
                return knex('charter_party_type').insert(
                {
                    name: data.name,
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
                        "message": "Charter Party Type Name Created Successfully"
                    }
                    resolve(responseData)
                })
            }

        })
    })
}
// Charter Party Type Records
module.exports.charterpartytypelist = () =>
{   
    return new Promise(async (resolve, reject) =>
    {
        await knex('charter_party_type').where({ isDelete: 'N' }).orderBy('id', 'asc').then(async (data) =>
        {
            var arr = []
            if (data.length > 0)
            {
                for (dat of data)
                {
                    var createdat = await dat.createdAt;
                    var dateobject =
                    {
                        'id': dat.id,
                        'name': dat.name,
                        'createdAt': dat.createdAt,
                        'createdBy': dat.createdBy,
                        'updatedAt': dat.updatedAt,
                        'updatedBy': dat.updatedBy,
                        'isActive': dat.isActive,
                        'isDelete': dat.isDelete
                    }
                    arr.push(dateobject)
                }
                const responseData =
                {
                    'success': true,
                    'message': "Charter Party Type Records",
                    'data': arr
                }
                resolve(responseData);
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
// Charter Party Type Update
module.exports.charterpartytypeupdate = (data) =>
{
    var id = data.id;
    var name = data.name;
    return new Promise((resolve, reject) =>
    {
        knex('charter_party_type').where({ name: name }).where({ isDelete: 'N' }).then((rdata) =>
        {
            if (rdata.length > 0)
            {
                if(rdata[0].id == data.id)
                {
                    return knex('charter_party_type').update(
                    {
                        name: data.name,
                        createdAt: data.createdAt,
                        createdBy: data.createdBy,
                        updatedAt: data.updatedAt,
                        updatedBy: data.updatedBy,
                        isDelete: data.isDelete,
                        isActive: data.isActive,
                    }).where('id', id).then((data) =>
                    {
                        if (data)
                        {
                            const responseData =
                            {
                                'success': true,
                                'message': "Charter Party Type Name Updated Successfully",
                                'body':data
                            }
                            resolve(responseData);
                        }
                    })
                } else {
                    const responseData =
                    {
                        'success': false,
                        'message': "Charter Party Type Name Already Exists"
                    }
                    resolve(responseData);
                }
            } else {
                return knex('charter_party_type').update(
                {
                    name: data.name,
                    createdAt: data.createdAt,
                    createdBy: data.createdBy,
                    updatedAt: data.updatedAt,
                    updatedBy: data.updatedBy,
                    isDelete: data.isDelete,
                    isActive: data.isActive,
                }).where('id', id).then((data) =>
                {
                    if (data)
                    {
                        const responseData =
                        {
                            'success': true,
                            'message': "Charter Party Type Name Updated Successfully",
                            'body':data
                        }
                        resolve(responseData);
                    }
                })
            }
        })
    })
}
// Charter Party Type Remove
module.exports.charterpartytypedelete = (data) =>
{
    var id = data.id;
    return new Promise((resolve, reject) =>
    {
        return knex('charter_party_type').update({ isDelete: 'Y' }).where('id', id).then(async (data) =>
        {
            if (data)
            {
                await knex('draw_charter_management').update({ isDelete: 'Y' }).where({ id: id }).then((rdata) =>
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
// Charter Party Status Update
module.exports.charterPartyStatusUpdate = (data) =>
{
    var id = data.id;
    return new Promise((resolve, reject) =>
    {
        return knex('charter_party_type').update(
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