// CP Form Management
const knex = require('knex')(require('../knexfile'))
var moment = require('moment');
// CP Form Create
module.exports.tccreate = (data) =>
{
    var heading = data.heading;
    return new Promise((resolve, reject) =>
    {
        knex('terms_condition').where({ heading: heading }).then((rdata) =>
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
                return knex('terms_condition').insert(
                {
                    heading: data.heading,
                    termscondition:data.termscondition,
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
module.exports.tclist = () =>
{
    return new Promise(async (resolve, reject) =>
    {
        await knex('terms_condition').where({ isDelete: 'N' }).orderBy('id', 'desc').then(async (data) =>
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
                        'heading' : dat.heading,
                        'termscondition':dat.termscondition,
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
                    'message': "terms condition  Records",
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

// CP Form Records
module.exports.tclistactive = () =>
{
    return new Promise(async (resolve, reject) =>
    {
        await knex('terms_condition').where({ isDelete: 'N' , isActive: 'Y' }).orderBy('id', 'desc').then(async (data) =>
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
                        'heading' : dat.heading,
                        'termscondition':dat.termscondition,
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
                    'message': "terms condition  Records",
                    'data'   : arr
                }
                resolve(responseData);
                console.log(responseData);
                
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
module.exports.tcupdate = (data) =>
{
    var id = data.id;
    var heading = data.heading;
console.log(data);
console.log(id);
console.log(heading);



    return new Promise((resolve, reject) =>
    {
        knex('terms_condition').where({ heading: heading }).where({ isDelete: 'N' }).then((rdata) =>
        {
            if (rdata.length > 0)
            {
                if(rdata[0].id == data.id)
                {
                    return knex('terms_condition').update(
                    {
                        heading: data.heading,
                        termscondition:data.termscondition,
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
                        'message': "terms_condition Already Exists"
                    }
                    resolve(responseData);
                }
            } else {
                return knex('terms_condition').update(
                {
                    heading: data.heading,
                    termscondition:data.termscondition,
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
module.exports.tcdelete = (data) =>
{
    var id = data.id;
    return new Promise((resolve, reject) =>
    {
        return knex('terms_condition').update({ isDelete: 'Y' }).where('id', id).then(async (data) =>
        {
            if (data)
            {
                await knex('terms_condition').update({ isDelete: 'Y' }).where({ id: id }).then((rdata) =>
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
module.exports.tcStatusUpdate = (data) =>
{
    var id = data.id;
    return new Promise((resolve, reject) =>
    {
        return knex('terms_condition').update(
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