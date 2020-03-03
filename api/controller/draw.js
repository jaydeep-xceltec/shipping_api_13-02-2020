const knex = require('knex')(require('../knexfile'))
var moment = require('moment');
const nodemailer = require('nodemailer');

module.exports.DrawFormCreate = (data) =>
{   
   data.brokerId = (data.brokerId != '' && data.brokerId != null) ? data.brokerId : ''; 
   console.log(data);
    return new Promise((resolve, reject) =>
    {
        return knex('draw_charter_management').insert(
        {
            brokerId: data.brokerId,

            CPTypeId: data.CPTypeId,
            formId: data.formId,
            vesselId: data.vesselId,
            ownerId: data.ownerId,
            chartererId: data.chartererId,
            chartererBrokerId: data.chartererBrokerId,
            ownerBrokerId: data.ownerBrokerId,
            cpDate: data.cpDate,
            // cpTime: data.cpTime,
            // cpCity: data.cpCity,
            // cpSubject: data.cpSubject,
            // cpLiftDate: data.cpLiftDate,
            // cpLiftTime: data.cpLiftTime,
            // cpLiftCity: data.cpLiftCity,
            companyId: data.companyId,
            createdBy: data.createdBy,
            createdAt: new Date(),
            updatedBy: data.updatedBy,
            updatedAt: new Date(),
            isActive: "Y",
            isDelete: "N",
            // broker_clauses:data.broker_clauses,		
            // common_clauses:data.common_clauses,
            // custom_common_clause:data.custom_common_clause,
            // custom_term_clause:data.custom_term_clause,
        }).then((result) => {
            const responseData = {
                'success': true,
                "message": "Draw Form created successfully",
                "data" : result,
            }
            resolve(responseData)
        }).error((reject)=>{
            console.log(reject);
        })        
    })
}

module.exports.DrawFormCopyCreate = (data) =>
{   
   // console.log(data);
    
   data.brokerId = (data.brokerId != '' && data.brokerId != null) ? data.brokerId : ''; 

    return new Promise((resolve, reject) =>
    {
        return knex('draw_charter_management').insert(
        {
            progress: data.progress,
            status: data.status,
            owner_clauses: data.owner_clauses,
            charterer_clauses: data.charterer_clauses,
            checked_clauses:data.checked_clauses,
            brokerId: data.brokerId,
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
            common_clauses:data.common_clauses,
            custom_common_clause:data.custom_common_clause,
            custom_term_clause:data.custom_term_clause,
            is_submitted :1
        }).then((result) => {
            const responseData = {
                'success': true,
                "message": "Draw Form created successfully",
                "data" : result,
            }
            resolve(responseData)
        })        
    })
}


module.exports.drawFormRecords = () =>
{
    return new Promise(async (resolve, reject) =>
    {
        
        await 
        
            knex('draw_charter_management AS dcm')
            
            .select('dcm.*', 'cpt.name as charterPartyTypeName',
                    'cfm.cpformName as CharterPartyFormName', 'vm.vessel_name as vesselName'
                    , 'um.username as ownerName', 'umc.username as chartererName', 'cb.username as charterBrokerName'
                    , 'ob.username as ownerBrokerName'
                    
                
            )

            .join('charter_party_type AS cpt', 'cpt.id', '=', 'dcm.CPTypeId')

            .join('cp_form_management AS cfm', 'cfm.id', '=', 'dcm.formId')

            .join('vessel_management AS vm', 'vm.id', '=', 'dcm.vesselId')

            .join('users_management AS um', 'um.id', '=', 'dcm.ownerId')

            .join('users_management AS umc', 'umc.id', '=', 'dcm.chartererId')

            .join('users_management AS cb', 'cb.id', '=', 'dcm.chartererBrokerId')

            .join('users_management AS ob', 'ob.id', '=', 'dcm.ownerBrokerId')


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

                    dat.statusInfo = (dat.statusInfo == '') ? 'To Be Updated' : dat.statusInfo;

                    var cpDate = await dat.cpDate;
                    var cpDate = await moment(cpDate).format('YYYY-MM-DD');
                    var cpDateInfo = await moment(cpDate).format('Do MMM YYYY');
                    var statusInfo = (dat.status == 0) ? dat.statusInfo: 'C/P Signed';
                    var statusInfoLabel = (dat.status == 0) ? '<h4 class="warningLabel">'+dat.statusInfo+'</h4>' : '<h4 class="successLabel">C/P Signed</h4>';
                    var classInfo = (dat.status == 0) ? 'warningLabel' : 'successLabel';

                    var dateobject = {
                        'id'         : dat.id,
                        'identifier'         : identifier,

                        'CPTypeId' : dat.CPTypeId,

                        'is_complete_draw_cp' : dat.is_complete_draw_cp,

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
                        'custom_common_clause':dat.custom_common_clause,
                        'custom_term_clause':dat.custom_term_clause,
                        'checked_clauses':dat.checked_clauses,
                    }
                    arr.push(dateobject)
                }
               // console.log(arr)
                const responseData = {
                    'success': true,
                    'message': "Draw Form list",
                    'data'   : arr
                }
                resolve(responseData);
               // console.log(responseData);

            } else {
                const responseData = {
                    'success': false,
                    'message': "Data not found"
                }
                resolve(responseData);
               // console.log(responseData);

            }
        })
    })
}

module.exports.drawRecordsServerSide = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await 
        
            knex('draw_charter_management AS dcm')
            
            .select('dcm.*',
                    'cfm.cpformName as CharterPartyFormName', 'vm.vessel_name as vesselName'
                    , 'um.username as ownerName', 'umc.username as chartererName', 'cb.username as charterBrokerName'
                    , 'ob.username as ownerBrokerName','cm.companyName as companyName','bbm.username as brokerName'
                    
                
            )
            .join('cp_form_management AS cfm', 'cfm.id', '=', 'dcm.formId')
            .join('vessel_management AS vm', 'vm.id', '=', 'dcm.vesselId')
            .join('users_management AS um', 'um.id', '=', 'dcm.ownerId')
            .join('users_management AS umc', 'umc.id', '=', 'dcm.chartererId')
            .join('users_management AS cb', 'cb.id', '=', 'dcm.chartererBrokerId')
            .join('users_management AS ob', 'ob.id', '=', 'dcm.ownerBrokerId')
            .join('company_management AS cm', 'cm.id', '=', 'dcm.companyId')
            .join('users_management AS bbm', 'bbm.id', '=', 'dcm.brokerId')
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
                    var identifier = cpDateYear+'-'+identifier;

                    var cpDate = await dat.cpDate;
                    var cpDate = await moment(cpDate).format('YYYY-MM-DD');

                    var cpDateInfo = await moment(cpDate).format('Do MMM YYYY');

                    dat.statusInfo = (dat.statusInfo == '') ? 'To Be Updated' : dat.statusInfo;

                    var statusInfo = (dat.status == 0) ? dat.statusInfo: 'C/P Signed';
                    var statusInfoLabel = (dat.status == 0) ? '<h4 class="warningLabel">'+dat.statusInfo+'</h4>' : '<h4 class="successLabel">C/P Signed</h4>';
                    var classInfo = (dat.status == 0) ? 'warningLabel' : 'successLabel';

                    var isChartererAccepted = 'P';

                    var drawStatusInfoCharterer = ( dat.signature2 != ''  && dat.signature2 != null ) ? 'Accepted' : 'Pending';
                    var drawStatusInfoOwner = ( dat.signature1 != '' && dat.signature1 != null ) ? 'Accepted' : 'Pending';

                    console.log(drawStatusInfoCharterer);
                    console.log(drawStatusInfoOwner);

                    // await 
                    //     knex('draw_status')
                    //     .where({ 'drawId' : dat.id })
                    //     .where({ 'chartererId' : dat.chartererId })
                    //     .limit(1)
                    //     .orderBy('id', 'desc').then(async (drawStatus) =>
                    //     {
                    //         if (drawStatus.length > 0)
                    //         {
                    //             for (drawStatus of drawStatus)
                    //             {
                    //                 isChartererAccepted = drawStatus.isAccepted;
                    //             }
                    //         }
                    //     });


                    var dateobject = {
                        
                        'drawStatusInfoCharterer' : drawStatusInfoCharterer,
                        'drawStatusInfoOwner' : drawStatusInfoOwner,

                        'isChartererAccepted'         : isChartererAccepted,
                        'id'         : dat.id,

                        'is_complete_draw_cp'         : dat.is_complete_draw_cp,
                        
                        'identifier'  : identifier,

                        'CPTypeId' : dat.CPTypeId,

                        'charterPartyTypeName' : dat.charterPartyTypeName,
                        'CharterPartyFormName' : dat.CharterPartyFormName,
                        'vesselName' : dat.vesselName,
                        'ownerName' : dat.ownerName,
                        'chartererName' : dat.chartererName,
                        'charterBrokerName' : dat.charterBrokerName,
                        'ownerBrokerName' : dat.ownerBrokerName,
                        'companyName' : dat.companyName,
                        'brokerName' : dat.brokerName,

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
                        'cpTime' : dat.cpTime,
                        'cpCity' : dat.cpCity,
                        'cpSubject' : dat.cpSubject,
                        'cpLiftDate' : dat.cpLiftDate,
                        'cpLiftTime' : dat.cpLiftTime,
                        'cpLiftCity' : dat.cpLiftCity,
                        'companyId' : dat.companyId,
                        'lifted_vessel_name':dat.lifted_vessel_name,
                        'lifted_vessel_imo':dat.lifted_vessel_imo,
                        'lifted_vessel_flag':dat.lifted_vessel_flag,
                        'lifted_vessel_year_built':dat.lifted_vessel_year_built,

                        'cpDateInfo' : cpDateInfo,

                        'isAccepted' : '',
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
                        'custom_common_clause':dat.custom_common_clause,
                        'custom_term_clause':dat.custom_term_clause,

                        'checked_clauses':dat.checked_clauses,
                    }
                    arr.push(dateobject)
                }
                //// console.log(arr)
                const responseData = {
                    'success': true,
                    'message': "Draw Form list",
                    'data'   : arr
                }
                resolve(responseData);
                console.log(responseData,'Draw Records Server SIDe');

            } else {
                const responseData = {
                    'success': false,
                    'message': "Data not found"
                }
                resolve(responseData);
                //// console.log(responseData);

            }
        })
    })
}

module.exports.drawFormUpdate = (data) =>
{
    var id = data.id;
    
    return new Promise((resolve, reject) =>
    {
        return knex('draw_charter_management').update({
            
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
            'custom_common_clause':dat.custom_common_clause,
            'custom_term_clause':dat.custom_term_clause,
            'checked_clauses':dat.checked_clauses,
        }).where('id', id).then((data) => {
            if (data) {
                const responseData = {
                    'success': true,
                    'message': "Data successfully updated",
                    'body': data
                }
                resolve(responseData);
            }
        })
    })
}

module.exports.drawDataRemove = (data) =>
{
    var id = data.id;
    return new Promise((resolve, reject) =>
    {
        return knex('draw_charter_management').update({ isDelete: 'Y' }).where('id', id).then(async (data) => {
            if (data) {
                await knex('draw_charter_management').update({ isDelete: 'Y' }).where({ id: id }).then((rdata) => {
                    if (rdata) {
                        const responseData = {
                            'success': true,
                            'message': "Draw Data  removed successfully"
                        }
                        resolve(responseData);
                    } else {
                        const responseData = {
                            'success': true,
                            'message': "Draw Data Form remove successfully"
                        }
                        resolve(responseData);
                    }
                })
            } else {
                const responseData = {
                    'success': false,
                    'message': "Id not found"
                }
                resolve(responseData);
            }
        })
    })
}

module.exports.CharterDrawAcceptReject = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await 
            knex('draw_status').where(filterCondition).where({ 'isDelete' : 'N' }).orderBy('id', 'desc').then(async (data) =>
            {
                var arr = []
                if (data.length > 0)
                {
                    for (dat of data)
                    {
                        var dateobject =
                        {
                            'id'         : dat.id,
                            'drawId' : dat.drawId,
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

// Draw Request To Charterer
module.exports.DrawRequestToChartererCreate = (insertData) =>
{   
    return new Promise((resolve, reject) =>
    {
        knex('draw_status')
        .where('drawId' ,'=', insertData.drawId)
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
                console.log('here in draw request create');
                return knex('draw_status').insert(
                {
                    drawId: insertData.drawId,
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
                        "message": "Draw Request Created Successfully"
                    }
                    resolve(responseData)
                })
            }
        });
    })
}

// Charter Party Data Accept Reject Status Update
module.exports.charterPartyRequestStatusUpdate = (data) =>
{
    var id = data.id;
    return new Promise((resolve, reject) =>
    {
        return knex('draw_status').update(
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

module.exports.drawRecordsServerSideCharterer = (filterCondition) =>
{

    return new Promise(async (resolve, reject) =>
    {
        await 
        
            knex('draw_charter_management AS dcm')
            
            .select('dcm.*',
                    'cfm.cpformName as CharterPartyFormName', 'vm.vessel_name as vesselName'
                    , 'um.username as ownerName', 'umc.username as chartererName', 'cb.username as charterBrokerName'
                    , 'ob.username as ownerBrokerName', 'cm.companyName as companyName', 'umm.username as brokerName'
            )

            .leftOuterJoin('cp_form_management AS cfm', 'cfm.id', '=', 'dcm.formId')
            .leftOuterJoin('company_management AS cm', 'cm.id', '=', 'dcm.companyId')
            .leftOuterJoin('users_management AS umm', 'umm.id', '=', 'dcm.createdBy')

            .leftOuterJoin('vessel_management AS vm', 'vm.id', '=', 'dcm.vesselId')

            .leftOuterJoin('users_management AS um', 'um.id', '=', 'dcm.ownerId')

            .leftOuterJoin('users_management AS umc', 'umc.id', '=', 'dcm.chartererId')

            .leftOuterJoin('users_management AS cb', 'cb.id', '=', 'dcm.chartererBrokerId')

            .leftOuterJoin('users_management AS ob', 'ob.id', '=', 'dcm.ownerBrokerId')

            // .leftOuterJoin('draw_status AS ds', 'ds.drawId', '=', 'dcm.id')

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
                    var cpDateYear = await moment(dat.cpDate).format('YYYY');
                    var identifier = cpDateYear+'-'+identifier;

                    var cpDate = await dat.cpDate;
                    var cpDate = await moment(cpDate).format('YYYY-MM-DD');
                    var cpDateInfo = await moment(cpDate).format('Do MMM YYYY');

                    dat.statusInfo = (dat.statusInfo == '') ? 'To Be Updated' : dat.statusInfo;

                    var statusInfo = (dat.status == 0) ? dat.statusInfo: 'C/P Signed';
                    var statusInfoLabel = (dat.status == 0) ? '<h4 class="warningLabel">'+dat.statusInfo+'</h4>' : '<h4 class="successLabel">C/P Signed</h4>';
                    var classInfo = (dat.status == 0) ? 'warningLabel' : 'successLabel';

                    var isChartererAccepted = 'P';

                    var drawStatusInfoCharterer = ( dat.signature2 != '' && dat.signature2 != null ) ? 'Accepted' : 'Pending';
                    var drawStatusInfoOwner = ( dat.signature1 != '' && dat.signature1 != null ) ? 'Accepted' : 'Pending';

                    await 
                        knex('draw_status')
                        .where({ 'drawId' : dat.id })
                        .where({ 'chartererId' : dat.chartererId })
                        .limit(1)
                        .orderBy('id', 'desc').then(async (drawStatus) =>
                        {
                            if (drawStatus.length > 0)
                            {
                                for (drawStatus of drawStatus)
                                {
                                    isChartererAccepted = drawStatus.isAccepted;
                                }
                            }
                        });

                    var dateobject = {

                        'isChartererAccepted' : isChartererAccepted,
                        
                        'drawStatusInfoCharterer' : drawStatusInfoCharterer,
                        'drawStatusInfoOwner' : drawStatusInfoOwner,

                        'isAccepted'         : isChartererAccepted,

                        'companyName'         : dat.companyName,
                        'brokerName'         : dat.brokerName,

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

                        // 'isAccepted' : dat.isAccepted,
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
                        'custom_common_clause':dat.custom_common_clause,
                        'custom_term_clause':dat.custom_term_clause,
                        'checked_clauses':dat.checked_clauses,


                    }
                    arr.push(dateobject)
                }
                //// console.log(arr)
                const responseData = {
                    'success': true,
                    'message': "Draw Form list",
                    'data'   : arr
                }
                resolve(responseData);
                //// console.log(responseData);

            } else {
                const responseData = {
                    'success': false,
                    'message': "Data not found"
                }
                resolve(responseData);
                //// console.log(responseData);

            }
        })
    })
}

// draw check update by broker
module.exports.drawFormUpdateByCharterCheck = (data) =>
{
    var id = data.id;
    
    return new Promise((resolve, reject) =>
    {
        return knex('draw_charter_management').update({
            
            charterer_clauses:data.charterer_clauses,
            common_clauses:data.common_clauses,
            custom_term_clause:data.custom_term_clause,
            custom_common_clause:data.custom_common_clause,
        }).where('id', id).then((data) => {
            if (data) {
                const responseData = {
                    'success': true,
                    'message': "Data successfully updated",
                    'body': data
                }
                resolve(responseData);
            }
        })
    })
}


// draw check update by broker
module.exports.drawFormUpdateByBrokerCheck = (data) =>
{
    var id = data.id;
    
    return new Promise((resolve, reject) =>
    {
        return knex('draw_charter_management').update({
            
            broker_clauses:data.broker_clauses,
            common_clauses:data.common_clauses,
            custom_term_clause:data.custom_term_clause,
            custom_common_clause:data.custom_common_clause,
        }).where('id', id).then((data) => {
            if (data) {
                const responseData = {
                    'success': true,
                    'message': "Data successfully updated",
                    'body': data
                }
                resolve(responseData);
            }
        })
    })
}




// draw check update by owner
module.exports.drawFormUpdateByOwnerCheck = (data) =>
{
    var id = data.id;
    
    return new Promise((resolve, reject) =>
    {
        return knex('draw_charter_management').update({
            
            owner_clauses:data.owner_clauses,
            common_clauses:data.common_clauses,
            custom_term_clause:data.custom_term_clause,
            custom_common_clause:data.custom_common_clause,
        }).where('id', id).then((data) => {
            if (data) {
                const responseData = {
                    'success': true,
                    'message': "Data successfully updated",
                    'body': data
                }
                resolve(responseData);
            }
        })
    })
}
// ====================================================================================
// Trading
// =====================================================================================
// draw check update by owner

module.exports.tradingFormUpdateByOwnerCheck = (data) =>
{
    var id = data.id;
    
    return new Promise((resolve, reject) =>
    {
        return knex('trading_platform_management').update({
            
            owner_clauses:data.owner_clauses,
            common_clauses:data.common_clauses,
            custom_term_clause:data.custom_term_clause,
            custom_common_clause:data.custom_common_clause,
        }).where('id', id).then((data) => {
            if (data) {
                const responseData = {
                    'success': true,
                    'message': "Data successfully updated",
                    'body': data
                }
                resolve(responseData);
            }
        })
    })
}

module.exports.tradingFormUpdateByBrokerCheck = (data) =>
{
    var id = data.id;
    
    return new Promise((resolve, reject) =>
    {
        return knex('trading_platform_management').update({
            
            broker_clauses:data.broker_clauses,
            common_clauses:data.common_clauses,
            custom_term_clause:data.custom_term_clause,
            custom_common_clause:data.custom_common_clause,
        }).where('id', id).then((data) => {
            if (data) {
                const responseData = {
                    'success': true,
                    'message': "Data successfully updated",
                    'body': data
                }
                resolve(responseData);
            }
        })
    })
}

module.exports.tradingFormUpdateByChartererCheck = (data) =>
{
    var id = data.id;
    
    return new Promise((resolve, reject) =>
    {
        return knex('trading_platform_management').update({
            
            charterer_clauses:data.charterer_clauses,
            common_clauses:data.common_clauses,
            custom_term_clause:data.custom_term_clause,
            custom_common_clause:data.custom_common_clause,
        }).where('id', id).then((data) => {
            if (data) {
                const responseData = {
                    'success': true,
                    'message': "Data successfully updated",
                    'body': data
                }
                resolve(responseData);
            }
        })
    })
}

module.exports.drawProgressUpdateCustom = (data) =>
{
    return new Promise((resolve, reject) =>
    {
        knex('draw_charter_management').where({'id':data.drawId}).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (drawProgressUpdate) =>
        {
            return knex('draw_charter_management').update(data).where('id', data.drawId).then((data) =>
            {
                const responseData = {
                    'success': true,
                    'message': "Data successfully updated",
                    'body': data
                }
                resolve(responseData);
            })
        });
    })
}

module.exports.drawProgressUpdate = (data) =>
{
    return new Promise((resolve, reject) =>
    {
        knex('draw_charter_management').where({'id':data.id}).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (drawProgressUpdate) =>
        {
            return knex('draw_charter_management').update(data).where('id', data.id).then((responseData) =>
            {
                knex('draw_charter_management').where({'id':data.id}).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (responseData) =>
                {
                    console.log(responseData);
                    var drawProgressUpdateInfo = responseData[0];
                    console.log(drawProgressUpdateInfo);
                    var progress = 
                                drawProgressUpdateInfo.broker_check 
                                + drawProgressUpdateInfo.owner_view_check 
                                + drawProgressUpdateInfo.charterer_view_check 
                                + drawProgressUpdateInfo.charterer_signed_check 
                                + drawProgressUpdateInfo.owner_signed_check;
                    if(progress > 100)
                    {
                        progress = 100;
                    }
                    return knex('draw_charter_management').update(
                    {
                        'progress':progress
                    }).where('id', data.id).then((data) =>
                    {
                        const responseData = {
                            'success': true,
                            'message': "Data successfully updated",
                            'body': data
                        }
                        resolve(responseData);
                    })
                });
            })
        });
    })
}

module.exports.tradingProgressUpdate = (data) =>
{
    return new Promise((resolve, reject) =>
    {
        knex('trading_platform_management').where({'id':data.tradingId}).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (tradingUpdate) =>
        {
            var tradingUpdateInfo = tradingUpdate[0];
            var progress = tradingUpdateInfo.progress + 5;
            if(progress > 100)
            {
                progress = 100;
            }
            return knex('trading_platform_management').update(
            {
                'progress':progress
            }).where('id', data.tradingId).then((data) =>
            {
                const responseData = {
                    'success': true,
                    'message': "Data successfully updated",
                    'body': data
                }
                resolve(responseData);
            })
        });
    })
}

// Draw Status Info Update
module.exports.drawStatusInfoUpdate = (data) =>
{
    return new Promise((resolve, reject) =>
    {
        knex('draw_charter_management').where({'id':data.drawId}).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (drawProgressUpdate) =>
        {
            return knex('draw_charter_management').update(
            {
                'statusInfo':data.statusInfo
            }).where('id', data.drawId).then((data) =>
            {
                const responseData = {
                    'success': true,
                    'message': "Data successfully updated",
                    'body': data
                }
                resolve(responseData);
            })
        });
    })
}

// Trading Status Info Update
module.exports.tradingStatusInfoUpdate = (data) =>
{
    return new Promise((resolve, reject) =>
    {
        knex('trading_platform_management').where({'id':data.tradingId}).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (drawProgressUpdate) =>
        {
            return knex('trading_platform_management').update(
            {
                'statusInfo':data.statusInfo
            }).where('id', data.tradingId).then((data) =>
            {
                const responseData = {
                    'success': true,
                    'message': "Data successfully updated",
                    'body': data
                }
                resolve(responseData);
            })
        });
    })
}

module.exports.drawDataUpdate = (data) =>
{
    return new Promise((resolve, reject) =>
    {
        knex('draw_charter_management').where({'id':data.drawId}).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (drawProgressUpdate) =>
        {
            return knex('draw_charter_management').update(
            {
                'is_submitted':'1',
                'cpTime':data.cpTime,
                'cpCity':data.cpCity,
                'cpDate':data.cpDate,
            }).where('id', data.drawId).then((data) =>
            {
                const responseData = {
                    'success': true,
                    'message': "Data successfully updated",
                    'body': data
                }
                resolve(responseData);
            })
        });
    })
}

// Draw Data Custom Input Update
module.exports.customInputDrawDataUpdate = (data) =>
{
    return new Promise((resolve, reject) =>
    {
        knex('draw_charter_management').where({'id':data.drawId}).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (drawProgressUpdate) =>
        {
            return knex('draw_charter_management').update(
            {
                'metricTonValue':data.metricTonValue,
                'heading_msg':data.heading_msg,
                'preamble_description':data.preamble_description,
                'customInput1':data.customInput1,
                'customInput2':data.customInput2,
            }).where('id', data.drawId).then((data) =>
            {
                const responseData = {
                    'success': true,
                    'message': "Data successfully updated",
                    'body': data
                }
                resolve(responseData);
            })
        });
    })
}

// Draw Data Signaturte Update
module.exports.drawDataSignatureUpadate = (data) =>
{
    return new Promise((resolve, reject) =>
    {
        knex('draw_charter_management').where({'id':data.drawId}).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (drawProgressUpdate) =>
        {
            return knex('draw_charter_management').update(
            {
                'signature1':data.signature1,
                'signature2':data.signature2,
            }).where('id', data.drawId).then((data) =>
            {
                const responseData = {
                    'success': true,
                    'message': "Data successfully updated",
                    'body': data
                }
                resolve(responseData);
            })
        });
    })
}

// Trading Data Signaturte Update
module.exports.tradingDataSignatureUpadate = (data) =>
{
    return new Promise((resolve, reject) =>
    {
        knex('trading_platform_management').where({'id':data.tradingId}).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (drawProgressUpdate) =>
        {
            return knex('trading_platform_management').update(
            {
                'signature1':data.signature1,
                'signature2':data.signature2,
            }).where('id', data.tradingId).then((data) =>
            {
                const responseData = {
                    'success': true,
                    'message': "Data successfully updated",
                    'body': data
                }
                resolve(responseData);
            })
        });
    })
}

module.exports.fetchDrawData = (filterCondition) =>
{
    return new Promise((resolve, reject) =>
    {
        knex('draw_charter_management AS dcm')
            .select('dcm.*','um.username as ownerName', 'umc.username as chartererName', 'cb.username as brokerName', 'ct.cityName')
            .join('users_management AS um', 'um.id', '=', 'dcm.ownerId')
            .join('users_management AS umc', 'umc.id', '=', 'dcm.chartererId')
            .join('users_management AS cb', 'cb.id', '=', 'dcm.createdBy')
            .leftJoin('city_management AS ct', 'ct.id', '=', 'dcm.cpCity')
            // .leftJoin('draw_status AS ds', 'ds.drawId', '=', 'dcm.id')

        .where(filterCondition).where({ 'dcm.isDelete' : 'N' }).orderBy('dcm.id', 'desc').then(async (data) =>
        {
            const responseData =
            {
                'success': true,
                'message': "Draw Form list",
                'data'   : data
            }
            resolve(responseData);
        })
    })
}

module.exports.fetchTradingData = (filterCondition) =>
{
    return new Promise((resolve, reject) =>
    {
        knex('trading_platform_management AS dcm')
            .select('dcm.*','um.username as ownerName', 'umc.username as chartererName', 'cb.username as brokerName', 'ct.cityName')
            .leftJoin('users_management AS um', 'um.id', '=', 'dcm.ownerId')
            .leftJoin('users_management AS umc', 'umc.id', '=', 'dcm.chartererId')
            .leftJoin('users_management AS cb', 'cb.id', '=', 'dcm.createdBy')
            .leftJoin('city_management AS ct', 'ct.id', '=', 'dcm.cpCity')

        .where(filterCondition).where({ 'dcm.isDelete' : 'N' }).orderBy('dcm.id', 'desc').then(async (data) =>
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

module.exports.tradingDataUpdate = (data) =>
{
    return new Promise((resolve, reject) =>
    {
        knex('trading_platform_management').where({'id':data.tradingId}).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (drawProgressUpdate) =>
        {
            return knex('trading_platform_management').update(
            {
                'cpTime':data.cpTime,
                'cpCity':data.cpCity,
                'cpDate':data.cpDate,
            }).where('id', data.tradingId).then((data) =>
            {
                const responseData = {
                    'success': true,
                    'message': "Data successfully updated",
                    'body': data
                }
                resolve(responseData);
            })
        });
    })
}

module.exports.fetchCompanyData = (filterCondition) =>
{
    return new Promise((resolve, reject) =>
    {
        knex('company_management').where(filterCondition).where({ 'isDelete' : 'N' }).orderBy('id', 'desc').then(async (data) =>
        {
            const responseData =
            {
                'success': true,
                'message': "Company Data",
                'data'   : data
            }
            resolve(responseData);
        })
    })
}

module.exports.updateCheckedClauses = (data) =>
{
    return new Promise((resolve, reject) =>
    {
        knex('draw_charter_management').where({'id':data.drawId}).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (drawProgressUpdate) =>
        {
            return knex('draw_charter_management').update(
            {
                'checked_clauses':data.checked_clauses,
            }).where('id', data.drawId).then((data) =>
            {
                const responseData = {
                    'success': true,
                    'message': "Data successfully updated",
                    'body': data
                }
                resolve(responseData);
            })
        });
    })
}

module.exports.updateCheckedClausesTrading = (data) =>
{
    return new Promise((resolve, reject) =>
    {
        knex('trading_platform_management').where({'id':data.tradingId}).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (drawProgressUpdate) =>
        {
            return knex('trading_platform_management').update(
            {
                'checked_clauses':data.checked_clauses,
            }).where('id', data.tradingId).then((data) =>
            {
                const responseData = {
                    'success': true,
                    'message': "Data successfully updated",
                    'body': data
                }
                resolve(responseData);
            })
        });
    })
}

// Trading Data Custom Input Update
module.exports.customInputTradingDataUpdate = (data) =>
{
    return new Promise((resolve, reject) =>
    {
        knex('trading_platform_management').where({'id':data.tradingId}).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (drawProgressUpdate) =>
        {
            return knex('trading_platform_management').update(
            {
                'metricTonValue':data.metricTonValue,
                'customInput1':data.customInput1,
                'customInput2':data.customInput2,
            }).where('id', data.tradingId).then((data) =>
            {
                const responseData = {
                    'success': true,
                    'message': "Data successfully updated",
                    'body': data
                }
                resolve(responseData);
            })
        });
    })
}

// Company Records Server Side
module.exports.companyRecordsServerSide = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await knex('company_management')
            .where(filterCondition)
            .where({ 'isDelete' : 'N' }).orderBy('id', 'desc').then(async (data) =>
        {
            const responseData =
            {
                'success': true,
                'message': "Company Records Server Side",
                'data'   : data
            }
            resolve(responseData);
        })
    })
}

// Users Records Server Side
module.exports.userRecordsServerSide = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await knex('users_management')
            .where(filterCondition)
            .where({ 'isDelete' : 'N' }).orderBy('id', 'desc').then(async (data) =>
        {
            const responseData =
            {
                'success': true,
                'message': "Users Records Server Side",
                'data'   : data
            }
            resolve(responseData);
        })
    })
}

// Draw Data Update Common
module.exports.drawDataUpdateCommon = (updateData) =>
{
    return new Promise((resolve, reject) =>
    {
        return knex('draw_charter_management').update(updateData).where('id', updateData.id).then((data) =>
        {
            const responseData = {
                'success': true,
                'message': "Data successfully updated",
                'body': data
            }
            resolve(responseData);
        })
    })
}

// Draw Data Update Common
module.exports.drawDataUpdateCommonInfo = (updateData) =>
{
    return new Promise((resolve, reject) =>
    {
        return knex('draw_charter_management').update(updateData).where('id', updateData.drawId).then((data) =>
        {
            const responseData = {
                'success': true,
                'message': "Data successfully updated",
                'body': data
            }
            resolve(responseData);
        })
    })
}

// Trading Data Update Common
module.exports.tradingDataUpdateCommon = (updateData) =>
{
    return new Promise((resolve, reject) =>
    {
        return knex('trading_platform_management').update(updateData).where('id', updateData.tradingId).then((data) =>
        {
            const responseData = {
                'success': true,
                'message': "Data successfully updated",
                'body': data
            }
            resolve(responseData);
        })
    })
}

// Send Notification To Charterer
module.exports.sendNotificationToCharterer = (updateData) =>
{
    return new Promise((resolve, reject) =>
    {
        return knex('draw_notification').insert(
        {
            
            fromUserId: updateData.fromUserId,
            toUserId: updateData.toUserId,
            notification: updateData.notification,
            createdBy: updateData.createdBy,
            createdAt: new Date(),
            updatedBy: updateData.updatedBy,
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
                to: updateData.emailID,
                subject: 'New Draw C/p notification  ',
                text: updateData.notification,
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
    })
}

// Send Notification To Charterer
module.exports.sendNotificationToChartererTrading = (updateData) =>
{
    return new Promise((resolve, reject) =>
    {
        return knex('draw_notification').insert(
        {
            
            fromUserId: updateData.fromUserId,
            toUserId: updateData.toUserId,
            notification: updateData.notification,
            createdBy: updateData.createdBy,
            createdAt: new Date(),
            updatedBy: updateData.updatedBy,
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
                to: updateData.emailID,
                subject: 'New Draw C/p notification  ',
                text: updateData.notification,
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
    })
}

// Update Charterer To Trade
module.exports.updateChartererToTrade = (updateData) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await knex('trading_status').insert(
        {   
            tradingId: updateData.tradingId,
            chartererId: updateData.chartererId,
            createdBy: updateData.createdBy,
            createdAt: new Date(),
            updatedBy: updateData.updatedBy,
            updatedAt: new Date(),
            isActive: "Y",
            isDelete: "N",
        }).then( async (result) =>
        {
            await knex('trading_platform_management').update(
            {
                chartererId: updateData.chartererId,
                updatedAt: updateData.updatedAt,
                updatedBy: updateData.updatedBy
            }).where('id', updateData.tradingId).then((updatedData) => {})

            await knex('draw_notification').insert(
            {   
                fromUserId: updateData.createdBy,
                toUserId: updateData.chartererId,
                notification: 'You are invited for new trade',
                createdBy: updateData.createdBy,
                createdAt: new Date(),
                updatedBy: updateData.updatedBy,
                updatedAt: new Date(),
                isActive: "Y",
                isDelete: "N",
            }).then( async (result) =>
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
                    to: updateData.email,
                    subject: 'New Trade notification  ',
                    text: 'You are invited for new trade',
                };
                
                transporter.sendMail(mailOptions, function(error, info)
                {
                    if (error)
                    {
                        console.log(error);
                    } else 
                    {
                        const emailData =
                        {
                            'success': true,
                            'message': ' Email send successfully .',
                            'data': info
                        }
                        resolve(emailData)
                    }
                });
            });
        });
    })
}

// Update Owner To Trade
module.exports.updateOwnerToTrade = (updateData) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await knex('trading_status').insert(
        {   
            tradingId: updateData.tradingId,
            ownerId: updateData.ownerId,
            createdBy: updateData.createdBy,
            createdAt: new Date(),
            updatedBy: updateData.updatedBy,
            updatedAt: new Date(),
            isActive: "Y",
            isDelete: "N",
        }).then( async (result) =>
        {
            await knex('trading_platform_management').update(
            {
                ownerId: updateData.ownerId,
                updatedAt: updateData.updatedAt,
                updatedBy: updateData.updatedBy
            }).where('id', updateData.tradingId).then((updatedData) => {})

            await knex('draw_notification').insert(
            {   
                fromUserId: updateData.createdBy,
                toUserId: updateData.ownerId,
                notification: 'You are invited for new trade',
                createdBy: updateData.createdBy,
                createdAt: new Date(),
                updatedBy: updateData.updatedBy,
                updatedAt: new Date(),
                isActive: "Y",
                isDelete: "N",
            }).then( async (result) =>
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
                    to: updateData.email,
                    subject: 'New Trade notification  ',
                    text: 'You are invited for new trade',
                };
                
                transporter.sendMail(mailOptions, function(error, info)
                {
                    if (error)
                    {
                        console.log(error);
                    } else 
                    {
                        const emailData =
                        {
                            'success': true,
                            'message': ' Email send successfully .',
                            'data': info
                        }
                        resolve(emailData)
                    }
                });
            });
        });
    })
}

// Update Charterer To Draw
module.exports.updateChartererToDraw = (updateData) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await knex('draw_status').insert(
        {   
            drawId: updateData.drawId,
            chartererId: updateData.chartererId,
            createdBy: updateData.createdBy,
            createdAt: new Date(),
            updatedBy: updateData.updatedBy,
            updatedAt: new Date(),
            isActive: "Y",
            isDelete: "N",
        }).then( async (result) =>
        {
            await knex('draw_charter_management').update(
            {
                chartererId: updateData.chartererId,
                updatedAt: updateData.updatedAt,
                updatedBy: updateData.updatedBy
            }).where('id', updateData.drawId).then((updatedData) => {})

            await knex('draw_notification').insert(
            {   
                fromUserId: updateData.createdBy,
                toUserId: updateData.chartererId,
                notification: 'You are invited for new trade',
                createdBy: updateData.createdBy,
                createdAt: new Date(),
                updatedBy: updateData.updatedBy,
                updatedAt: new Date(),
                isActive: "Y",
                isDelete: "N",
            }).then( async (result) =>
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
                    to: updateData.email,
                    subject: 'New Trade notification  ',
                    text: 'You are invited for new trade',
                };
                
                transporter.sendMail(mailOptions, function(error, info)
                {
                    if (error)
                    {
                        console.log(error);
                    } else 
                    {
                        const emailData =
                        {
                            'success': true,
                            'message': ' Email send successfully .',
                            'data': info
                        }
                        resolve(emailData)
                    }
                });
            });
        });
    })
}

module.exports.drawMessageInsert = (data) =>
{
    return new Promise((resolve, reject) =>
    {
        return knex('draw_messages').insert(
        {
            drawId: data.drawId,
            message: data.message,
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
                "message": "Draw Message Created Successfully",
                "data" : result,
            }
            resolve(responseData)
        })        
    })
}

module.exports.drawNotificationInsert = (data) =>
{
    return new Promise((resolve, reject) =>
    {
        return knex('draw_notification').insert(
        {
            fromUserId: data.fromUserId,
            toUserId: data.toUserId,
            notification: data.message,
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
                "message": "Draw Notification Created Successfully",
                "data" : result,
            }
            resolve(responseData)
        })        
    })
}
