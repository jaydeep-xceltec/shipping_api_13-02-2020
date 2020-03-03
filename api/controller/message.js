// Message Center Management
const knex = require('knex')(require('../knexfile'))
const nodemailer = require('nodemailer');
var moment = require('moment');

// Message Center Create
module.exports.messageCenterCreate = (data) =>
{
    return new Promise((resolve, reject) =>
    {
        return knex('message_center').insert(
        {
            tradingId: data.tradingId,
            message: data.message,
            brokerId: data.brokerId,
            chartererId: data.chartererId,
            ownerId: data.ownerId,
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
                "message": "Message Center Created Successfully",
                "data" : result,
            }
            resolve(responseData)
        })
    })
}

// Message Center Records Server Side
module.exports.messageCenterRecordsServerSide = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await 
            knex('message_center AS mc')
            .select('mc.*','um.username as createdByName')
            .join('users_management AS um', 'um.id', '=', 'mc.createdBy')
            .where(filterCondition)
            .where({ 'mc.isDelete' : 'N' }).orderBy('mc.id', 'desc').then(async (data) =>
            {
                var messageCenterDataArray = [];
                for (messageCenterData of data)
                {
                    var messageCenterDataInfo =  messageCenterData;
                        messageCenterDataInfo['createdDateInfo'] = moment(messageCenterData.createdAt).format('YYYY-MM-DD');
                        messageCenterDataInfo['createdTimeInfo'] = moment(messageCenterData.createdAt).format('hh:mm A');
                    
                    messageCenterDataArray.push(messageCenterDataInfo);
                }
                const responseData =
                {
                    'success': true,
                    'message': "Message Center Records",
                    'data'   : messageCenterDataArray
                }
                resolve(responseData);
            })
    })
}

// Message Center Data Update
module.exports.messageCenterDataUpdate = (data) =>
{
    var filter = {};
    if(data.ownerId != '' && data.ownerId != null && data.ownerId != undefined) { filter['ownerId'] = data.ownerId; filter['is_owner_read'] = 'N'; }
    if(data.brokerId != '' && data.brokerId != null && data.brokerId != undefined) { filter['brokerId'] = data.brokerId; filter['is_broker_read'] = 'N'; }
    if(data.chartererId != '' && data.chartererId != null && data.chartererId != undefined) { filter['chartererId'] = data.chartererId; filter['is_broker_read'] = 'N'; }
    
    return new Promise(async (resolve, reject) =>
    {
        await knex('message_center').where(filter).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (messageCenterData) =>
        {   
            if (messageCenterData.length > 0)
            {
                for (messageCenterData of messageCenterData)
                {
                    var total_read = messageCenterData.total_read;
                        total_read = total_read + 1;
                    var updateData = {};
                        updateData['total_read'] = total_read;
                    if(data.ownerId != '' && data.ownerId != null && data.ownerId != undefined) { updateData['is_owner_read'] = 'Y'; }
                    if(data.brokerId != '' && data.brokerId != null && data.brokerId != undefined) { updateData['is_broker_read'] = 'Y'; }
                    if(data.chartererId != '' && data.chartererId != null && data.chartererId != undefined) { updateData['is_charterer_read'] = 'Y'; }
                    return knex('message_center').update(updateData).where('id', messageCenterData.id).then((data) =>{});
                }
            }
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

// Trading Progress Records Server Side
module.exports.tradingProgressRecordsServerSide = (filterCondition) =>
{
    var startDate = (filterCondition.date1 != '' && filterCondition.date1 != null && filterCondition.date1 != undefined) ? filterCondition.date1 : new Date();
    var endDate = (filterCondition.date2 != '' && filterCondition.date2 != null && filterCondition.date2 != undefined) ? filterCondition.date2 : new Date();
    console.log(startDate);
    console.log(endDate);
    var companyId = filterCondition.companyId;
    return new Promise(async (resolve, reject) =>
    {
        await 
            knex('trading_platform_management AS tpm')
            .select('tpm.*','vm.vessel_name','cm.companyName')
            .join('vessel_management AS vm', 'vm.id', '=', 'tpm.vesselId')
            .join('company_management AS cm', 'cm.id', '=', 'tpm.companyId')
            .where({'tpm.companyId' :  companyId})
            .where('tpm.cpDate', '>=', startDate)
            .where('tpm.cpDate', '<=', endDate)
            .orderBy('tpm.id', 'desc').then(async (data) =>
            {
                var messageCenterDataArray = [];
                for (messageCenterData of data)
                {
                    var messageCenterDataInfo =  {};

                        var s = messageCenterData.id+"";
                        while (s.length < 6) s = "0" + s;
                        var identifier = s;
                        if(messageCenterData.cpDate != '' && messageCenterData.cpDate != null)
                        {
                            var cpDateYear = await moment(messageCenterData.cpDate).format('YYYY');
                            var identifier = cpDateYear+'-'+identifier;

                        } else {
                            var identifier = identifier;
                        }

                        messageCenterDataInfo['progressMessages'] = [];
                        messageCenterDataInfo['identifier'] = identifier;

                        messageCenterDataInfo['vesselName'] = messageCenterData.vessel_name;
                        messageCenterDataInfo['companyName'] = messageCenterData.companyName;
                        
                        messageCenterDataInfo['cpDate'] = moment(messageCenterData.cpDate).format('YYYY-MM-DD');

                        messageCenterDataInfo['createdDateInfo'] = moment(messageCenterData.createdAt).format('YYYY-MM-DD');
                        messageCenterDataInfo['createdTimeInfo'] = moment(messageCenterData.createdAt).format('hh:mm A');


                    await knex('trading_messages').where({'tradingId' : messageCenterData.id}).where({ 'isDelete': 'N' }).orderBy('id', 'desc').then(async (progessData) =>
                    {
                        var latestArray = [];
                        var index = 0;
                        for (progessData of progessData)
                        {
                            progessData['progessDate'] = moment(progessData.createdAt).format('YYYY-MM-DD');
                            latestArray.push(progessData);
                        }
                        messageCenterDataInfo['progressMessages'] = latestArray;
                    });   
                    messageCenterDataArray.push(messageCenterDataInfo);
                }
                const responseData =
                {
                    'success': true,
                    'message': "Message Progess Records",
                    'data'   : messageCenterDataArray
                }
                resolve(responseData);
            })
    })
}