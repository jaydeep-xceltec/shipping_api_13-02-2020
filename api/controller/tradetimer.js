// CP Form Management
const knex = require('knex')(require('../knexfile'))
var moment = require('moment');
// CP Form Create
module.exports.tradetimercreate = (data) =>
{
    var heading = data.heading;
    return new Promise((resolve, reject) =>
    {
        knex('trade_timer').where({title: data.heading }).then((rdata) =>
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
                return knex('trade_timer').insert(
                {
                    title: data.title,
                    timer:data.timer,
                    updatedBy: data.updatedBy,
                    updatedAt: new Date(),
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
module.exports.tradetimerlist = () =>
{
    return new Promise(async (resolve, reject) =>
    {
        await knex('trade_timer').orderBy('id', 'desc').then(async (data) =>
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
                        'title' : dat.title,
                        'timer':dat.timer,
                        'updatedAt'  : dat.updatedAt,
                        'updatedBy'  : dat.updatedBy,
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
module.exports.tradetimerupdate = (data) =>
{
    var id = data.id;
    var heading = data.title;
console.log(data);
console.log(id);
console.log(heading);



    return new Promise((resolve, reject) =>
    {
        knex('trade_timer').where({ title: data.title }).then((rdata) =>
        {
            if (rdata.length > 0)
            {
console.log('timer',rdata);
                
                if(rdata[0].id == data.id)
                {
console.log('timer',data);
                    
                    return knex('trade_timer').update(
                    {
                        title: data.title,
                        timer:data.timer,
                        updateAt: new Date(),
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
                        'message': "trade_timer Already Exists"
                    }
                    resolve(responseData);
                }
            } else {
                return knex('trade_timer').update(
                {
                    title: data.title,
                    timer:data.timer,
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
module.exports.tradetimerdelete = (data) =>
{
    var id = data.id;
    return new Promise((resolve, reject) =>
    {
        return knex('trade_timer').update({ isDelete: 'Y' }).where('id', id).then(async (data) =>
        {
            if (data)
            {
                await knex('trade_timer').update({ isDelete: 'Y' }).where({ id: id }).then((rdata) =>
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
module.exports.tradetimerStatusUpdate = (data) =>
{
    var id = data.id;
    return new Promise((resolve, reject) =>
    {
        return knex('trade_timer').update(
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