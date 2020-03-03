// CP Form Management
const knex = require('knex')(require('../knexfile'))
var moment = require('moment');
// CP Form Create
module.exports.faqcreate = (data) =>
{
    var question = data.question;
    return new Promise((resolve, reject) =>
    {
        knex('faq').where({ question: question }).then((rdata) =>
        {
            if (rdata.length > 0)
            {
                const responseData =
                {
                    'success': false,
                    "message": "Question Already Exists"
                }
                resolve(responseData)
            } else {
                return knex('faq').insert(
                {
                    question: data.question,
                    answer:data.answer,
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
                        "message": "Faq question Created Successfully"
                    }
                    resolve(responseData)
                })
            }
        })
    })
}
// CP Form Records
module.exports.faqlist = () =>
{
    return new Promise(async (resolve, reject) =>
    {
        await knex('faq').where({ isDelete: 'N' }).orderBy('id', 'desc').then(async (data) =>
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
                        'question' : dat.question,
                        'answer':dat.answer,
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
                    'message': "faq question Records",
                    'data'   : arr
                }
                resolve(responseData);
            } else {
                const responseData =
                {
                    'success': false,
                    'message': "Record Not Found"
                }
                reject(responseData);
            }
        })
    })
}

// CP Form Records
module.exports.faqlistactive = () =>
{
    return new Promise(async (resolve, reject) =>
    {
        await knex('faq').where({ isDelete: 'N', isActive: 'Y' }).orderBy('id', 'desc').then(async (data) =>
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
                        'question' : dat.question,
                        'answer':dat.answer,
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
                    'message': "faq question Records",
                    'data'   : arr
                }
                resolve(responseData);
            } else {
                const responseData =
                {
                    'success': false,
                    'message': "Record Not Found"
                }
                reject(responseData);
            }
        })
    })
}
// CP Form Update
module.exports.faqupdate = (data) =>
{
    var id = data.id;
    var question = data.question;
console.log(data);
console.log(id);
console.log(question);



    return new Promise((resolve, reject) =>
    {
        knex('faq').where({ question: question }).where({ isDelete: 'N' }).then((rdata) =>
        {
            if (rdata.length > 0)
            {
                if(rdata[0].id == data.id)
                {
                    return knex('faq').update(
                    {
                        question: data.question,
                        answer:data.answer,
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
                        'message': "faq question Already Exists"
                    }
                    resolve(responseData);
                }
            } else {
                return knex('faq').update(
                {
                    question: data.question,
                    answer:data.answer,
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
module.exports.faqdelete = (data) =>
{
    var id = data.id;
    return new Promise((resolve, reject) =>
    {
        return knex('faq').update({ isDelete: 'Y' }).where('id', id).then(async (data) =>
        {
            if (data)
            {
                await knex('faq').update({ isDelete: 'Y' }).where({ id: id }).then((rdata) =>
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
module.exports.faqStatusUpdate = (data) =>
{
    var id = data.id;
    return new Promise((resolve, reject) =>
    {
        return knex('faq').update(
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