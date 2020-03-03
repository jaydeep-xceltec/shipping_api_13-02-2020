// Notification Management
const knex = require('knex')(require('../knexfile'))
var moment   = require('moment');
const nodemailer = require('nodemailer');
// Notification Create
// module.exports.notificationCreate = (data) =>
// {
//     return new Promise((resolve, reject) =>
//     {
//         return knex('draw_notification').insert(
//         {
//             fromUserId: data.fromUserId,
//             toUserId: data.toUserId,
//             notification: data.notification,
//             createdBy: data.createdBy,
//             createdAt: new Date(),
//             updatedBy: data.updatedBy,
//             updatedAt: new Date(),
//             isActive: "Y",
//             isDelete: "N",
//         }).then((result) =>
//         {
//             const responseData =
//             {
//                 'success': true,
//                 "message": "Notification Created Successfully"
//             }
//             resolve(responseData)
//         })
//     })
// }

module.exports.notificationCreate = (data) =>
{
    return new Promise((resolve, reject) =>
    {
        knex('users_management').where( {'id':data.updatedBy } ).where({ isDelete: 'N' }).orderBy('id', 'desc').then(async (userData) =>
        {
            console.log(userData);
            if (userData.length > 0)
            {
                console.log(userData[0].ownerId);
                knex('users_management').where( {'id':userData[0].ownerId } ).where({ isDelete: 'N' }).orderBy('id', 'desc').then(async (ownerData) =>
                {
                    console.log(ownerData);
                    if (ownerData.length > 0)
                    {
                        var ownerDataInfo = ownerData[0];
                        console.log(ownerDataInfo);

                        return knex('draw_notification').insert(
                        {
                            fromUserId: data.fromUserId,
                            toUserId: ownerDataInfo.id,
                            notification: data.notification,
                            createdBy: data.createdBy,
                            createdAt: new Date(),
                            updatedBy: data.updatedBy,
                            updatedAt: new Date(),
                            isActive: "Y",
                            isDelete: "N",
                        }).then((result) =>
                        {
                            var transporter = nodemailer.createTransport(
                            {
                                host: 'smtp.gmail.com',
                                port: 587,
                                secure: false, 
                                auth:
                                {
                                    user: 'charterparty2019@gmail.com',
                                    pass: 'nyzfungfcrywpoea'
                                }
                            });
                
                            var mailOptions =
                            {
                                from: 'charterparty2019@gmail.com',
                                to: ownerDataInfo.email,
                                subject: 'New Draw C/p notification  ',
                                text: data.notification,
                            };
                            
                            transporter.sendMail(mailOptions, function(error, info)
                            {
                                if (error){} else 
                                {
                                    const emailData =
                                    {
                                        'success': true,
                                        'message': ' Email send successfully .',
                                        'data': info
                                    }
                                    resolve(emailData)
                                    console.log(emailData);
                                }
                            });
                            const responseData =
                            {
                                'success': true,
                                "message": "Notification Created Successfully"
                            }
                            resolve(responseData)
                            console.log(responseData);
                            
                        })
                    }
                })
            }
        });

        knex('users_management').where( {'id':data.toUserId } ).where({ isDelete: 'N' }).orderBy('id', 'desc').then(async (chartererData) =>
        {
            if (chartererData.length > 0)
            {
                var chartererDataInfo = chartererData[0];
                return knex('draw_notification').insert(
                {
                    
                    fromUserId: data.fromUserId,
                    toUserId: chartererDataInfo.id,
                    notification: data.notification,
                    createdBy: data.createdBy,
                    createdAt: new Date(),
                    updatedBy: data.updatedBy,
                    updatedAt: new Date(),
                    isActive: "Y",
                    isDelete: "N",
                }).then((result) =>
                {
                    var transporter = nodemailer.createTransport(
                    {
                        host: 'smtp.gmail.com',
                            port: 587,
                        secure: false, 
                        auth:
                        {
                            user: 'charterparty2019@gmail.com',
                            pass: 'nyzfungfcrywpoea'
                        }
                    });
        
                    var mailOptions =
                    {
                        from: 'charterparty2019@gmail.com',
                        to: chartererDataInfo.email,
                        subject: 'New Draw C/p notification  ',
                        text: data.notification,
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info)
                    {
                        if (error){} else 
                        {
                            const emailData =
                            {
                                'success': true,
                                'message': ' Email send successfully .',
                                'data': info
                            }
                            resolve(emailData)
                            console.log(emailData);
                        }
                    });
                    const responseData =
                    {
                        'success': true,
                        "message": "Notification Created Successfully"
                    }
                    resolve(responseData)
                    console.log(responseData);
                    
                })
            }
           
        })
    })
}

// Notification Records
module.exports.notificationRecords = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await knex('draw_notification').where(filterCondition).where({ isDelete: 'N' }).orderBy('id', 'desc').then(async (data) =>
        {
            var arr = []
            if (data.length > 0)
            {
                for (dat of data)
                {
                    var dateInfo = moment(dat.createdAt).format('YYYY-MM-DD');
                    var dateobject =
                    {
                        'id'         : dat.id,
                        'fromUserId' : dat.fromUserId,
                        'toUserId' : dat.toUserId,
                        'notification' : dat.notification,
                        'createdAt'  : dateInfo,
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
                    'message': "Notification Records",
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