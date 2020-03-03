// Chat Management
const knex = require('knex')(require('../knexfile'))
const nodemailer = require('nodemailer');
var moment = require('moment');

// Chat Create
module.exports.chatCreate = (data) =>
{
    return new Promise((resolve, reject) =>
    {
        return knex('chat_board').insert(
        {
            userId: data.userId,
            senderId: data.senderId,
            message: data.message,
            user1: data.userId,
            user2: data.senderId,
            parentId: data.parentId,
            date: data.date,
            time: data.time,
            createdBy: data.createdBy,
            createdAt: new Date(),
            updatedBy: data.updatedBy,
            updatedAt: new Date(),
            isActive: "Y",
            isDelete: "N"
        }).then((result) =>
        {
            return knex('chat_board').insert(
            {
                userId: data.userId,
                senderId: data.senderId,
                message: data.message,
                user1: data.senderId,
                user2: data.userId,
                is_fetched: 'Y',
                is_read: 'Y',
                parentId: data.parentId,
                date: data.date,
                time: data.time,
                createdBy: data.createdBy,
                createdAt: new Date(),
                updatedBy: data.updatedBy,
                updatedAt: new Date(),
                isActive: "Y",
                isDelete: "N"
            }).then((result) =>
            {
                const responseData =
                {
                    'success': true,
                    "message": "Chat Created Successfully",
                    "data" : result,
                }
                resolve(responseData)
            })
        })
    })
}


module.exports.chatRecordsServerSide = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        knex('chat_board AS cb')
        .distinct('cb.user2')
        .select('um.username as toUserName')
        .join('users_management AS um', 'um.id', '=', 'cb.user2')
        .where(filterCondition)
        .then(async(commonUserData) =>
        {
            if(commonUserData.length > 0)
            {
                var messageCenterDataArray = [];
                var isNew = 0;
                for (messageCenterData of commonUserData)
                {
                    var messageCenterDataInfo =  messageCenterData;
                        messageCenterDataInfo['createdDateInfo'] = '';
                        messageCenterDataInfo['createdTimeInfo'] = '';
                        messageCenterDataInfo['messageID'] = '';
                        messageCenterDataInfo['message'] = '';
                        messageCenterDataInfo['isFetched'] = '';

                    await knex('chat_board')
                    .select('message','date','time','id','is_fetched')
                    .where({ 'user2' : messageCenterData.user2 }).orderBy('id','desc').limit(1).then(async (messagesResponseData) =>
                    {
                        for (messagesResponse of messagesResponseData)
                        {
                            messageCenterDataInfo['message'] = messagesResponse.message;
                            messageCenterDataInfo['createdDateInfo'] = moment(messagesResponse.date).format('YYYY-MM-DD');
                            messageCenterDataInfo['createdTimeInfo'] = messagesResponse.time;
                            messageCenterDataInfo['messageID'] = messagesResponse.id;
                            messageCenterDataInfo['isFetched'] = messagesResponse.is_fetched;

                            if(messagesResponse.is_fetched == 'N' && messagesResponse.userId == filterCondition.user1)
                            {
                                isNew = isNew + 1;
                            }
                        }
                    })
                    messageCenterDataArray.push(messageCenterDataInfo);
                }
                const responseData =
                {
                    'success': true,
                    'message': "Chat Records",
                    'data'   : messageCenterDataArray,
                    'newMessages' : isNew
                }
                resolve(responseData);
            } else {
                const responseData =
                {
                    'success': false,
                    'message': "No Chat Records Found",
                    'data'   : [],
                    'newMessages' : 0
                }
                reject(responseData);
            }
        })
    })
}


// Real Time Chat Records Server Side
module.exports.realTimeChatRecordsServerSide = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await knex('chat_board AS cb')
        .distinct('cb.user2')
        .select('um.username as toUserName')
        .join('users_management AS um', 'um.id', '=', 'cb.user2')
        .where({ 'is_fetched' : 'N' })
        .where(filterCondition).orderBy('cb.id','desc').then(async (commonUserData) =>
        {
            var messageCenterDataArray = [];
            var isNew = 0;
            for (messageCenterData of commonUserData)
            {
                var messageCenterDataInfo =  messageCenterData;
                    messageCenterDataInfo['createdDateInfo'] = '';
                    messageCenterDataInfo['createdTimeInfo'] = '';
                    messageCenterDataInfo['messageID'] = '';
                    messageCenterDataInfo['message'] = '';
                    messageCenterDataInfo['isFetched'] = '';

                await knex('chat_board')
                .select('message','date','time','id','is_fetched')
                .where({ 'user2' : messageCenterData.user2 }).orderBy('id','desc').limit(1).then(async (messagesResponse) =>
                {
                    for (messagesResponse of messagesResponse)
                    {
                        messageCenterDataInfo['message'] = messagesResponse.message;
                        messageCenterDataInfo['createdDateInfo'] = moment(messagesResponse.date).format('YYYY-MM-DD');
                        messageCenterDataInfo['createdTimeInfo'] = messagesResponse.time;
                        messageCenterDataInfo['messageID'] = messagesResponse.id;
                        messageCenterDataInfo['isFetched'] = messagesResponse.is_fetched;

                        if(messagesResponse.is_fetched == 'N' && messagesResponse.userId == filterCondition.user1)
                        {
                            isNew = isNew + 1;
                        }
                    }
                })
                messageCenterDataArray.push(messageCenterDataInfo);
            }
            if(commonUserData.length > 0)
            {
                const responseData =
                {
                    'success': true,
                    'message': "Chat Records",
                    'data'   : messageCenterDataArray,
                    'newMessages' : isNew
                }
                resolve(responseData);
            } else {
                const responseData =
                {
                    'success': false,
                    'message': "Chat Records",
                    'data'   : [],
                    'newMessages' : 0
                }
                reject(responseData);
            }
        })
    })
}

// Fetch Chat Details
module.exports.fetchChatDetails = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await knex('chat_board').update(
        {
            'is_fetched':'Y',
            'is_read':'Y',
        }).where(filterCondition).then(async (data) =>{});
        await knex('chat_board')
        .select('message','date','time','id','is_fetched','userId','senderId')
        .where(filterCondition).orderBy('id','asc').then(async (messagesResponse) =>
        {
            if(messagesResponse.length > 0)
            {
                const responseData =
                {
                    'success': true,
                    'message': "Chat Details",
                    'data'   : messagesResponse
                }
                resolve(responseData);
            } else {
                const responseData =
                {
                    'success': true,
                    'message': "Chat Details",
                    'data'   : messagesResponse
                }
                reject(responseData);
            }
        })
    })
}

// Fetch Real Time Chat Details
module.exports.fetchRealTimeChatData = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await knex('chat_board')
        .select('message','date','time','id','is_fetched','userId','senderId')
        .where(filterCondition).orderBy('id','asc').then(async (messagesResponse) =>
        {
            if(messagesResponse.length > 0)
            {
                const responseData =
                {
                    'success': true,
                    'message': "Chat Details",
                    'data'   : messagesResponse
                }
                resolve(responseData);
            } else {
                const responseData =
                {
                    'success': true,
                    'message': "Chat Details",
                    'data'   : messagesResponse
                }
                reject(responseData);
            }
        })
    })
}

// Chat Data Update
module.exports.chatDataUpdate = (updateData) =>
{
    var condition = {};
        condition['userId'] = updateData.id;
    return new Promise(async (resolve, reject) =>
    {
        return knex('chat_board').update(updateData).where(condition).then((data) =>
        {
            const responseData =
            {
                'success': true,
                'message': "Data Updated Successfully",
                'data'   : []
            }
            resolve(responseData);
        });
    });
}