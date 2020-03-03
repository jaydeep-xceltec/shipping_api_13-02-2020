const knex = require('knex')(require('../knexfile'))
var moment = require('moment');
const nodemailer = require('nodemailer');
// Trading Platform Create
module.exports.TradingFormCreate = (data) =>
{   
    return new Promise((resolve, reject) =>
    {
        return knex('trading_platform_management').insert(
        {
            CPTypeId: data.CPTypeId,
            formId: data.formId,
            vesselId: data.vesselId,
            ownerId: data.ownerId,
            chartererId: data.chartererId,
            chartererBrokerId: data.chartererBrokerId,
            ownerBrokerId: data.ownerBrokerId,
            cpDate: data.cpDate,
            cpTime: data.cpTime,
            cpCity: data.cpCity,
            cpSubject: data.cpSubject,
            cpLiftDate: data.cpLiftDate,
            cpLiftTime: data.cpLiftTime,
            cpLiftCity: data.cpLiftCity,
            companyId: data.companyId,
            createdBy: data.createdBy,
            createdAt: new Date(),
            updatedBy: data.updatedBy,
            updatedAt: new Date(),
            isActive: "Y",
            isDelete: "N",
            broker_clauses:data.broker_clauses,		
            common_clauses:data.common_clauses
        }).then((result) =>
        {
            const responseData =
            {
                'success': true,
                "message": "Trading Form created successfully",
                "data" : result
            }
            resolve(responseData)
        })        
    })
}
// Trading Form Records
module.exports.TradingFormRecords = () =>
{
    return new Promise(async (resolve, reject) =>
    {
        await
            knex('trading_platform_management AS dcm')
                .select(
                    'dcm.*',
                    'cpt.name as charterPartyTypeName',
                    'cfm.cpformName as CharterPartyFormName',
                    'vm.vessel_name as vesselName',
                    'um.username as ownerName',
                    'umc.username as chartererName',
                    'cb.username as charterBrokerName',
                    'ob.username as ownerBrokerName'
                )
                .leftOuterJoin('charter_party_type AS cpt', 'cpt.id', '=', 'dcm.CPTypeId')
                .leftOuterJoin('cp_form_management AS cfm', 'cfm.id', '=', 'dcm.formId')
                .leftOuterJoin('vessel_management AS vm', 'vm.id', '=', 'dcm.vesselId')
                .leftOuterJoin('users_management AS um', 'um.id', '=', 'dcm.ownerId')
                .leftOuterJoin('users_management AS umc', 'umc.id', '=', 'dcm.chartererId')
                .leftOuterJoin('users_management AS cb', 'cb.id', '=', 'dcm.chartererBrokerId')
                .leftOuterJoin('users_management AS ob', 'ob.id', '=', 'dcm.ownerBrokerId')
                .where({ 'dcm.isDelete' : 'N' }).orderBy('dcm.id', 'desc').then(async (data) =>
                {
                    var arr = []
                    if (data.length > 0)
                    {   
                        for (dat of data)
                        {
                            var s = dat.id+"";
                            while (s.length < 6) s = "0" + s;
                            var identifier = s;
                            var cpDateYear = await moment(dat.cpDate).format('YYYY');
                            var identifier = cpDateYear+'-'+identifier;

                            var cpDate = await dat.cpDate;
                            var cpDate = await moment(cpDate).format('YYYY-MM-DD');
                            var cpDateInfo = await moment(cpDate).format('Do MMM YYYY');

                            dat.statusInfo = (dat.statusInfo == '') ? 'To Be Updated' : dat.statusInfo;

                            var statusInfo = (dat.status == 0) ? dat.statusInfo: 'C/P Signed';
                            var statusInfoLabel = (dat.status == 0) ? '<h4 class="warningLabel">'+dat.statusInfo+'</h4>' : '<h4 class="successLabel">C/P Signed</h4>';
                            var classInfo = (dat.status == 0) ? 'warningLabel' : 'successLabel';

                            if(dat.cpDate != '' && dat.cpDate != null)
                            {
                                var cpDateYear = await moment(dat.cpDate).format('YYYY');
                                var identifier = cpDateYear+'-'+identifier;

                                var cpDate = await dat.cpDate;
                                var cpDate = await moment(cpDate).format('YYYY-MM-DD');
                                var cpDateInfo = await moment(cpDate).format('Do MMM YYYY');

                            } else {
                                var identifier = identifier;

                                var cpDate = '';
                                var cpDate = '';
                                var cpDateInfo = '';
                            }

                            var dateobject =
                            {
                                'trade_type'         : dat.trade_type,
                                'id'         : dat.id,
                                'identifier'         : identifier,
                                'CPTypeId' : dat.CPTypeId,
                                'charterPartyTypeName' : dat.charterPartyTypeName,
                                'CharterPartyFormName' : dat.CharterPartyFormName,
                                'vesselName' : dat.vesselName,
                                'ownerName' : dat.ownerName,
                                'chartererName' : dat.chartererName,
                                'charterBrokerName' : dat.charterBrokerName,
                                'ownerBrokerName' : dat.ownerBrokerName,
                                'progress' : dat.progress,
                                'status' : dat.status,
                                'statusInfo' : statusInfo,
                                'statusInfoLabel' : statusInfoLabel,
                                'classInfo' : classInfo,
                                'formId' : dat.formId,
                                'vesselId' : dat.vesselId,
                                'ownerId' : dat.ownerId,
                                'chartererId' : dat.chartererId,
                                'chartererBrokerId' : dat.chartererBrokerId,
                                'ownerBrokerId' : dat.ownerBrokerId,
                                'cpDate' : cpDate,
                                'cpDateInfo' : cpDateInfo,
                                'cpTime' : dat.cpTime,
                                'cpCity' : dat.cpCity,
                                'cpSubject' : dat.cpSubject,
                                'cpLiftDate' : dat.cpLiftDate,
                                'cpLiftTime' : dat.cpLiftTime,
                                'cpLiftCity' : dat.cpLiftCity,
                                'companyId' : dat.companyId,
                                'createdAt'  : dat.createdAt,
                                'createdBy'  : dat.createdBy,
                                'updatedAt'  : dat.updatedAt,
                                'updatedBy'  : dat.updatedBy,
                                'isActive'   : dat.isActive,
                                'isDelete'  : dat.isDelete,
                                'broker_clauses':dat.broker_clauses,		
                                'owner_clauses':dat.owner_clauses,		
                                'charterer_clauses':dat.charterer_clauses,		
                                'common_clauses':dat.common_clauses,
                                'std_bid_name':dat.std_bid_name,
                                'is_std_bid':dat.is_std_bid,
                            }
                            arr.push(dateobject)
                        }
                        const responseData =
                        {
                            'success': true,
                            'message': "Trading Platform List",
                            'data'   : arr
                        }
                        resolve(responseData);
                    } else {
                        const responseData =
                        {
                            'success': false,
                            'message': "Data not found"
                        }
                        resolve(responseData);
                    }
                })
    })
}
// Trading Records Server Side
module.exports.TradingFormRecordsServerSide = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await
            knex('trading_platform_management AS dcm')
                .select(
                    'dcm.*',
                    'cfm.cpformName as CharterPartyFormName',
                    'vm.vessel_name as vesselName',
                    'um.username as ownerName',
                    'umc.username as chartererName',
                    'cm.cityName as cityName',
                    'cb.username as brokerName'
                )
                .leftOuterJoin('cp_form_management AS cfm', 'cfm.id', '=', 'dcm.formId','LEFT')
                .leftOuterJoin('vessel_management AS vm', 'vm.id', '=', 'dcm.vesselId','LEFT')
                .leftOuterJoin('users_management AS um', 'um.id', '=', 'dcm.ownerId','LEFT')
                .leftOuterJoin('users_management AS umc', 'umc.id', '=', 'dcm.chartererId','LEFT')
                .leftOuterJoin('users_management AS cb', 'cb.id', '=', 'dcm.brokerId','LEFT')
                .leftOuterJoin('city_management AS cm', 'cm.id', '=', 'dcm.cpCity','LEFT')
                .where(filterCondition)
                .where({ 'dcm.isDelete' : 'N' }).orderBy('dcm.id', 'desc').then(async (data) =>
                {
                    var arr = []
                    if (data.length > 0)
                    {
                        for (dat of data)
                        {
                            var s = dat.id+"";
                            while (s.length < 6) s = "0" + s;
                            var identifier = s;
                            
                            if(dat.cpDate != '' && dat.cpDate != null)
                            {
                                var cpDateYear = await moment(dat.cpDate).format('YYYY');
                                var identifier = cpDateYear+'-'+identifier;

                                var cpDate = await dat.cpDate;
                                var cpDate = await moment(cpDate).format('YYYY-MM-DD');
                                var cpDateInfo = await moment(cpDate).format('Do MMM YYYY');

                            } else {
                                var identifier = identifier;

                                var cpDate = '';
                                var cpDate = '';
                                var cpDateInfo = '';
                            }
                            
                            var isOwnerAccepted = 'P';
                            if(dat.ownerId != '' && dat.ownerId != null && dat.ownerId != undefined)
                            {
                                await 
                                knex('trading_status')
                                .where({ 'tradingId' : dat.id })
                                .where({ 'ownerId' : dat.ownerId })
                                .limit(1)
                                .orderBy('id', 'desc').then(async (tradingStatusData) =>
                                {
                                    if (tradingStatusData.length > 0)
                                    {
                                        for (tradingStatusData of tradingStatusData)
                                        {
                                            isOwnerAccepted = tradingStatusData.isAccepted;
                                        }
                                    } else {
                                        isOwnerAccepted = 'Y';
                                    }
                                });
                            }
                            
                            var isChartererAccepted = 'P';
                            if(dat.chartererId != '' && dat.chartererId != null && dat.chartererId != undefined)
                            {
                                console.log('HERE');
                                await 
                                    knex('trading_status')
                                    .where({ 'tradingId' : dat.id })
                                    .where({ 'chartererId' : dat.chartererId })
                                    .limit(1)
                                    .orderBy('id', 'desc').then(async (tradingStatusData) =>
                                    {
                                        if (tradingStatusData.length > 0)
                                        {
                                            for (tradingStatusData of tradingStatusData)
                                            {
                                                isChartererAccepted = tradingStatusData.isAccepted;
                                            }
                                        }
                                    });
                            }

                                dat.statusInfo = (dat.statusInfo == '') ? 'To Be Updated' : dat.statusInfo;

                                var tradingStatusInfo = 'Broker Intiated Trade';

                                await 
                                    knex('trading_messages')
                                    .where({ 'tradingId' : dat.id })
                                    .limit(1)
                                    .orderBy('id', 'desc').then(async (tradingMessageData) =>
                                    {
                                        if (tradingMessageData.length > 0)
                                        {
                                            for (tradingMessageData of tradingMessageData)
                                            {
                                                tradingStatusInfo = tradingMessageData.message;
                                            }
                                        }
                                    });

                                var tradeType = 'TRADE';

                                await knex('trading_status').where({ 'tradingId' : dat.id }).limit(1).orderBy('id', 'asc').then(async (tradingStatusData) =>
                                    {
                                        if (tradingStatusData.length > 0)
                                        {
                                            for (tradingStatusData of tradingStatusData)
                                            {
                                                tradeType = (tradingStatusData.chartererId == null) ? 'OFFER' : 'BID';
                                            }
                                        }
                                    });

                            var isMainTermDone = (dat.is_owner_main_term_sign_off == '1' && dat.is_charterer_main_term_sign_off == '1') ? '1' : '2';
                            var isDetailTermDone = (dat.is_owner_detail_term_sign_off == '1' && dat.is_charterer_detail_term_sign_off == '1') ? '1' : '2';

                            var statusInfo = (dat.status == 0) ? dat.statusInfo: 'C/P Signed';
                            var statusInfoLabel = '<h4 class="warningLabel">'+tradingStatusInfo+'</h4>';
                            var classInfo = (dat.status == 0) ? 'warningLabel' : 'successLabel';
                            var dateobject =
                            {
                                'trade_type': dat.trade_type,
                                'tradeType': tradeType,
                                'isMainTermDone': isMainTermDone,
                                'isDetailTermDone': isDetailTermDone,
                                'isOwnerAccepted': isOwnerAccepted,
                                'isChartererAccepted': isChartererAccepted,

                                'cityName': dat.cityName,

                                'is_broker_approval' : dat.is_broker_approval,
                                'common_clauses_broker' : dat.common_clauses_broker,
                                'custom_term_clause_broker' : dat.custom_term_clause_broker,
                                'custom_common_clause_broker' : dat.custom_common_clause_broker,

                                'id'         : dat.id,
                                'identifier'         : identifier,
                                'CPTypeId' : dat.CPTypeId,
                                'charterPartyTypeName' : dat.charterPartyTypeName,
                                'CharterPartyFormName' : dat.CharterPartyFormName,
                                'vesselName' : dat.vesselName,
                                'ownerName' : dat.ownerName,
                                'chartererName' : dat.chartererName,
                                'brokerName' : dat.brokerName,
                                'progress' : dat.progress,
                                'status' : dat.status,
                                'statusInfo' : tradingStatusInfo,
                                'statusInfoLabel' : statusInfoLabel,
                                'classInfo' : classInfo,
                                'formId' : dat.formId,
                                'vesselId' : dat.vesselId,
                                'ownerId' : dat.ownerId,
                                'chartererId' : dat.chartererId,
                                'brokerId' : dat.brokerId,
                                'chartererBrokerId' : dat.chartererBrokerId,
                                'ownerBrokerId' : dat.ownerBrokerId,
                                'cpDate' : cpDate,
                                'cpDateInfo' : cpDateInfo,
                                'cpTime' : dat.cpTime,
                                'cpCity' : dat.cpCity,
                                'cpSubject' : dat.cpSubject,
                                'cpLiftDate' : dat.cpLiftDate,
                                'cpLiftTime' : dat.cpLiftTime,
                                'cpLiftCity' : dat.cpLiftCity,
                                'companyId' : dat.companyId,
                                'createdAt'  : dat.createdAt,
                                'createdBy'  : dat.createdBy,
                                'updatedAt'  : dat.updatedAt,
                                'updatedBy'  : dat.updatedBy,
                                'isActive'   : dat.isActive,
                                'isDelete'  : dat.isDelete,
                                'broker_clauses':dat.broker_clauses,		
                                'owner_clauses':dat.owner_clauses,		
                                'charterer_clauses':dat.charterer_clauses,		
                                'common_clauses':dat.common_clauses,
                                'drawStatusId' : dat.drawStatusId,
                                'std_bid_name':dat.std_bid_name,
                                'is_std_bid':dat.is_std_bid,
                                "Cancel_trade":dat.Cancel_trade
                                
                            }
                            arr.push(dateobject)
                        }
                        const responseData =
                        {
                            'success': true,
                            'message': "Trading Platforms list",
                            'data'   : arr
                        }
                        resolve(responseData);
                    } else {
                        const responseData =
                        {
                            'success': false,
                            'message': "Data not found"
                        }
                        resolve(responseData);
                    }
                })
    })
}
// Get Trading Data
module.exports.TradingData = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await
            knex('trading_platform_management AS dcm')
                .select(
                    'dcm.*',
                    // 'ds.isAccepted','ds.id as drawStatusId'
                )
                .where(filterCondition)
                .where({ 'dcm.isDelete' : 'N' }).orderBy('dcm.id', 'desc').then(async (data) =>
                {
                        const responseData =
                        {
                            'success': true,
                            'message': "Trading Data",
                            'data'   : data
                        }
                        resolve(responseData);
                })
    })
}
// Trading Platforms Data Update
module.exports.TradingFormUpdate = (data) =>
{
    var id = data.id;
    return new Promise((resolve, reject) =>
    {
        return knex('trading_platform_management').update(
        {
            CPTypeId: data.CPTypeId,
            formId: data.formId,
            vesselId: data.vesselId,
            ownerId: data.ownerId,
            chartererId: data.chartererId,
            chartererBrokerId: data.chartererBrokerId,
            ownerBrokerId: data.ownerBrokerId,
            cpDate: data.cpDate,
            cpTime: data.cpTime,
            cpCity: data.cpCity,
            cpSubject: data.cpSubject,
            cpLiftDate: data.cpLiftDate,
            cpLiftTime: data.cpLiftTime,
            cpLiftCity: data.cpLiftCity,
            companyId: data.companyId,
            createdAt: data.createdAt,
            createdBy: data.createdBy,
            updatedAt: data.updatedAt,
            updatedBy: data.updatedBy,
            isDelete: data.isDelete,
            isActive: data.isActive,
            'broker_clauses':dat.broker_clauses,		
            'owner_clauses':dat.owner_clauses,		
            'charterer_clauses':dat.charterer_clauses,		
            'common_clauses':dat.common_clauses,
        }).where('id', id).then((data) =>
        {
            if (data)
            {
                const responseData =
                {
                    'success': true,
                    'message': "Data successfully updated",
                    'body': data
                }
                resolve(responseData);
            }
        })
    })
}
// Trading Platform Data Remove
module.exports.TradingPlatformDataRemove = (data) =>
{
    var id = data.id;
    return new Promise((resolve, reject) =>
    {
        return knex('trading_platform_management').update({ isDelete: 'Y' }).where('id', id).then(async (data) =>
        {
            if (data)
            {
                await knex('trading_platform_management').update({ isDelete: 'Y' }).where({ id: id }).then((rdata) =>
                {
                    if (rdata)
                    {
                        const responseData =
                        {
                            'success': true,
                            'message': "Trading Platform Removed Successfully"
                        }
                        resolve(responseData);
                    } else {
                        const responseData =
                        {
                            'success': true,
                            'message': "Trading Platform Removed Successfully"
                        }
                        resolve(responseData);
                    }
                })
            } else {
                const responseData =
                {
                    'success': false,
                    'message': "Id not found"
                }
                resolve(responseData);
            }
        })
    })
}
// Trading Platform Accept Reject
module.exports.TradingPlatformAcceptReject = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await 
            knex('trading_status').where(filterCondition).where({ 'isDelete' : 'N' }).orderBy('id', 'desc').then(async (data) =>
            {
                var arr = []
                if (data.length > 0)
                {
                    for (dat of data)
                    {
                        var dateobject =
                        {
                            'id'         : dat.id,
                            'tradingId' : dat.tradingId,
                            'chartererId' : dat.chartererId,
                            'isAccepted' : dat.isAccepted,
                            'createdAt'  : dat.createdAt,
                            'createdBy'  : dat.createdBy,
                            'updatedAt'  : dat.updatedAt,
                            'updatedBy'  : dat.updatedBy,
                            'isActive'   : dat.isActive,
                            'isDelete'  : dat.isDelete,
                        }
                        arr.push(dateobject)
                    }
                    const responseData =
                    {
                        'success': true,
                        'message': "Draw Form list",
                        'data'   : arr
                    }
                    resolve(responseData);
                } else {
                    const responseData =
                    {
                        'success': false,
                        'message': "Data not found"
                    }
                    resolve(responseData);
                }
            })
    })
}
// Trading Request To Charterer Create
module.exports.TradingPlatformRequestToChartererCreate = (insertData) =>
{   
    return new Promise((resolve, reject) =>
    {
        knex('trading_status')
        .where('tradingId' ,'=', insertData.tradingId)
        .where('chartererId' ,'=', insertData.chartererId)
        .then(async (data) =>
        {
            if (data.length > 0)
            {
                const responseData =
                {
                    'success': false,
                    'message': "Record Already Exist"
                }
                resolve(responseData);
            } else {
                return knex('trading_status').insert(
                {
                    tradingId: insertData.tradingId,
                    chartererId: insertData.chartererId,
                    createdBy: insertData.createdBy,
                    createdAt: new Date(),
                    updatedBy: insertData.updatedBy,
                    updatedAt: new Date(),
                    isActive: "Y",
                    isDelete: "N",
                }).then((result) =>
                {
                    const responseData =
                    {
                        'success': true,
                        "message": "Trading Request Created Successfully"
                    }
                    resolve(responseData)
                })
            }
        });
    })
}
// Trading Platform Request Accept Reject Status Update
module.exports.TradingPlatformRequestStatusUpdate = (data) =>
{
    var id = data.id;
    return new Promise((resolve, reject) =>
    {
        return knex('trading_status').update(
        {
            'isAccepted'  :   data.isAccepted,
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


// Trading Platform Request Accept Reject Status Update For Common
module.exports.TradingPlatformRequestStatusUpdateCommon = (data) =>
{
    var tradingId = data.tradingId;
    var ownerId = data.ownerId;
    var chartererId = data.chartererId;
    var isAccepted = data.isAccepted;
    var updatedBy = data.updatedBy;



    if(ownerId != '' && ownerId != null && ownerId != undefined)
    {
        return new Promise((resolve, reject) =>
        {
            return knex('trading_status').update(
            {
                'isAccepted'  :   isAccepted,
                'updatedBy' :   updatedBy,
                'updatedAt' :   new Date()
            }).where('tradingId', tradingId).where('ownerId', ownerId).then((data) =>
            {
                console.log(data);
                const responseData =
                {
                    'success': true,
                    'message': "Status Updated Successfully",
                    'body':data
                }
                resolve(responseData);
            })
        })
    }
    
    if(chartererId != '' && chartererId != null && chartererId != undefined)
    {
        return new Promise((resolve, reject) =>
        {
            return knex('trading_status').update(
            {
                'isAccepted'  :   isAccepted,
                'updatedBy' :   updatedBy,
                'updatedAt' :   new Date()
            }).where('tradingId', tradingId).where('chartererId', chartererId).then((data) =>
            {
                const responseData =
                {
                    'success': true,
                    'message': "Status Updated Successfully",
                    'body':data
                }
                resolve(responseData);
            })
        })
    }
}

// Trading Platform Request For Charterer
module.exports.TradingPlatformRecordsServerSideCharterer = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await
            knex('trading_platform_management AS dcm')
            .select('dcm.*',
                    'cfm.cpformName as CharterPartyFormName', 'vm.vessel_name as vesselName'
                    , 'um.username as ownerName', 'umc.username as chartererName', 'cb.username as charterBrokerName'
                    , 'ob.username as ownerBrokerName'
            )
            .leftOuterJoin('cp_form_management AS cfm', 'cfm.id', '=', 'dcm.formId')
            .leftOuterJoin('vessel_management AS vm', 'vm.id', '=', 'dcm.vesselId')
            .leftOuterJoin('users_management AS um', 'um.id', '=', 'dcm.ownerId')
            .leftOuterJoin('users_management AS umc', 'umc.id', '=', 'dcm.chartererId')
            .leftOuterJoin('users_management AS cb', 'cb.id', '=', 'dcm.chartererBrokerId')
            .leftOuterJoin('users_management AS ob', 'ob.id', '=', 'dcm.ownerBrokerId')
            // .leftOuterJoin('trading_status AS ds', 'ds.tradingId', '=', 'dcm.id')
            .where(filterCondition)
            .where({ 'dcm.isDelete' : 'N' }).orderBy('dcm.id', 'desc').then(async (data) =>
            {
                var arr = [];
                if (data.length > 0)
                {   
                    for (dat of data)
                    {
                        var s = dat.id+"";
                        while (s.length < 6) s = "0" + s;
                        var identifier = s;
                        var cpDateYear = await moment(dat.cpDate).format('YYYY');
                        // var identifier = cpDateYear+'-'+identifier;

                        var cpDate = await dat.cpDate;
                        var cpDate = await moment(cpDate).format('YYYY-MM-DD');
                        var cpDateInfo = await moment(cpDate).format('Do MMM YYYY');

                        dat.statusInfo = (dat.statusInfo == '') ? 'To Be Updated' : dat.statusInfo;

                        var statusInfo = (dat.status == 0) ? dat.statusInfo: 'C/P Signed';
                        var statusInfoLabel = (dat.status == 0) ? '<h4 class="warningLabel">'+dat.statusInfo+'</h4>' : '<h4 class="successLabel">C/P Signed</h4>';
                        var classInfo = (dat.status == 0) ? 'warningLabel' : 'successLabel';
                       
                        if(dat.cpDate != '' && dat.cpDate != null)
                        {
                            var cpDateYear = await moment(dat.cpDate).format('YYYY');
                            var identifier = cpDateYear+'-'+identifier;

                            var cpDate = await dat.cpDate;
                            var cpDate = await moment(cpDate).format('YYYY-MM-DD');
                            var cpDateInfo = await moment(cpDate).format('Do MMM YYYY');

                        } else {
                            var identifier = identifier;

                            var cpDate = '';
                            var cpDate = '';
                            var cpDateInfo = '';
                        }
                        

                        var dateobject =
                        {
                            'trade_type'         : dat.trade_type,
                            'id'         : dat.id,
                            'identifier' : identifier,
                            'CPTypeId' : dat.CPTypeId,
                            'charterPartyTypeName' : dat.charterPartyTypeName,
                            'CharterPartyFormName' : dat.CharterPartyFormName,
                            'vesselName' : dat.vesselName,
                            'ownerName' : dat.ownerName,
                            'chartererName' : dat.chartererName,
                            'charterBrokerName' : dat.charterBrokerName,
                            'ownerBrokerName' : dat.ownerBrokerName,
                            'progress' : dat.progress,
                            'status' : dat.status,
                            'statusInfo' : statusInfo,
                            'statusInfoLabel' : statusInfoLabel,
                            'classInfo' : classInfo,
                            'formId' : dat.formId,
                            'vesselId' : dat.vesselId,
                            'ownerId' : dat.ownerId,
                            'chartererId' : dat.chartererId,
                            'chartererBrokerId' : dat.chartererBrokerId,
                            'ownerBrokerId' : dat.ownerBrokerId,
                            'cpDate' : cpDate,
                            'cpDateInfo' : cpDateInfo,
                            'cpTime' : dat.cpTime,
                            'cpCity' : dat.cpCity,
                            'cpSubject' : dat.cpSubject,
                            'cpLiftDate' : dat.cpLiftDate,
                            'cpLiftTime' : dat.cpLiftTime,
                            'cpLiftCity' : dat.cpLiftCity,
                            'companyId' : dat.companyId,
                            'drawStatusId' : dat.drawStatusId,
                            'createdAt'  : dat.createdAt,
                            'createdBy'  : dat.createdBy,
                            'updatedAt'  : dat.updatedAt,
                            'updatedBy'  : dat.updatedBy,
                            'isActive'   : dat.isActive,
                            'isDelete'  : dat.isDelete,
                            'broker_clauses':dat.broker_clauses,		
                            'owner_clauses':dat.owner_clauses,		
                            'charterer_clauses':dat.charterer_clauses,		
                            'common_clauses':dat.common_clauses,
                            'std_bid_name':dat.std_bid_name,
                            'is_std_bid':dat.is_std_bid,
                        }
                        arr.push(dateobject)
                    }
                    const responseData =
                    {
                        'success': true,
                        'message': "Draw Form list",
                        'data'   : arr
                    }
                    resolve(responseData);
                } else {
                    const responseData =
                    {
                        'success': false,
                        'message': "Data not found"
                    }
                    resolve(responseData);
                }
            })
    })
}
// Trading Counter Insert
module.exports.TradingCounterInsert = (insertData) =>
{   
    return new Promise((resolve, reject) =>
    {
        return knex('trading_counter').insert(
        {
            tradingId: insertData.tradingId,
            userId: insertData.userId,
            createdBy: insertData.createdBy,
            createdAt: new Date(),
            updatedBy: insertData.updatedBy,
            updatedAt: new Date(),
            isActive: "Y",
            isDelete: "N",
        }).then((result) =>
        {
            const responseData =
            {
                'success': true,
                "message": "Trading Counter Request Created Successfully"
            }
            resolve(responseData)
        })
    })
}
// Get Counter Number
module.exports.getCounterNumber = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await 
            knex('trading_counter').where(filterCondition).where({ 'isDelete' : 'N' }).orderBy('id', 'desc').then(async (data) =>
            {
                var arr = {};
                var counterNumber = data.length + 1;
                arr['counterNumber'] = counterNumber;
                console.log(arr);
                const responseData =
                {
                    'success': true,
                    'message': "Counter Number",
                    'data'   : arr,
                    'counterNumber'   : counterNumber
                }
                resolve(responseData);
            })
    })
}

// Trading Standard Bid Create
module.exports.TradingStandardFormCreate = (data) =>
{   
    return new Promise((resolve, reject) =>
    {
        return knex('trading_platform_management').insert(
        {
            CPTypeId: data.CPTypeId,
            trade_type: data.trade_type,
            formId: data.formId,
            vesselId: data.vesselId,
            brokerId: data.brokerId,
            ownerId: data.ownerId,
            chartererId: data.chartererId,
            chartererBrokerId: data.chartererBrokerId,
            ownerBrokerId: data.ownerBrokerId,
            cpDate: data.cpDate,
            cpTime: data.cpTime,
            cpCity: data.cpCity,
            cpSubject: data.cpSubject,
            cpLiftDate: data.cpLiftDate,
            cpLiftTime: data.cpLiftTime,
            cpLiftCity: data.cpLiftCity,
            companyId: data.companyId,
            createdBy: data.createdBy,
            createdAt: new Date(),
            updatedBy: data.updatedBy,
            updatedAt: new Date(),
            isActive: "Y",
            isDelete: "N",
            is_std_bid: "Y",
            std_bid_name : data.std_bid_name,
            invited_owners : data.invited_owners,
            broker_clauses:data.broker_clauses,		
            common_clauses:data.common_clauses,
        }).then((result) =>
        {
            const responseData =
            {
                'success': true,
                "message": "Trading Standard Bid Created Successfully",
                "data" : result
            }
            resolve(responseData)
        })        
    })
}

// Trading Email And Notification Send
module.exports.tradingEmailIDAndNotificationSend = (data) =>
{   
    return new Promise((resolve, reject) =>
    {
        knex('draw_notification').insert(
        {
            fromUserId: data.fromUserId,
            toUserId: data.toUserId,
            notification: data.notification,
            createdBy: data.createdBy,
            createdAt: new Date(),
            updatedBy: data.updatedBy,
            updatedAt: new Date(),
            isActive: "Y",
            isDelete: "N"
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
                to: data.email,
                subject: 'Trading Standard Bid Notification  ',
                text: data.notification
            };
            
            transporter.sendMail(mailOptions, function(error, info){});

            return knex('trading_status').insert(
            {
                tradingId: data.tradingId,
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
                    "message": "Trading Notification Sent Successfully",
                    "data" : result
                }
                resolve(responseData)
            })
        })
    })
}

// Get Company Name
module.exports.getCompanyName = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await knex('company_management').where(filterCondition).where({ 'isDelete' : 'N' }).orderBy('id', 'desc').then(async (data) =>
        {
            const responseData =
            {
                'success': true,
                'message': "Company Info",
                'data'   : data
            }
            resolve(responseData);
        })
    })
}

// Fetch Trading Data
module.exports.fetchTradingDataInfo = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await knex('trading_platform_management').where(filterCondition).where({ 'isDelete' : 'N' }).orderBy('id', 'desc').then(async (data) =>
        {  
            const responseData =
            {
                'success': true,
                'message': "Trading Data",
                'data'   : data
            }
            resolve(responseData);
        })
    })
}

// Fetch Trading Status Info
module.exports.fetchTradingStatusInfo = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await knex('trading_status').where(filterCondition).where({ 'isDelete' : 'N' }).orderBy('id', 'desc').then(async (data) =>
        {  
            const responseData =
            {
                'success': true,
                'message': "Trading Status Info",
                'data'   : data
            }
            resolve(responseData);
        })
    })
}

// Fetch Std Bid Ready For Preamble
module.exports.fetchTradingStdBidReady = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        var isOwnerAccepted = 'P';
        var isChartererAccepted = 'P';

        var newFilterCondition = {};
            newFilterCondition['tradingId'] = filterCondition.tradingId;
            newFilterCondition['ownerId'] = filterCondition.ownerId;

        var newFilterConditionCharterer = {};
            newFilterConditionCharterer['tradingId'] = filterCondition.tradingId;
            newFilterConditionCharterer['chartererId'] = filterCondition.chartererId;

        await knex('trading_status').where(newFilterCondition).where({ 'isDelete' : 'N' }).orderBy('id', 'desc').then(async (data) =>
        {  
            if(data.length > 0)
            {
                isOwnerAccepted = data[0].isAccepted;
            }

            await knex('trading_status').where(newFilterConditionCharterer).where({ 'isDelete' : 'N' }).orderBy('id', 'desc').then(async (data) =>
            {
                if(data.length > 0)
                {
                    isChartererAccepted = data[0].isAccepted;
                }
                var finalResponse = {};
                    finalResponse['isOwnerAccepted'] = isOwnerAccepted;
                    finalResponse['isChartererAccepted'] = isChartererAccepted;
                const responseData =
                {
                    'success': true,
                    'message': "Trading Status Info",
                    'data'   : finalResponse
                }
                resolve(responseData);
            })
        })
    })
}

// Standard Bid Form Data Update
module.exports.StandardBidFormDataUpdate = (data) =>
{
    var id = data.tradingId;
    return new Promise((resolve, reject) =>
    {
        return knex('trading_platform_management').update(
        {
            
            cpTime:data.cpTime,
            cpDate:data.cpDate,
            cpCity:data.cpCity,

            preamble_description:data.preamble_description,
            heading_msg:data.heading_msg,
            metricTonValue:data.metricTonValue,
            customInput1:data.customInput1,
            customInput2:data.customInput2,

            fixture_subject:data.fixture_subject,
            cp_form_description:data.cp_form_description,
            lifted_by:data.lifted_by,
            lifted_time:data.lifted_time,
            lifted_date:data.lifted_date,
            lifted_city:data.lifted_city,
            lifted_charter_party_place:data.lifted_charter_party_place,
            lifted_charter_fully_style:data.lifted_charter_fully_style,
            lifted_charter_domicile:data.lifted_charter_domicile,
            lifted_owner_fully_style:data.lifted_owner_fully_style,
            lifted_owner_domicile:data.lifted_owner_domicile,
            lifted_owner_type:data.lifted_owner_type,
            lifted_vessel_name:data.lifted_vessel_name,
            lifted_vessel_imo:data.lifted_vessel_imo,
            lifted_vessel_flag:data.lifted_vessel_flag,
            lifted_vessel_year_built:data.lifted_vessel_year_built,
            lifted_vessel_dwat_metric_tons:data.lifted_vessel_dwat_metric_tons,
            lifted_vessel_draft_on_marks:data.lifted_vessel_draft_on_marks,
            lifted_vessel_loa:data.lifted_vessel_loa,
            lifted_vessel_beam:data.lifted_vessel_beam,
            lifted_vessel_holds:data.lifted_vessel_holds,
            lifted_vessel_hatches:data.lifted_vessel_hatches,
            lifted_vessel_gear:data.lifted_vessel_gear,
            lifted_vessel_swl:data.lifted_vessel_swl,

            companyId: data.companyId,
            updatedBy: data.updatedBy,
            updatedAt: new Date()

        }).where('id', id).then((data) =>
        {
            if (data)
            {
                const responseData =
                {
                    'success': true,
                    'message': "Data successfully updated",
                    'body': data
                }
                resolve(responseData);
            }
        })
    })
}

// Trading Notification Insert
module.exports.tradingNotificationInsert = (data) =>
{   
    return new Promise((resolve, reject) =>
    {
        return knex('draw_notification').insert(
        {
            fromUserId: data.fromUserId,
            toUserId: data.toUserId,
            notification: data.notification,
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
                "message": "Trading Notification Created Successfully",
                "data" : result
            }
            resolve(responseData)
        })        
    })
}

// Trading Message Insert
module.exports.tradingMessageInsert = (data) =>
{   
    return new Promise((resolve, reject) =>
    {
        return knex('trading_messages').insert(
        {
            tradingId: data.tradingId,
            message	: data.message,
            time: moment().format('HH:mm A'),
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
                "message": "Trading Message Created Successfully",
                "data" : result
            }
            resolve(responseData)
        })        
    })
}

// Trading Progress Insert
module.exports.tradingProgressInsert = (data) =>
{   
    return new Promise((resolve, reject) =>
    {
        return knex('trading_progress').insert(
        {
            tradingId: data.tradingId,
            ownerId: data.ownerId,
            chartererId: data.chartererId,
            brokerId: data.brokerId,
            message	: data.message,
            time: moment().format('HH:mm A'),
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
                "message": "Trading Progress Created Successfully",
                "data" : result
            }
            resolve(responseData)
        })        
    })
}

// Trading Data Update
module.exports.tradingDataUpdateCommon = (updateData) =>
{

    console.log("data check",updateData);
    
    return new Promise((resolve, reject) =>
    {
        return knex('trading_platform_management').update(updateData).where('id', updateData.id).then((data) =>
        {
            const responseData =
            {
                'success': true,
                'message': "Data Updated Successfully",
                'body':data
            }
            resolve(responseData);
        })
    })
}

// Copy Trading Data
module.exports.copyTradingData = (updateData) =>
{   
    var copyID = updateData.copyID;
    console.log(updateData);
    
    var tradingId = updateData.tradingId;
    var updatedBy = updateData.updatedBy;
    return new Promise(async (resolve, reject) =>
    {
        await knex('trading_platform_management').where({'id': tradingId}).where({ 'isDelete' : 'N' }).orderBy('id', 'desc').then(async (copyData) =>
        {  
            var copyData = copyData[0];
// console.log(copyData);

            var copyUpdateData = {};
                copyUpdateData['CPTypeId'] = copyData.CPTypeId;
                copyUpdateData['formId'] = copyData.formId;
                copyUpdateData['cpDate'] = copyData.cpDate;
                copyUpdateData['cpTime'] = copyData.cpTime;
                copyUpdateData['cpCity'] = copyData.cpCity;
                copyUpdateData['cpSubject'] = copyData.cpSubject;
                copyUpdateData['cpLiftDate'] = copyData.cpLiftDate;
                copyUpdateData['cpLiftTime'] = copyData.cpLiftTime;
                copyUpdateData['cpLiftCity'] = copyData.cpLiftCity;
                copyUpdateData['updatedBy'] = copyData.updatedBy;
                copyUpdateData['updatedAt'] = new Date();
                
                copyUpdateData['vesselId'] = copyData.vesselId;
                copyUpdateData['brokerId'] = copyData.brokerId;
                copyUpdateData['ownerId'] = copyData.ownerId;
                copyUpdateData['chartererId'] = copyData.chartererId;
                
                copyUpdateData['ownerBrokerId'] = copyData.ownerBrokerId;
                copyUpdateData['chartererBrokerId'] = copyData.chartererBrokerId;
                
                copyUpdateData['broker_clauses'] = copyData.broker_clauses;
                copyUpdateData['owner_clauses'] = copyData.owner_clauses;
                copyUpdateData['companyId'] = copyData.companyId;
                copyUpdateData['main_term_clauses'] = copyData.main_term_clauses;
                copyUpdateData['charterer_clauses'] = copyData.charterer_clauses;
                copyUpdateData['common_clauses'] = copyData.common_clauses;
                copyUpdateData['custom_term_clause'] = copyData.custom_term_clause;
                copyUpdateData['custom_common_clause'] = copyData.custom_common_clause;
                copyUpdateData['checked_clauses'] = copyData.checked_clauses;
                copyUpdateData['metricTonValue'] = copyData.metricTonValue;
                copyUpdateData['preamble_description'] = copyData.preamble_description;
                copyUpdateData['heading_msg'] = copyData.heading_msg;
                copyUpdateData['customInput1'] = copyData.customInput1;
                copyUpdateData['customInput2'] = copyData.customInput2;
                copyUpdateData['is_std_bid'] = copyData.is_std_bid;
                copyUpdateData['invited_owners'] = copyData.invited_owners;
                copyUpdateData['fixture_subject'] = copyData.fixture_subject;
                copyUpdateData['lifted_by'] = copyData.lifted_by;
                copyUpdateData['lifted_time'] = copyData.lifted_time;
                copyUpdateData['lifted_date'] = copyData.lifted_date;
                copyUpdateData['lifted_city'] = copyData.lifted_city;
                copyUpdateData['lifted_charter_party_place'] = copyData.lifted_charter_party_place;
                copyUpdateData['lifted_charter_fully_style'] = copyData.lifted_charter_fully_style;
                copyUpdateData['lifted_charter_domicile'] = copyData.lifted_charter_domicile;
                copyUpdateData['lifted_owner_fully_style'] = copyData.lifted_owner_fully_style;
                copyUpdateData['lifted_owner_domicile'] = copyData.lifted_owner_domicile;
                copyUpdateData['lifted_owner_type'] = copyData.lifted_owner_type;
                copyUpdateData['lifted_vessel_name'] = copyData.lifted_vessel_name;
                copyUpdateData['lifted_vessel_imo'] = copyData.lifted_vessel_imo;
                copyUpdateData['lifted_vessel_flag'] = copyData.lifted_vessel_flag;
                copyUpdateData['lifted_vessel_year_built'] = copyData.lifted_vessel_year_built;
                copyUpdateData['lifted_vessel_dwat_metric_tons'] = copyData.lifted_vessel_dwat_metric_tons;
                copyUpdateData['lifted_vessel_draft_on_marks'] = copyData.lifted_vessel_draft_on_marks;
                copyUpdateData['lifted_vessel_loa'] = copyData.lifted_vessel_loa;
                copyUpdateData['lifted_vessel_beam'] = copyData.lifted_vessel_beam;
                copyUpdateData['lifted_vessel_holds'] = copyData.lifted_vessel_holds;
                copyUpdateData['lifted_vessel_hatches'] = copyData.lifted_vessel_hatches;
                copyUpdateData['lifted_vessel_gear'] = copyData.lifted_vessel_gear;
                copyUpdateData['lifted_vessel_swl'] = copyData.lifted_vessel_swl;
                copyUpdateData['createdBy'] = copyData.createdBy;
                copyUpdateData['createdAt'] = new Date(),
                copyUpdateData['updatedBy'] = copyData.updatedBy;
                copyUpdateData['updatedAt'] =new Date(),
               
                knex('trading_platform_management').insert(copyUpdateData).then((data) =>{

                    console.log(data);
                    
                })
        })

        await knex('terms_update').where({'tradingId': copyID}).where({ 'isDelete' : 'N' }).orderBy('id', 'desc').then(async (copyData) =>
        {  
            if(copyData.length > 0)
            {
                for (insertData of copyData)
                {
                    insertData['id'] = undefined;
                    insertData['tradingId'] = tradingId;
                    await knex('terms_update').insert(insertData).then(async(data) =>{})
                }
            }
        })

        await knex('trading_progress').where({'tradingId': copyID}).where({ 'isDelete' : 'N' }).orderBy('id', 'desc').then(async (copyData) =>
        {  
            if(copyData.length > 0)
            {
                for (insertData of copyData)
                {
                    insertData['id'] = undefined;
                    insertData['tradingId'] = tradingId;
                    await knex('trading_progress').insert(insertData).then(async(data) =>{})
                }
            }
        })

        await knex('trading_messages').where({'tradingId': copyID}).where({ 'isDelete' : 'N' }).orderBy('id', 'desc').then(async (copyData) =>
        {  
            if(copyData.length > 0)
            {
                for (insertData of copyData)
                {
                    insertData['id'] = undefined;
                    insertData['tradingId'] = tradingId;
                    await knex('trading_messages').insert(insertData).then(async (data) =>{})
                }
            }
        })

        const responseData =
        {
            'success': true,
            'message': "Data Updated Successfully",
            'body':updateData
        }
        resolve(responseData);
    })
}

// Charterer Invite Owner For Trade
module.exports.chartererInviteOwnerForTrade = (data) =>
{   
    return new Promise(async (resolve, reject) =>
    {
        var notificationInsertData = {};
            notificationInsertData['fromUserId'] = data.chartererId;
            notificationInsertData['toUserId'] = data.ownerId;
            notificationInsertData['notification'] = data.notification;
            notificationInsertData['createdBy'] = data.createdBy;
            notificationInsertData['createdAt'] = new Date();
            notificationInsertData['updatedBy'] = data.updatedBy;
            notificationInsertData['updatedAt'] = new Date();
        await knex('draw_notification').insert(notificationInsertData).then(async (data) =>{})

        var tradingStatusInsertData = {};
            tradingStatusInsertData['tradingId'] = data.tradingId;
            tradingStatusInsertData['chartererId'] = data.chartererId;
            tradingStatusInsertData['ownerId'] = data.ownerId;
            tradingStatusInsertData['createdBy'] = data.createdBy;
            tradingStatusInsertData['createdAt'] = new Date();
            tradingStatusInsertData['updatedBy'] = data.updatedBy;
            tradingStatusInsertData['updatedAt'] = new Date();
            // tradingStatusInsertData['isAccepted'] = "Y";
            tradingStatusInsertData['isActive'] = "Y";
            tradingStatusInsertData['isDelete'] = "Y";
        await knex('trading_status').insert(tradingStatusInsertData).then(async (data) =>{})

        var tradingMessageInsertData = {};
            tradingMessageInsertData['tradingId'] = data.tradingId;
            tradingMessageInsertData['message'] = data.ownerName +' is invited for trade';
            tradingMessageInsertData['time'] = moment().format('HH:mm A');
            tradingMessageInsertData['createdBy'] = data.createdBy;
            tradingMessageInsertData['createdAt'] = new Date();
            tradingMessageInsertData['updatedBy'] = data.updatedBy;
            tradingMessageInsertData['updatedAt'] = new Date();
        await knex('trading_messages').insert(tradingMessageInsertData).then(async (data) =>{})

        var tradingProgressInsertData = {};
            tradingProgressInsertData['tradingId'] = data.tradingId;
            tradingProgressInsertData['brokerId'] = data.brokerId;
            tradingProgressInsertData['ownerId'] = data.ownerId;
            tradingProgressInsertData['message'] = data.ownerName +' is invited for trade';
            tradingProgressInsertData['time'] = moment().format('HH:mm A');
            tradingProgressInsertData['createdBy'] = data.createdBy;
            tradingProgressInsertData['createdAt'] = new Date();
            tradingProgressInsertData['updatedBy'] = data.updatedBy;
            tradingProgressInsertData['updatedAt'] = new Date();
        await knex('trading_progress').insert(tradingProgressInsertData).then(async (data) =>{})

        var tradingUpdateData = {};
            tradingUpdateData['chartererId'] = data.chartererId;

        knex('trading_platform_management').update(tradingUpdateData).where('id', data.tradingId).then((data) =>{})

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
            to: data.ownerEmail,
            subject: 'Trading Standard Bid Notification  ',
            text: data.notification
        };
        
        transporter.sendMail(mailOptions, function(error, info){});

        const responseData =
        {
            'success': true,
            'message': "Data Updated Successfully",
            'body':[]
        }
        resolve(responseData);
    })
}

// Owner Invite Charterer For Trade
module.exports.ownerInviteChartererForTrade = (data) =>
{   
    return new Promise(async (resolve, reject) =>
    {
        var notificationInsertData = {};
            notificationInsertData['fromUserId'] = data.ownerId;
            notificationInsertData['toUserId'] = data.chartererId;
            notificationInsertData['notification'] = data.notification;
            notificationInsertData['createdBy'] = data.createdBy;
            notificationInsertData['createdAt'] = new Date();
            notificationInsertData['updatedBy'] = data.updatedBy;
            notificationInsertData['updatedAt'] = new Date();
        await knex('draw_notification').insert(notificationInsertData).then(async (data) =>{})

        var tradingStatusInsertData = {};
            tradingStatusInsertData['tradingId'] = data.tradingId;
            tradingStatusInsertData['chartererId'] = data.chartererId;
            tradingStatusInsertData['createdBy'] = data.createdBy;
            tradingStatusInsertData['createdAt'] = new Date();
            tradingStatusInsertData['updatedBy'] = data.updatedBy;
            tradingStatusInsertData['updatedAt'] = new Date();
            tradingStatusInsertData['isAccepted'] = "Y";
            tradingStatusInsertData['isActive'] = "Y";
            tradingStatusInsertData['isDelete'] = "Y";
        await knex('trading_status').insert(tradingStatusInsertData).then(async (data) =>{})

        var tradingMessageInsertData = {};
            tradingMessageInsertData['tradingId'] = data.tradingId;
            tradingMessageInsertData['message'] = data.chartererName +' is invited for trade';
            tradingMessageInsertData['time'] = moment().format('HH:mm A');
            tradingMessageInsertData['createdBy'] = data.createdBy;
            tradingMessageInsertData['createdAt'] = new Date();
            tradingMessageInsertData['updatedBy'] = data.updatedBy;
            tradingMessageInsertData['updatedAt'] = new Date();
        await knex('trading_messages').insert(tradingMessageInsertData).then(async (data) =>{})

        var tradingProgressInsertData = {};
            tradingProgressInsertData['tradingId'] = data.tradingId;
            tradingProgressInsertData['brokerId'] = data.brokerId;
            tradingProgressInsertData['ownerId'] = data.ownerId;
            tradingProgressInsertData['message'] = data.chartererName +' is invited for trade';
            tradingProgressInsertData['time'] = moment().format('HH:mm A');
            tradingProgressInsertData['createdBy'] = data.createdBy;
            tradingProgressInsertData['createdAt'] = new Date();
            tradingProgressInsertData['updatedBy'] = data.updatedBy;
            tradingProgressInsertData['updatedAt'] = new Date();
        await knex('trading_progress').insert(tradingProgressInsertData).then(async (data) =>{})

        var tradingUpdateData = {};
            tradingUpdateData['ownerId'] = data.ownerId;

        knex('trading_platform_management').update(tradingUpdateData).where('id', data.tradingId).then((data) =>{})

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
            to: data.chartererEmail,
            subject: 'Trading Standard Bid Notification  ',
            text: data.notification
        };
        
        transporter.sendMail(mailOptions, function(error, info){});

        const responseData =
        {
            'success': true,
            'message': "Data Updated Successfully",
            'body':[]
        }
        resolve(responseData);
    })
}

// New Users Records
module.exports.newUsersRecords = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await knex('users_management').where(filterCondition).where({ 'isDelete' : 'N' }).limit(10).orderBy('id', 'desc').then(async (newUsersData) =>
        {  
            const responseData =
            {
                'success': true,
                'message': "New Users Records",
                'data':newUsersData
            }
            resolve(responseData);
        })
    })
}

// Trade Status
module.exports.tradeStatusData = (filterCondition) =>
{
    var tradeResponseData = {};
        tradeResponseData['cpSigned'] = '0';
        tradeResponseData['cpNotSigned'] = '0';
        tradeResponseData['active'] = '0';

    return new Promise(async (resolve, reject) =>
    {
        await knex('trading_platform_management')
        .count('id AS cpSigned')
        .where('progress', '>=', '100')
        .where('companyId', '=', filterCondition.companyId)
        .where('isDelete', '=', 'N')
        .then(async (tradeStatusData) =>
        {  
            if(tradeStatusData.length > 0)
            {
                tradeResponseData['cpSigned'] = tradeStatusData[0].cpSigned;
            }
        })

        await knex('trading_platform_management')
        .count('id AS active')
        .where('progress', '<', '100')
        .where('companyId', '=', filterCondition.companyId)
        .where('isDelete', '=', 'N')
        .then(async (tradeStatusData) =>
        {  
            if(tradeStatusData.length > 0)
            {
                tradeResponseData['active'] = tradeStatusData[0].active;
                tradeResponseData['cpNotSigned'] = tradeStatusData[0].active;
            }
        })

        const responseData =
        {
            'success': true,
            'message': "Trade Status Datas",
            'data':tradeResponseData
        }
        resolve(responseData);

    })
}

// Fetch Trading Data According To Vessel
module.exports.tradingRecordsServerSideAccordingToVessel = (filterCondition) =>
{
    var vessel_name = filterCondition.vesselName;

    var vesselID = [];

    return new Promise(async (resolve, reject) =>
    {
        await knex('vessel_management').select('id','vessel_name','id_owner')
        .where((queryBuilder) =>
        {
            if (vessel_name != '' && vessel_name != null && vessel_name != undefined)
            {
                queryBuilder.where('vessel_name', 'like', '%'+vessel_name+'%');
            }
        }).orderBy('id', 'desc').then(async (vesselData) =>
        {   
            for(vesselData of vesselData)
            {
                vesselID.push(Number(vesselData.id));
            }
        })
        
        var tradingCondition = {};
            tradingCondition['dcm.companyId'] = filterCondition.companyId;
            if(filterCondition.cpDate != '' && filterCondition.cpDate != null && filterCondition.cpDate != undefined)
            {
                tradingCondition['dcm.cpDate'] = filterCondition.cpDate;
            }
            if(filterCondition.brokerId != '' && filterCondition.brokerId != null && filterCondition.brokerId != undefined)
            {
                tradingCondition['dcm.createdBy'] = filterCondition.brokerId;
            }
            if(filterCondition.chartererId != '' && filterCondition.chartererId != null && filterCondition.chartererId != undefined)
            {
                tradingCondition['dcm.chartererId'] = filterCondition.chartererId;
            }
            if(filterCondition.ownerId != '' && filterCondition.ownerId != null && filterCondition.ownerId != undefined)
            {
                tradingCondition['dcm.ownerId'] = filterCondition.ownerId;
            }
            if(filterCondition.fixtureId != '' && filterCondition.fixtureId != null && filterCondition.fixtureId != undefined)
            {
                tradingCondition['dcm.id'] = filterCondition.fixtureId;
            }
            if(filterCondition.cpCity != '' && filterCondition.cpCity != null && filterCondition.cpCity != undefined)
            {
                tradingCondition['dcm.cpCity'] = filterCondition.cpCity;
            }

            if(filterCondition.is_charterer_detail_term_sign_off != '' && filterCondition.is_charterer_detail_term_sign_off != null && filterCondition.is_charterer_detail_term_sign_off != undefined)
            {
                tradingCondition['dcm.is_charterer_detail_term_sign_off'] = filterCondition.is_charterer_detail_term_sign_off;
            }

            if(filterCondition.is_owner_detail_term_sign_off != '' && filterCondition.is_owner_detail_term_sign_off != null && filterCondition.is_owner_detail_term_sign_off != undefined)
            {
                tradingCondition['dcm.is_owner_detail_term_sign_off'] = filterCondition.is_owner_detail_term_sign_off;
            }

        await
            knex('trading_platform_management AS dcm')
                .select(
                    'dcm.*',
                    'cfm.cpformName as CharterPartyFormName',
                    'vm.vessel_name as vesselName',
                    'um.username as ownerName',
                    'umc.username as chartererName',
                    'cb.username as brokerName'
                )
                .leftOuterJoin('cp_form_management AS cfm', 'cfm.id', '=', 'dcm.formId','LEFT')
                .leftOuterJoin('vessel_management AS vm', 'vm.id', '=', 'dcm.vesselId','LEFT')
                .leftOuterJoin('users_management AS um', 'um.id', '=', 'dcm.ownerId','LEFT')
                .leftOuterJoin('users_management AS umc', 'umc.id', '=', 'dcm.chartererId','LEFT')
                .leftOuterJoin('users_management AS cb', 'cb.id', '=', 'dcm.brokerId','LEFT')
                .where(tradingCondition)
                .whereIn('dcm.vesselId',vesselID)
                .where({ 'dcm.isDelete' : 'N' }).orderBy('dcm.id', 'desc').then(async (data) =>
                {
                    var arr = []
                    if (data.length > 0)
                    {
                        for (dat of data)
                        {
                            var s = dat.id+"";
                            while (s.length < 6) s = "0" + s;
                            var identifier = s;
                            
                            if(dat.cpDate != '' && dat.cpDate != null)
                            {
                                var cpDateYear = await moment(dat.cpDate).format('YYYY');
                                var identifier = cpDateYear+'-'+identifier;

                                var cpDate = await dat.cpDate;
                                var cpDate = await moment(cpDate).format('YYYY-MM-DD');
                                var cpDateInfo = await moment(cpDate).format('Do MMM YYYY');

                            } else {
                                var identifier = identifier;

                                var cpDate = '';
                                var cpDate = '';
                                var cpDateInfo = '';
                            }
                            
                            var isOwnerAccepted = 'P';

                            await 
                                knex('trading_status')
                                .where({ 'tradingId' : dat.id })
                                .where({ 'ownerId' : dat.ownerId })
                                .limit(1)
                                .orderBy('id', 'desc').then(async (tradingStatusData) =>
                                {
                                    if (tradingStatusData.length > 0)
                                    {
                                        for (tradingStatusData of tradingStatusData)
                                        {
                                            isOwnerAccepted = tradingStatusData.isAccepted;
                                        }
                                    } else {
                                        isOwnerAccepted = 'Y';
                                    }
                                });

                            var isChartererAccepted = 'P';

                            await 
                                knex('trading_status')
                                .where({ 'tradingId' : dat.id })
                                .where({ 'chartererId' : dat.chartererId })
                                .limit(1)
                                .orderBy('id', 'desc').then(async (tradingStatusData) =>
                                {
                                    if (tradingStatusData.length > 0)
                                    {
                                        for (tradingStatusData of tradingStatusData)
                                        {
                                            isChartererAccepted = tradingStatusData.isAccepted;
                                        }
                                    }
                                });

                                dat.statusInfo = (dat.statusInfo == '') ? 'To Be Updated' : dat.statusInfo;

                                var tradingStatusInfo = 'Broker Intiated Trade';

                                await 
                                    knex('trading_messages')
                                    .where({ 'tradingId' : dat.id })
                                    .limit(1)
                                    .orderBy('id', 'desc').then(async (tradingMessageData) =>
                                    {
                                        if (tradingMessageData.length > 0)
                                        {
                                            for (tradingMessageData of tradingMessageData)
                                            {
                                                tradingStatusInfo = tradingMessageData.message;
                                            }
                                        }
                                    });

                                var tradeType = 'TRADE';

                                await knex('trading_status').where({ 'tradingId' : dat.id }).limit(1).orderBy('id', 'asc').then(async (tradingStatusData) =>
                                    {
                                        if (tradingStatusData.length > 0)
                                        {
                                            for (tradingStatusData of tradingStatusData)
                                            {
                                                tradeType = (tradingStatusData.chartererId == null) ? 'OFFER' : 'BID';
                                            }
                                        }
                                    });

                            var isMainTermDone = (dat.is_owner_main_term_sign_off == '1' && dat.is_charterer_main_term_sign_off == '1') ? '1' : '2';
                            var isDetailTermDone = (dat.is_owner_detail_term_sign_off == '1' && dat.is_charterer_detail_term_sign_off == '1') ? '1' : '2';

                            var statusInfo = (dat.status == 0) ? dat.statusInfo: 'C/P Signed';
                            var statusInfoLabel = '<h4 class="warningLabel">'+tradingStatusInfo+'</h4>';
                            var classInfo = (dat.status == 0) ? 'warningLabel' : 'successLabel';
                            var dateobject =
                            {
                                'trade_type'         : dat.trade_type,
                                'tradeType': tradeType,
                                'isMainTermDone': isMainTermDone,
                                'isDetailTermDone': isDetailTermDone,
                                'isOwnerAccepted': isOwnerAccepted,
                                'isChartererAccepted': isChartererAccepted,

                                'is_broker_approval' : dat.is_broker_approval,
                                'common_clauses_broker' : dat.common_clauses_broker,
                                'custom_term_clause_broker' : dat.custom_term_clause_broker,
                                'custom_common_clause_broker' : dat.custom_common_clause_broker,

                                'id'         : dat.id,
                                'identifier'         : identifier,
                                'CPTypeId' : dat.CPTypeId,
                                'charterPartyTypeName' : dat.charterPartyTypeName,
                                'CharterPartyFormName' : dat.CharterPartyFormName,
                                'vesselName' : dat.vesselName,
                                'ownerName' : dat.ownerName,
                                'chartererName' : dat.chartererName,
                                'brokerName' : dat.brokerName,
                                'progress' : dat.progress,
                                'status' : dat.status,
                                'statusInfo' : tradingStatusInfo,
                                'statusInfoLabel' : statusInfoLabel,
                                'classInfo' : classInfo,
                                'formId' : dat.formId,
                                'vesselId' : dat.vesselId,
                                'ownerId' : dat.ownerId,
                                'chartererId' : dat.chartererId,
                                'brokerId' : dat.brokerId,
                                'chartererBrokerId' : dat.chartererBrokerId,
                                'ownerBrokerId' : dat.ownerBrokerId,
                                'cpDate' : cpDate,
                                'cpDateInfo' : cpDateInfo,
                                'cpTime' : dat.cpTime,
                                'cpCity' : dat.cpCity,
                                'cpSubject' : dat.cpSubject,
                                'cpLiftDate' : dat.cpLiftDate,
                                'cpLiftTime' : dat.cpLiftTime,
                                'cpLiftCity' : dat.cpLiftCity,
                                'companyId' : dat.companyId,
                                'createdAt'  : dat.createdAt,
                                'createdBy'  : dat.createdBy,
                                'updatedAt'  : dat.updatedAt,
                                'updatedBy'  : dat.updatedBy,
                                'isActive'   : dat.isActive,
                                'isDelete'  : dat.isDelete,
                                'broker_clauses':dat.broker_clauses,		
                                'owner_clauses':dat.owner_clauses,		
                                'charterer_clauses':dat.charterer_clauses,		
                                'common_clauses':dat.common_clauses,
                                'drawStatusId' : dat.drawStatusId,
                                'std_bid_name':dat.std_bid_name,
                                'is_std_bid':dat.is_std_bid,
                                "Cancel_trade":dat.Cancel_trade

                                
                            }
                            arr.push(dateobject)
                        }
                        const responseData =
                        {
                            'success': true,
                            'message': "Trading Platforms list",
                            'data'   : arr
                        }
                        resolve(responseData);
                    } else {
                        const responseData =
                        {
                            'success': true,
                            'message': "Data not found",
                            'data'   : []
                        }
                        resolve(responseData);
                    }
                })
    })
}

// Fetch Trading Messages Data Start
module.exports.tradingMessagesDataRecordsServerSide = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await knex('trading_messages').where(filterCondition).orderBy('id', 'desc').then(async (data) =>
        {
            const responseData =
            {
                'success': true,
                'message': "Trading Logs Data",
                'data'   : data
            }
            resolve(responseData);
        })
    })
}
// Fetch Trading Messages Data End
 
// Invitation Email Send Start
module.exports.invitationEmailSend = (data) =>
{
    return new Promise((resolve, reject) =>
    {
        return knex('invite_user').insert(
        {
            email_id: data.email_id,
            companyId: data.companyId,
            createdBy: data.createdBy,
            createdAt: new Date(),
            updatedBy: data.updatedBy,
            updatedAt: new Date(),
            date: data.date,
            time: data.time,
            isActive: "Y",
            isDelete: "N"
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
                to: data.email_id,
                subject: 'CP System Invitation',
                text: data.message,
            };
            
            transporter.sendMail(mailOptions, function(error, info)
            {
                console.log(error);
                console.log(info);
            });
            const responseData =
            {
                'success': true,
                "message": "Inviatation Sent Successfully successfully",
                "data" : ''
            }
            resolve(responseData)
        })        
    })
}
// Invitation Email Send End

// Invitation Email Send To Company Admin Start
module.exports.invitationEmailSendCompanyAdmin = (data) =>
{
    return new Promise((resolve, reject) =>
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
            to: data.email_id,
            subject: 'CP System Invitation',
            text: data.message,
        };
        
        transporter.sendMail(mailOptions, function(error, info)
        {});
        const responseData =
        {
            'success': true,
            "message": "Inviatation Sent successfully",
            "data" : ''
        }
        resolve(responseData)    
    })
}
// Invitation Email Send To Company Admin End

// Invitation Email Send To Company Admin Start
module.exports.emailSendCommon = (data) =>
{
    return new Promise((resolve, reject) =>
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
            to: data.email_id,
            subject: data.subject,
            text: data.message,
        };
        
        transporter.sendMail(mailOptions, function(error, info)
        {});
        const responseData =
        {
            'success': true,
            "message": "Mail Sent successfully",
            "data" : ''
        }
        resolve(responseData)    
    })
}
// Invitation Email Send To Company Admin End

// Invited User List Start
module.exports.invitedUserRecordsServerSide = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await
            knex('invite_user AS it').select('it.*','um.username as invitedBy').leftOuterJoin('users_management AS um', 'um.id', '=', 'it.createdBy')
            .where(filterCondition).where({ 'it.isDelete' : 'N' }).orderBy('it.id', 'desc').then(async (data) =>
            {
                const responseData =
                {
                    'success': true,
                    'message': "Trading Platform List",
                    'data'   : data
                }
                resolve(responseData);
            })
    })
}
// Invited User List End

// Change Owner Ship
module.exports.changeOwnerShip = (data) =>
{
    return new Promise((resolve, reject) =>
    {
        knex('trading_status').update(
        {
            'ownerId'  :   data.toUserId,
            'updatedBy' :   data.updatedBy,
            'updatedAt' :   new Date()
        }).where('tradingId', data.tradingId).where('ownerId', data.fromUserId).then((data) =>
        {
        })

        return knex('change_ownership').insert(
        {
            fromUserId: data.fromUserId,
            tradingId: data.tradingId,
            toUserId: data.toUserId,
            companyId: data.companyId,
            date: data.date,
            time: data.time,
            createdAt: new Date(),
            createdBy: data.updatedBy,
            updatedBy: data.updatedBy,
            updatedAt: new Date(),
            date: data.date,
            time: data.time,
            isActive: "Y",
            isDelete: "N"
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
                to: data.email_id,
                subject: 'Owner Ship Assigned',
                text: data.message,
            };
            
            transporter.sendMail(mailOptions, function(error, info)
            {
                console.log(error);
                console.log(info);
            });
            const responseData =
            {
                'success': true,
                "message": "Ownership Changed successfully",
                "data" : ''
            }
            resolve(responseData)
        })     
    })
}
// Invitation Email Send End

module.exports.ownerShipRecordsServerSide = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await
            knex('change_ownership AS co').select('co.*','um.username as transferedTo','tpm.cpDate','tpm.progress').leftOuterJoin('users_management AS um', 'um.id', '=', 'co.toUserId')
            .leftOuterJoin('trading_platform_management AS tpm', 'tpm.id', '=', 'co.tradingId')
            .where(filterCondition).where({ 'co.isDelete' : 'N' }).orderBy('co.id', 'desc').then(async (data) =>
            {
                const responseData =
                {
                    'success': true,
                    'message': "Ownership Records",
                    'data'   : data
                }
                resolve(responseData);
            })
    })
}



// Share trade module  chirag
module.exports.shareTrade = (data) =>
{
    return new Promise((resolve, reject) =>
    {
        // knex('trading_status').update(
        // {
        //     'ownerId'  :   data.toUserId,
        //     'updatedBy' :   data.updatedBy,
        //     'updatedAt' :   new Date()
        // }).where('tradingId', data.tradingId).where('ownerId', data.fromUserId).then((data) =>
        // {
        // })

        return knex('share_module').insert(
        {
            fromUserId: data.fromUserId,
            tradingId: data.tradingId,
            toUserId: data.toUserId,
            companyId: data.companyId,
            date: data.date,
            time: data.time,
            createdAt: new Date(),
            createdBy: data.updatedBy,
            updatedBy: data.updatedBy,
            updatedAt: new Date(),
            date: data.date,
            time: data.time,
            isActive: "Y",
            isDelete: "N"
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
                to: data.email_id,
                subject: 'Hello, you can view current share trade activity in your system',
                text: data.message,
            };
            
            transporter.sendMail(mailOptions, function(error, info)
            {
                console.log(error);
                console.log(info);
            });
            const responseData =
            {
                'success': true,
                "message": "Trade  Share Successfully",
                "data" : ''
            }
            resolve(responseData)
        })     
    })
}
// Invitation Email Send End

module.exports.shareTradeRecordsServerSide = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        // var whereCnd = "toUserId = "+filterCondition["toUserId"]+
        await
            knex('share_module AS co').select('co.*','um.username as toUserName','u.username as transferedTo','tpm.cpDate','tpm.progress')
            .leftOuterJoin('users_management AS um', 'um.id', '=', 'co.toUserId')
            .leftOuterJoin('users_management AS u', 'u.id', '=', 'co.fromUserId')
            .leftOuterJoin('trading_platform_management AS tpm', 'tpm.id', '=', 'co.tradingId')
            .where(filterCondition).where({ 'co.isDelete' : 'N' }).orderBy('co.id', 'desc').then(async (data) =>
            {
                const responseData =
                {
                    'success': true,
                    'message': "Share trade Records",
                    'data'   : data
                }
                resolve(responseData);
            })
    })
}


// Share trade module  chirag
module.exports.saveBid = (data) =>
{
    return new Promise((resolve, reject) =>
    {
        return knex('saved_bid').insert(
        {
            tradingId: data.tradingId,
            bid_name: data.bid_name,
            bid_type: data.bid_type,
            checked_clauses: data.checked_clauses,
            companyId: data.companyId,
            date: data.date,
            time: data.time,
            createdAt: new Date(),
            createdBy: data.updatedBy,
            updatedBy: data.updatedBy,
            updatedAt: new Date(),
            date: data.date,
            time: data.time,
            isActive: "Y",
            isDelete: "N"
        }).then((result) =>
        {
            const responseData =
            {
                'success': true,
                "message": "Bid Saved Successfully",
                "data" : ''
            }
            resolve(responseData)
        })     
    })
}


module.exports.saveBidRecords = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await
            knex('saved_bid')
            .where(filterCondition).where({ 'isDelete' : 'N' }).orderBy('id', 'desc').then(async (data) =>
            {
                const responseData =
                {
                    'success': true,
                    'message': "Saved Bid Records",
                    'data'   : data
                }
                resolve(responseData);
            })
    })
}

module.exports.tradeCancel = (data) =>
{
    var id = data.id;3
var cT = data.Cancel_trade;
    return new Promise((resolve, reject) =>
    {
        return knex('trading_platform_management').update(
        {
            'Cancel_trade'  : 'Y',
        }).where('id', id).then((data) =>
        {
            if (data)
            {
                const responseData =
                {
                    'success': true,
                    'message': "Trade Cancel Successfully",
                    'body':data
                }
                resolve(responseData);
            }
        })
    })
}