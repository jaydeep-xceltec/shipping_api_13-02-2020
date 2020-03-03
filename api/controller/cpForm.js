// CP Form Management
const knex = require('knex')(require('../knexfile'))
var moment = require('moment');
// CP Form Create
module.exports.cpFormcreate = (data) =>
{
    var typecpformName = data.cpformName;
    return new Promise((resolve, reject) =>
    {
        knex('cp_form_management').where({ cpformName: typecpformName }).then((rdata) =>
        {
            if (rdata.length > 0)
            {
                const responseData =
                {
                    'success': false,
                    "message": "CP Form Name Already Exists"
                }
                resolve(responseData)
            } else {
                return knex('cp_form_management').insert(
                {
                    cpformName: data.cpformName,
                    description: data.description,
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
                        "message": "CP Form Name Created Successfully"
                    }
                    resolve(responseData)
                })
            }
        })
    })
}
// CP Form Records
module.exports.cpFormlist = () =>
{
    return new Promise(async (resolve, reject) =>
    {
        await knex('cp_form_management').where({ isDelete: 'N' }).orderBy('id', 'desc').then(async (data) =>
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
                        'cpformName' : dat.cpformName,
                        'description' : dat.description,
                        'createdAt'  : dat.createdAt,
                        'createdBy'  : dat.createdBy,
                        'updatedAt'  : dat.updatedAt,
                        'updatedBy'  : dat.updatedBy,
                        'isActive'   : dat.isActive,
                        'isDelete'  : dat.isDelete
                    }
                    arr.push(dateobject)
                }
                const responseData =
                {
                    'success': true,
                    'message': "CP Form Name Records",
                    'data'   : arr
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
// CP Form Update
module.exports.cpFormupdate = (data) =>
{
    var id = data.id;
    var cpformName = data.cpformName;
    var description = data.description;
    return new Promise((resolve, reject) =>
    {
        knex('cp_form_management').where({ cpformName: cpformName }).where({ isDelete: 'N' }).then((rdata) =>
        {
            if (rdata.length > 0)
            {
                if(rdata[0].id == data.id)
                {
                    return knex('cp_form_management').update(
                    {
                        cpformName: data.cpformName,
                        description: data.description,
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
                        'message': "CP Form Name Already Exists"
                    }
                    resolve(responseData);
                }
            } else {
                return knex('cp_form_management').update(
                {
                    cpformName: data.cpformName,
                    description: data.description,
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
module.exports.cpFormdelete = (data) =>
{
    var id = data.id;
    return new Promise((resolve, reject) =>
    {
        return knex('cp_form_management').update({ isDelete: 'Y' }).where('id', id).then(async (data) =>
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
// CP Form Status Update
module.exports.cpFormStatusUpdate = (data) =>
{
    var id = data.id;
    return new Promise((resolve, reject) =>
    {
        return knex('cp_form_management').update(
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