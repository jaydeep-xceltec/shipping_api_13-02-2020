// Clause Category Terms Management
const knex = require('knex')(require('../knexfile'))
var moment = require('moment');
// Clause Category Terms

const express = require('express')
const multer = require('multer');
var date = new Date();
var myDate = moment(date).format('llll');
var fs = require('fs');

module.exports.claueseDetailcreate = (data) => {
    var typename = data.termsName;
    var parentId = data.parentId;
    // var nos = data.nos;
    console.log(data);
    
    return new Promise((resolve, reject) => {
        knex('clauses_term_details').where({ termsName: typename }).where({ parentId: parentId }).then((rdata) => {
            if (rdata.length > 0) {
                const responseData =
                {
                    'success': false,
                    "message": "Clause Category Terms Already Exists"
                }
                resolve(responseData)
            } else {
                return knex('clauses_term_details').insert(
                    {
                        parentId: data.parentId,
                        termsName: data.termsName,
                        createdBy: data.createdBy,
                        createdAt: new Date(),
                        updatedBy: data.updatedBy,
                        updatedAt: new Date(),
                        isActive: "Y",
                        isDelete: "N",
                    }).then((result) => {
                        const responseData =
                        {
                            'success': true,
                            "message": "Clause Category Terms Created Successfully"
                        }
                        resolve(responseData)
                    })
            }
        })
    })
}
// Clause Category Terms Records
module.exports.claueseDetaillist = () => {
    return new Promise(async (resolve, reject) => {
        await
            knex('clauses_term_details AS ctd')
                .select('ctd.*', 'ccm.name as clauseCategoryName', 'ccm.cpFormId as cpFormId', 'cfm.cpformName as cpFormName')
                .join('clauses_category_management AS ccm', 'ccm.id', '=', 'ctd.parentId')
                .join('cp_form_management AS cfm', 'cfm.id', '=', 'ccm.cpFormId')
                .where({ 'ctd.isDelete': 'N' }).orderBy('ctd.id', 'desc').then(async (data) => {
                    var arr = []
                    if (data.length > 0) {
                        for (dat of data) {
                            var createdat = await dat.createdAt;
                            var datetime = await moment(createdat).format('lll');
                            var dateobject =
                            {
                                'id': dat.id,
                                'parentId': dat.parentId,
                                // 'nos': dat.nos,
                                'termsName': dat.termsName,
                                'cpFormName': dat.cpFormName,
                                'createdAt': dat.createdAt,
                                'createdBy': dat.createdBy,
                                'updatedAt': dat.updatedAt,
                                'updatedBy': dat.updatedBy,
                                'isActive': dat.isActive,
                                'isDelete': dat.isDelete,
                                'clauseCategoryName': dat.clauseCategoryName,
                                'cpFormId': dat.cpFormId,
                            }
                            arr.push(dateobject)
                        }
                        const responseData =
                        {
                            'success': true,
                            'message': "Clause Category Terms Records",
                            'data': arr
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
// Clause Category Terms Update
module.exports.claueseDetailupdate = (data) => {
    var id = data.id;
    var isValid = 0;
    return new Promise((resolve, reject) => {
        knex('clauses_term_details').where({ parentId: data.parentId }).where({ termsName: data.termsName }).then((rdata) => {
            if (rdata.length > 0) {
                if (rdata[0].id == data.id) {
                    return knex('clauses_term_details').update(
                        {
                            parentId: data.parentId,
                        
                            termsName: data.termsName,
                            updatedAt: new Date(),
                            updatedBy: data.updatedBy,
                        }).where('id', id).then((data) => {
                            if (data) {
                                const responseData =
                                {
                                    'success': true,
                                    'message': "Record Successfully Updated",
                                    'body': data
                                }
                                resolve(responseData);
                            }
                        })
                } else {
                    const responseData =
                    {
                        'success': false,
                        'message': "Clause Category Terms Already Exists"
                    }
                    resolve(responseData);
                }
            } else {
                return knex('clauses_term_details').update(
                    {
                        parentId: data.parentId,
                        termsName: data.termsName,
                        updatedAt: new Date(),
                        updatedBy: data.updatedBy,
                    }).where('id', id).then((data) => {
                        if (data) {
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
// Clause Category Terms Remove 
module.exports.claueseDetaildelete = (data) => {
    var id = data.id;
    return new Promise((resolve, reject) => {
        return knex('clauses_term_details').update({ isDelete: 'Y' }).where('id', id).then(async (data) => {
            if (data) {
                await knex('draw_charter_management').update({ isDelete: 'Y' }).where({ id: id }).then((rdata) => {
                    if (rdata) {
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
// Clause Category Terms Records Server Side
module.exports.clauseTermsDetailsRecordsServerSide = (filterCondition) => {
    return new Promise(async (resolve, reject) => {
        await knex('clauses_term_details').where(filterCondition).where({ isDelete: 'N' }).orderBy('nos', 'asc').then(async (data) => {
            var arr = []
            if (data.length > 0) {
                for (dat of data) {
                    var createdat = await dat.createdAt;
                    var datetime = await moment(createdat).format('lll');
                    var dateobject =
                    {
                        'id': dat.id,
                        'parentId': dat.parentId,
                        'nos': dat.nos,
                        'termsName': dat.termsName,
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
                    'message': "Clause Category Terms Records Server Side",
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
// Clause Category Terms Reviews Records Server Side
module.exports.clauseTermsReviewsRecordsServerSideOLD = (filterCondition) => {
    return new Promise(async (resolve, reject) => {
        await

            knex('charter_clauses_amendment_management AS ccam')

                .select(

                    'ccam.*',
                    'cm.companyName as companyName',
                    'cfm.cpformName as cpformName',
                    'ccm.name as clauseCategoryName',
                    'ctd.termsName as originalTermsName',
                    'um.username as userName',
                )

                .join('company_management AS cm', 'cm.id', '=', 'ccam.companyId')
                .join('cp_form_management AS cfm', 'cfm.id', '=', 'ccam.formId')
                .join('clauses_category_management AS ccm', 'ccm.id', '=', 'ccam.parentId')
                .join('clauses_term_details AS ctd', 'ctd.id', '=', 'ccam.clauseId')
                .join('charter_clauses_amendment_counter_management AS ccacm', 'ccacm.id', '=', 'ccam.counterId')
                .join('charter_clauses_amendment_counter_management AS ccacm', 'ccacm.id', '=', 'ccam.counterId')

                .join('users_management AS um', 'um.id', '=', 'ccam.updatedBy')

                .where(filterCondition).where({ 'ccam.isDelete': 'N' }).orderBy('ccam.nos', 'asc').then(async (data) => {
                    var arr = []
                    if (data.length > 0) {
                        for (dat of data) {
                            var createdat = await dat.createdAt;
                            var datetime = await moment(createdat).format('lll');

                            var updatedDateInfo = await moment(dat.updatedAt).format('YYYY-MM-DD');

                            var dateobject =
                            {
                                'id': dat.id,

                                'counterId': dat.counterId,
                                'companyId': dat.companyId,
                                'formId': dat.formId,
                                'parentId': dat.parentId,
                                'clauseId': dat.clauseId,
                                'nos': dat.nos,
                                'termsName': dat.termsName,
                                'drawCharterId': dat.drawCharterId,
                                'status': dat.status,

                                'userName': dat.userName,

                                'companyName': dat.companyName,
                                'cpformName': dat.cpformName,
                                'clauseCategoryName': dat.clauseCategoryName,
                                'originalTermsName': dat.originalTermsName,

                                'createdAt': dat.createdAt,
                                'createdBy': dat.createdBy,
                                'updatedAt': dat.updatedAt,
                                'updatedDateInfo': updatedDateInfo,
                                'updatedBy': dat.updatedBy,
                                'isActive': dat.isActive,
                                'isDelete': dat.isDelete
                            }
                            arr.push(dateobject)
                        }
                        const responseData =
                        {
                            'success': true,
                            'message': "Clause Cateogry Terms Reviews Records Server Side",
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
// Clause Category Terms Status Update
module.exports.clauseTermsStatusUpdate = (data) => {
    var id = data.id;
    return new Promise((resolve, reject) => {
        return knex('clauses_term_details').update(
            {
                'isActive': data.isActive,
                'updatedBy': data.updatedBy,
                'updatedAt': new Date()
            }).where('id', id).then((data) => {
                if (data) {
                    const responseData =
                    {
                        'success': true,
                        'message': "Status Updated Successfully",
                        'body': data
                    }
                    resolve(responseData);
                }
            })
    })
}

// Clause Terms Modification Insert / Update
module.exports.claueseDetailInsertUpdate = (data) => {
    console.log(data);
    return new Promise((resolve, reject) => {
        return knex('terms_update').insert(
            {
                mainUserId: data.mainUserId,
                companyId: data.companyId,
                drawId: data.drawId,
                tradingId: data.tradingId,
                formId: data.formId,
                clauseCategoryId: data.clauseCategoryId,
                clauseTermsId: data.clauseTermsId,
                nos: data.nos,
                termsNameOrginal: data.termsNameOrginal,
                termsName: data.termsName,
                createdBy: data.createdBy,
                createdAt: new Date(),
                updatedBy: data.updatedBy,
                updatedAt: new Date(),
                isActive: "Y",
                isDelete: "N",
            }).then((result) => {
                const responseData =
                {
                    'success': true,
                    'message': "Record Updated Successfully",
                }
                resolve(responseData);
            })
    })
}




module.exports.GetTerms = () =>
{
    return new Promise(async (resolve, reject) =>
    {
        await 
        
            knex('terms_update')
                .select('terms_update.*')
                .orderBy('id', 'desc').limit(1).then(async (data) =>
                {
                    var arr = []
                    if (data.length > 0)
                    {
                
                        for (dat of data)
                        {
                            var dateobject =
                            {
                                id: dat.id,
                                mainUserId: dat.mainUserId,
                                companyId: dat.companyId,
                                drawId: dat.drawId,
                                tradingId: dat.tradingId,
                                formId: dat.formId,
                                clauseCategoryId: dat.clauseCategoryId,
                                clauseTermsId: dat.clauseTermsId,
                                nos: dat.nos,
                                termsNameOrginal: dat.termsNameOrginal,
                                termsName: dat.termsName,
                                createdBy: dat.createdBy,
                                createdAt: new Date(),
                                updatedBy: dat.updatedBy,
                                updatedAt: new Date(),
                                isActive: "Y",
                                isDelete: "N",
                            }
                            arr.push(dateobject)
                        }
                       // console.log(arr)
                        const responseData =
                        {
                            'success': true,
                            'message': " Clause Terms Records",
                            'data'   : arr
                        }
                        resolve(responseData);
                       // console.log(responseData);
                    } else {
                        const responseData =
                        {
                            'success': false,
                            'message': "Data not found"
                        }
                        resolve(responseData);
                       // console.log(responseData);
                    }
                })
    })
}
    
// Clause Custom Terms Modification Insert / Update
module.exports.claueseDetailCustomInsertUpdate = (data) => {
    return new Promise((resolve, reject) => {
        knex('terms_update')
            .where({ 'id': data.id })
            .then(async (updateData) => {
                if (updateData.length > 0) {
                    return knex('terms_update').update(
                        {
                            mainUserId: data.mainUserId,
                            companyId: data.companyId,
                            drawId: data.drawId,
                            tradingId: data.tradingId,
                            formId: data.formId,
                            clauseCategoryId: data.clauseCategoryId,
                            termsName: data.termsName,
                            isCustom: 'Y',
                            updatedBy: data.updatedBy,
                            updatedAt: new Date(),
                        }).where('id', updateData[0].id).then((data) => {
                            if (data) {
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
                    return knex('terms_update').insert(
                        {
                            mainUserId: data.mainUserId,
                            companyId: data.companyId,
                            drawId: data.drawId,
                            tradingId: data.tradingId,
                            formId: data.formId,
                            clauseCategoryId: data.clauseCategoryId,
                            termsName: data.termsName,
                            isCustom: 'Y',
                            createdBy: data.createdBy,
                            createdAt: new Date(),
                            updatedBy: data.updatedBy,
                            updatedAt: new Date(),
                            isActive: "Y",
                            isDelete: "N",
                        }).then((result) => {
                            const responseData =
                            {
                                'success': true,
                                "message": "Record Updated Successfully"
                            }
                            resolve(responseData)
                        })
                }
            });

    })
}

// Clause Category Terms Reviews Records Server Side
module.exports.clauseTermsReviewsRecordsServerSide = (filterCondition) => {
    return new Promise(async (resolve, reject) => {
        await

            knex('terms_update AS tu')

                .select(

                    'tu.*',
                    'mainUser.username as mainUserName',
                    'cm.companyName as companyName',
                    'cfm.cpformName as cpformName',
                    'ccm.name as clauseCategoryName',
                    'ctd.termsName as originalTermsName',
                    'um.username as userName',
                )

                .join('users_management AS mainUser', 'mainUser.id', '=', 'tu.mainUserId')
                .join('company_management AS cm', 'cm.id', '=', 'tu.companyId')
                .join('cp_form_management AS cfm', 'cfm.id', '=', 'tu.formId')
                .join('clauses_category_management AS ccm', 'ccm.id', '=', 'tu.clauseCategoryId')
                .join('clauses_term_details AS ctd', 'ctd.id', '=', 'tu.clauseTermsId')

                .join('users_management AS um', 'um.id', '=', 'tu.updatedBy')

                .where(filterCondition).where({ 'tu.isDelete': 'N' }).orderBy('tu.nos', 'asc').then(async (data) => {
                    var arr = []
                    if (data.length > 0) {
                        for (dat of data) {
                            var createdat = await dat.createdAt;
                            var datetime = await moment(createdat).format('lll');

                            var updatedDateInfo = await moment(dat.updatedAt).format('YYYY-MM-DD');

                            var dateobject =
                            {
                                'id': dat.id,

                                'mainUserId': dat.mainUserId,
                                'companyId': dat.companyId,
                                'drawId': dat.drawId,
                                'tradingId': dat.tradingId,
                                'formId': dat.formId,
                                'clauseCategoryId': dat.clauseCategoryId,
                                'clauseTermsId': dat.clauseTermsId,
                                'nos': dat.nos,
                                'termsNameOrginal': dat.termsNameOrginal,
                                'termsName': dat.termsName,
                                'status': dat.status,

                                'userName': dat.userName,

                                'companyName': dat.companyName,
                                'cpformName': dat.cpformName,
                                'clauseCategoryName': dat.clauseCategoryName,
                                'originalTermsName': dat.originalTermsName,

                                'createdAt': dat.createdAt,
                                'createdBy': dat.createdBy,
                                'updatedAt': dat.updatedAt,
                                'updatedDateInfo': updatedDateInfo,
                                'updatedBy': dat.updatedBy,
                                'isActive': dat.isActive,
                                'isDelete': dat.isDelete
                            }
                            arr.push(dateobject)
                        }
                        const responseData =
                        {
                            'success': true,
                            'message': "Clause Cateogry Terms Reviews Records Server Side",
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

// Clause Category Terms Reviews Records Server Side Custom
module.exports.clauseTermsReviewsRecordsServerSideCustom = (filterCondition) => {
    return new Promise(async (resolve, reject) => {
        await

            knex('terms_update AS tu')

                .select(

                    'tu.*',
                    'mainUser.username as mainUserName',
                    'cm.companyName as companyName',
                    'cfm.cpformName as cpformName',
                    'ccm.name as clauseCategoryName',
                    'um.username as userName',
                )

                .join('users_management AS mainUser', 'mainUser.id', '=', 'tu.mainUserId')
                .join('company_management AS cm', 'cm.id', '=', 'tu.companyId')
                .join('cp_form_management AS cfm', 'cfm.id', '=', 'tu.formId')
                .join('clauses_category_management AS ccm', 'ccm.id', '=', 'tu.clauseCategoryId')

                .join('users_management AS um', 'um.id', '=', 'tu.updatedBy')

                .where(filterCondition).where({ 'tu.isDelete': 'N' }).orderBy('tu.nos', 'asc').then(async (data) => {
                    var arr = []
                    if (data.length > 0) {
                        for (dat of data) {
                            var createdat = await dat.createdAt;
                            var datetime = await moment(createdat).format('lll');

                            var updatedDateInfo = await moment(dat.updatedAt).format('YYYY-MM-DD');

                            var dateobject =
                            {
                                'id': dat.id,

                                'mainUserId': dat.mainUserId,
                                'companyId': dat.companyId,
                                'tradingId': dat.tradingId,
                                'drawId': dat.drawId,
                                'formId': dat.formId,
                                'clauseCategoryId': dat.clauseCategoryId,
                                'clauseTermsId': dat.clauseTermsId,
                                'nos': dat.nos,
                                'termsNameOrginal': dat.termsNameOrginal,
                                'termsName': dat.termsName,
                                'status': dat.status,

                                'userName': dat.userName,

                                'companyName': dat.companyName,
                                'cpformName': dat.cpformName,
                                'clauseCategoryName': dat.clauseCategoryName,

                                'createdAt': dat.createdAt,
                                'createdBy': dat.createdBy,
                                'updatedAt': dat.updatedAt,
                                'updatedDateInfo': updatedDateInfo,
                                'updatedBy': dat.updatedBy,
                                'isActive': dat.isActive,
                                'isDelete': dat.isDelete
                            }
                            arr.push(dateobject)
                        }
                        const responseData =
                        {
                            'success': true,
                            'message': "Clause Cateogry Terms Reviews Records Server Side",
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

// Clause Category Records Server Side
module.exports.clauseCategoryRecordsServerSide = (filterCondition) => {
    var clauseCategoryCondition = {};
    clauseCategoryCondition['cpFormId'] = filterCondition.cpFormId;

    

    var checkedClauseCategory = (filterCondition.checkedClauseCategory) ? filterCondition.checkedClauseCategory : [];

    //console.log(checkedClauseCategory);

    return new Promise(async (resolve, reject) => {
        await knex('clauses_category_management').where(clauseCategoryCondition).where({ isDelete: 'N' }).orderBy('id', 'asc').then(async (data) => {
            var index = 0;
            var mainData = data;
            for (clauseCategoryData of data) {
                var clauseCategoryID = Number(clauseCategoryData.id);
                console.log('CATEGORYID',clauseCategoryID);
                var isAvailabel = checkedClauseCategory.indexOf(clauseCategoryID);
                var isChecked = (isAvailabel == '-1') ? 'N' : 'Y';
                console.log(isChecked);
                mainData[index]['isChecked'] = isChecked;
                index = index + 1;
            }
            const responseData =
            {
                'success': true,
                'message': "Clause Category Records",
                'data': mainData
            }
            resolve(responseData);
        })
    })
}

// Clause Category Records Server Side
module.exports.clauseCategoryRecordsServerSideTrading = (filterCondition) => {
    var clauseCategoryCondition = {};
    clauseCategoryCondition['cpFormId'] = filterCondition.cpFormId;

    console.log(clauseCategoryCondition);

    var checkedClauseCategory = (filterCondition.checkedClauseCategory) ? filterCondition.checkedClauseCategory : [];

    console.log(checkedClauseCategory);

    return new Promise(async (resolve, reject) => {
        await knex('clauses_category_management').where(clauseCategoryCondition).where({ isDelete: 'N' }).orderBy('id', 'asc').then(async (data) => {
            var index = 0;
            var mainData = data;
            for (clauseCategoryData of data) {
                var clauseCategoryID = Number(clauseCategoryData.id);
                console.log(clauseCategoryID);
                var isAvailabel = checkedClauseCategory.indexOf(clauseCategoryID);
                var isChecked = (isAvailabel == '-1') ? 'N' : 'Y';
                console.log(isChecked);
                mainData[index]['isChecked'] = isChecked;
                index = index + 1;
            }
            const responseData =
            {
                'success': true,
                'message': "Clause Category Records",
                'data': mainData
            }
            resolve(responseData);
        })
    })
}

// CP Form Data
module.exports.cpFormData = (filterCondition) => {
    var clauseCategoryCondition = {};
    clauseCategoryCondition['id'] = filterCondition.id;

    return new Promise(async (resolve, reject) => {
        await knex('cp_form_management').where(clauseCategoryCondition).where({ isDelete: 'N' }).orderBy('id', 'asc').then(async (data) => {
            const responseData =
            {
                'success': true,
                'message': "CP Form Data",
                'data': data
            }
            resolve(responseData);
        })
    })
}

// Fetch Vessel Data
module.exports.fetchVesselData = (filterCondition) => {
    var vesselDataCondition = {};
    vesselDataCondition['vm.id'] = filterCondition.id;

    return new Promise(async (resolve, reject) => {
        await knex('vessel_management AS vm')

            .select(
                'vm.*',
                'vf.vessel_flag_name as flageName',
            )
            .leftJoin('vessel_flag AS vf', 'vf.id', '=', 'vm.id_ship_flag')
            .where(vesselDataCondition).orderBy('vm.id', 'asc').then(async (data) => {
                const responseData =
                {
                    'success': true,
                    'message': "Vessel Data",
                    'data': data
                }
                resolve(responseData);
            })
    })
}

// Vessel Records Server Side
module.exports.vesselRecordsServerSide = (vesselDataCondition) => {
    return new Promise(async (resolve, reject) => {
        await knex('vessel_management AS vm')
            .select('vm.*', 'vf.vessel_flag_name as flageName')
            .leftJoin('vessel_flag AS vf', 'vf.id', '=', 'vm.id_ship_flag')
            .where(vesselDataCondition).orderBy('vm.id', 'asc').then(async (data) => {
                const responseData =
                {
                    'success': true,
                    'message': "Vessel Data",
                    'data': data
                }
                resolve(responseData);
            })
    })
}

// Main Clause Screen Array
module.exports.mainClauseScreenDataRecords = (filterCondition) => {
    var drawId = filterCondition.drawId;
    var cpFormId = filterCondition.cpFormId;
    var companyId = filterCondition.companyId;
    var commonClauses = filterCondition.commonClauses;
    var commonClausesCustomArray = filterCondition.commonClausesCustomArray;

    var checked_clauses = filterCondition.checked_clauses;

    console.log(checked_clauses);


    var clauseCategoryCondition = {};
    clauseCategoryCondition['cpFormId'] = cpFormId;

    return new Promise(async (resolve, reject) => {
        await knex('clauses_category_management').where(clauseCategoryCondition)
            .whereIn('id', checked_clauses).where({ 'isDelete': 'N' })
            .orderBy('id', 'asc').then(async (clauseCateoryManagementData) => {
                var mainData = [];
                var subMainData = [];
                var termsUpdateData = [];
                var index = 0;
                if (clauseCateoryManagementData.length > 0) {
                    mainData = clauseCateoryManagementData;

                    for (clauseCateoryManagementData of clauseCateoryManagementData) {
                        var termsUpdateDataCustom = [];
                        var clauseCategoryId = clauseCateoryManagementData.id;
                        mainData[index]['isChecked'] = 'N';
                        mainData[index]['clauseCategoryTermsUpdateCustom'] = [];
                        mainData[index]['clauseCategoryTerms'] = [];

                        var clauseTermsRecordsCondition = {};
                        clauseTermsRecordsCondition['parentId'] = clauseCategoryId;

                        await knex('clauses_term_details')
                            .where(clauseTermsRecordsCondition)
                            .where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (clauseCategoryTermsData) => {
                                var subIndex = 0;

                                if (clauseCategoryTermsData.length > 0) {
                                    subMainData = clauseCategoryTermsData;
                                    var isCheckedCount = 0;
                                    for (clauseCategoryTermsData of clauseCategoryTermsData) {
                                        var clauseCategoryTermsID = clauseCategoryTermsData.id;
                                        var isAvailabel = commonClauses.indexOf(clauseCategoryTermsID.toString());
                                        var isChecked = (isAvailabel == '-1') ? 'N' : 'Y';

                                        if (isChecked == 'Y') {
                                            isCheckedCount = isCheckedCount + 1;
                                        }

                                        subMainData[subIndex]['isChecked'] = isChecked;
                                        subMainData[subIndex]['mainTermRecord'] = clauseCategoryTermsData.termsName;
                                        subMainData[subIndex]['crossTerm'] = '';

                                        subMainData[subIndex]['clauseCategoryTermsUpdate'] = [];

                                        var clauseTermsUpdateCondition = {};
                                        clauseTermsUpdateCondition["tu.companyId"] = companyId;
                                        clauseTermsUpdateCondition["tu.drawId"] = drawId;
                                        clauseTermsUpdateCondition["tu.formId"] = cpFormId;
                                        clauseTermsUpdateCondition["tu.clauseCategoryId"] = clauseCategoryId;
                                        clauseTermsUpdateCondition["tu.clauseTermsId"] = clauseCategoryTermsID;
                                        clauseTermsUpdateCondition["tu.isCustom"] = 'N';

                                        await knex('terms_update AS tu')
                                            .select(

                                                'tu.*',
                                                'mainUser.username as mainUserName',
                                            )

                                            .join('users_management AS mainUser', 'mainUser.id', '=', 'tu.mainUserId')

                                            .where(clauseTermsUpdateCondition)
                                            .where({ 'tu.isDelete': 'N' })
                                            .orderBy('tu.id', 'asc')
                                            .then(async (clauseCategoryTermsUpdateData) => {

                                                var length = clauseCategoryTermsUpdateData.length;
                                                length = length - 2;
                                                length = (length < 0) ? 0 : length;

                                                var termsUpdateIndex = 0;
                                                if (clauseCategoryTermsUpdateData.length > 0) {
                                                    subMainData[subIndex]['crossTerm'] = clauseCategoryTermsData.termsName;
                                                    for (clauseCategoryTermsUpdateData of clauseCategoryTermsUpdateData) {
                                                        if (termsUpdateIndex == length) {
                                                            subMainData[subIndex]['crossTerm'] = clauseCategoryTermsUpdateData.termsName;
                                                            console.log(termsUpdateIndex);
                                                            console.log(clauseCategoryTermsUpdateData.termsName);
                                                        }

                                                        subMainData[subIndex]['mainTermRecord'] = clauseCategoryTermsUpdateData.termsName;
                                                        termsUpdateData[termsUpdateIndex] = clauseCategoryTermsUpdateData;
                                                        termsUpdateData[termsUpdateIndex]['updateDateTime'] = await moment(clauseCategoryTermsUpdateData.updatedAt).format('YYYY-MM-DD');
                                                        termsUpdateIndex = termsUpdateIndex + 1;

                                                    }

                                                    subMainData[subIndex]['clauseCategoryTermsUpdate'] = termsUpdateData;
                                                }
                                            });

                                        if (subMainData[subIndex]['crossTerm'] == subMainData[subIndex]['mainTermRecord']) {
                                            subMainData[subIndex]['crossTerm'] = clauseCategoryTermsData.termsName;
                                        }

                                        subIndex = subIndex + 1;

                                    }
                                    var isCheckedMain = (isCheckedCount > 0) ? 'Y' : 'N';
                                    mainData[index]['isChecked'] = isCheckedMain;
                                }

                                mainData[index]['clauseCategoryTerms'] = subMainData;
                            });

                        var clauseTermsUpdateConditionCustom = {};
                        clauseTermsUpdateConditionCustom["companyId"] = companyId;
                        clauseTermsUpdateConditionCustom["drawId"] = drawId;
                        clauseTermsUpdateConditionCustom["formId"] = cpFormId;
                        clauseTermsUpdateConditionCustom["clauseCategoryId"] = clauseCategoryId;
                        clauseTermsUpdateConditionCustom["isCustom"] = 'Y';

                        await knex('terms_update').where(clauseTermsUpdateConditionCustom).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (clauseCategoryTermsUpdateCustomData) => {
                            console.log(clauseTermsUpdateConditionCustom, "Custom Main Clause Category Data");
                            var termsUpdateIndexCustom = 0;
                            termsUpdateDataCustom[termsUpdateIndexCustom] = [];
                            if (clauseCategoryTermsUpdateCustomData.length > 0) {
                                for (clauseCategoryTermsUpdateCustomData of clauseCategoryTermsUpdateCustomData) {
                                    termsUpdateDataCustom[termsUpdateIndexCustom] = clauseCategoryTermsUpdateCustomData;
                                    termsUpdateDataCustom[termsUpdateIndexCustom]['mainTermRecordCustom'] = clauseCategoryTermsUpdateCustomData.termsName;
                                    termsUpdateDataCustom[termsUpdateIndexCustom]['crossTermCustom'] = '';
                                    termsUpdateDataCustom[termsUpdateIndexCustom]['updateDateTime'] = await moment(clauseCategoryTermsUpdateCustomData.updatedAt).format('YYYY-MM-DD');

                                    var customTermsOfMainClauseID = clauseCategoryTermsUpdateCustomData.id;

                                    var isAvailabel = commonClausesCustomArray.indexOf(customTermsOfMainClauseID.toString());
                                    var isChecked = (isAvailabel == '-1') ? 'N' : 'Y';

                                    termsUpdateDataCustom[termsUpdateIndexCustom]['isChecked'] = isChecked;

                                    var clauseTermsUpdateCustomConditionCustom = {};
                                    clauseTermsUpdateCustomConditionCustom["parentId"] = clauseCategoryTermsUpdateCustomData.id;

                                    await knex('terms_update')
                                        .where(clauseTermsUpdateCustomConditionCustom)
                                        .where({ 'isDelete': 'N' })
                                        .orderBy('id', 'asc').
                                        then(async (clauseCategoryTermsUpdateCustomDataCustom) => {
                                            var length = clauseCategoryTermsUpdateCustomDataCustom.length;
                                            length = length - 2;
                                            length = (length < 0) ? 0 : length;

                                            if (clauseCategoryTermsUpdateCustomDataCustom.length > 0) {
                                                termsUpdateDataCustom[termsUpdateIndexCustom]['crossTermCustom'] = clauseCategoryTermsUpdateCustomData.termsName;

                                                var indexOfCustom = 0;

                                                for (clauseCategoryTermsUpdateCustomDataCustom of clauseCategoryTermsUpdateCustomDataCustom) {
                                                    if (indexOfCustom == length) {
                                                        termsUpdateDataCustom[termsUpdateIndexCustom]['crossTermCustom'] = clauseCategoryTermsUpdateCustomDataCustom.termsName;
                                                    }
                                                    termsUpdateDataCustom[termsUpdateIndexCustom]['mainTermRecordCustom'] =
                                                        clauseCategoryTermsUpdateCustomDataCustom.termsName;

                                                    indexOfCustom = indexOfCustom + 1;
                                                }
                                                // termsUpdateDataCustom[termsUpdateIndexCustom]['crossTermCustom'] = clauseCategoryTermsUpdateCustomDataCustom[length].termsName;
                                            }
                                        })

                                    if (termsUpdateDataCustom[termsUpdateIndexCustom]['crossTermCustom'] == termsUpdateDataCustom[termsUpdateIndexCustom]['mainTermRecordCustom']) {
                                        termsUpdateDataCustom[termsUpdateIndexCustom]['crossTermCustom'] = clauseCategoryTermsData.termsName;
                                    }

                                    termsUpdateIndexCustom = termsUpdateIndexCustom + 1;
                                }
                                console.log(termsUpdateDataCustom);
                                mainData[index]['clauseCategoryTermsUpdateCustom'] = termsUpdateDataCustom;
                            }
                        });
                        index = index + 1;
                    }
                    const responseData =
                    {
                        'success': true,
                        'message': "Main Data Records",
                        'data': mainData
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

// Main Clause Screen Array
module.exports.mainClauseScreenDataRecordsTrading = (filterCondition) => {
    var tradingId = filterCondition.tradingId;
    var cpFormId = filterCondition.cpFormId;
    var companyId = filterCondition.companyId;
    var commonClauses = filterCondition.commonClauses;
    var commonClausesCustomArray = filterCondition.commonClausesCustomArray;
    var checked_clauses = filterCondition.checked_clauses;

    var mainTermCheckedClauses = (filterCondition.mainTermCheckedClauses != '' && filterCondition.mainTermCheckedClauses != null && filterCondition.mainTermCheckedClauses != undefined) ? filterCondition.mainTermCheckedClauses : [];
    var mainTermCheckedClausesCustom = (filterCondition.mainTermCheckedClausesCustom != '' && filterCondition.mainTermCheckedClausesCustom != null && filterCondition.mainTermCheckedClausesCustom != undefined) ? filterCondition.mainTermCheckedClausesCustom : [];
    var mainTermCheckedClausesCustomTerms = (filterCondition.mainTermCheckedClausesCustomTerms != '' && filterCondition.mainTermCheckedClausesCustomTerms != null && filterCondition.mainTermCheckedClausesCustomTerms != undefined) ? filterCondition.mainTermCheckedClausesCustomTerms : [];

    var commonClausesBrokerArray = (filterCondition.commonClausesBrokerArray != ''
        && filterCondition.commonClausesBrokerArray != null
        && filterCondition.commonClausesBrokerArray != undefined)
        ? filterCondition.commonClausesBrokerArray : [];

    var commonClausesCustomBrokerArray = (filterCondition.commonClausesCustomBrokerArray != ''
        && filterCondition.commonClausesCustomBrokerArray != null
        && filterCondition.commonClausesCustomBrokerArray != undefined)
        ? filterCondition.commonClausesCustomBrokerArray : [];

    var customClausesBrokerArray = (filterCondition.customClausesBrokerArray != ''
        && filterCondition.customClausesBrokerArray != null
        && filterCondition.customClausesBrokerArray != undefined)
        ? filterCondition.customClausesBrokerArray : [];

    var clauseCategoryCondition = {};
    clauseCategoryCondition['cpFormId'] = cpFormId;

    return new Promise(async (resolve, reject) => {
        await knex('clauses_category_management').whereIn('id', checked_clauses).where(clauseCategoryCondition).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (clauseCateoryManagementData) => {
            var mainData = [];
            var subMainData = [];
            var termsUpdateData = [];
            var index = 0;
            if (clauseCateoryManagementData.length > 0) {
                mainData = clauseCateoryManagementData;

                for (clauseCateoryManagementData of clauseCateoryManagementData) {
                    var termsUpdateDataCustom = [];
                    var clauseCategoryId = clauseCateoryManagementData.id;
                    mainData[index]['isChecked'] = 'N';
                    mainData[index]['clauseCategoryTermsUpdateCustom'] = [];
                    mainData[index]['clauseCategoryTerms'] = [];

                    mainData[index]['customClauseLength'] = 0;
                    mainData[index]['customClauseTermLength'] = 0;


                    var clauseTermsRecordsCondition = {};
                    clauseTermsRecordsCondition['parentId'] = clauseCategoryId;

                    await knex('clauses_term_details').whereNotIn('id', commonClausesBrokerArray).where(clauseTermsRecordsCondition).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (clauseCategoryTermsData) => {
                        mainData[index]['customClauseLength'] = clauseCategoryTermsData.length;
                        var subIndex = 0;

                        if (clauseCategoryTermsData.length > 0) {
                            subMainData = clauseCategoryTermsData;
                            var isCheckedCount = 0;
                            for (clauseCategoryTermsData of clauseCategoryTermsData) {
                                var clauseCategoryTermsID = clauseCategoryTermsData.id;
                                var isAvailabel = commonClauses.indexOf(clauseCategoryTermsID.toString());
                                var isChecked = (isAvailabel == '-1') ? 'N' : 'Y';

                                var isApproved = mainTermCheckedClauses.indexOf(clauseCategoryTermsID.toString());
                                var isApprovedInfo = (isApproved == '-1') ? 'N' : 'Y';
                                subMainData[subIndex]['isApprovedInfo'] = isApprovedInfo;

                                if (isChecked == 'Y') {
                                    isCheckedCount = isCheckedCount + 1;
                                }

                                subMainData[subIndex]['isChecked'] = isChecked;
                                subMainData[subIndex]['mainTermRecord'] = clauseCategoryTermsData.termsName;
                                subMainData[subIndex]['crossTerm'] = '';

                                subMainData[subIndex]['clauseCategoryTermsUpdate'] = [];

                                var clauseTermsUpdateCondition = {};
                                clauseTermsUpdateCondition["tu.companyId"] = companyId;
                                clauseTermsUpdateCondition["tu.tradingId"] = tradingId;
                                clauseTermsUpdateCondition["tu.formId"] = cpFormId;
                                clauseTermsUpdateCondition["tu.clauseCategoryId"] = clauseCategoryId;
                                clauseTermsUpdateCondition["tu.clauseTermsId"] = clauseCategoryTermsID;
                                clauseTermsUpdateCondition["tu.isCustom"] = 'N';

                                await knex('terms_update AS tu')
                                    .select(

                                        'tu.*',
                                        'mainUser.username as mainUserName',
                                    )

                                    .join('users_management AS mainUser', 'mainUser.id', '=', 'tu.mainUserId')

                                    .where(clauseTermsUpdateCondition)
                                    .where({ 'tu.isDelete': 'N' })
                                    .orderBy('tu.id', 'asc')
                                    .then(async (clauseCategoryTermsUpdateData) => {
                                        var termsUpdateIndex = 0;

                                        var length = clauseCategoryTermsUpdateData.length;
                                        length = length - 2;
                                        length = (length < 0) ? 0 : length;

                                        if (clauseCategoryTermsUpdateData.length > 0) {
                                            subMainData[subIndex]['crossTerm'] = clauseCategoryTermsData.termsName;
                                            for (clauseCategoryTermsUpdateData of clauseCategoryTermsUpdateData) {


                                                if (termsUpdateIndex == length) {
                                                    subMainData[subIndex]['crossTerm'] = clauseCategoryTermsUpdateData.termsName;
                                                }
                                                subMainData[subIndex]['mainTermRecord'] = clauseCategoryTermsUpdateData.termsName;
                                                termsUpdateData[termsUpdateIndex] = clauseCategoryTermsUpdateData;
                                                termsUpdateData[termsUpdateIndex]['updateDateTime'] = await moment(clauseCategoryTermsUpdateData.updatedAt).format('YYYY-MM-DD');
                                                termsUpdateIndex = termsUpdateIndex + 1;
                                            }
                                            subMainData[subIndex]['clauseCategoryTermsUpdate'] = termsUpdateData;
                                        }
                                    });

                                if (subMainData[subIndex]['crossTerm'] == subMainData[subIndex]['mainTermRecord']) {
                                    subMainData[subIndex]['crossTerm'] = clauseCategoryTermsData.termsName;
                                }
                                subIndex = subIndex + 1;
                            }
                            var isCheckedMain = (isCheckedCount > 0) ? 'Y' : 'N';
                            mainData[index]['isChecked'] = isCheckedMain;
                        }

                        mainData[index]['clauseCategoryTerms'] = subMainData;
                    });

                    var clauseTermsUpdateConditionCustom = {};
                    clauseTermsUpdateConditionCustom["companyId"] = companyId;
                    clauseTermsUpdateConditionCustom["tradingId"] = tradingId;
                    clauseTermsUpdateConditionCustom["formId"] = cpFormId;
                    clauseTermsUpdateConditionCustom["clauseCategoryId"] = clauseCategoryId;
                    clauseTermsUpdateConditionCustom["isCustom"] = 'Y';

                    await knex('terms_update').whereNotIn('id', commonClausesCustomBrokerArray).where(clauseTermsUpdateConditionCustom).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (clauseCategoryTermsUpdateCustomData) => {
                        mainData[index]['customClauseTermLength'] = clauseCategoryTermsUpdateCustomData.length;
                        console.log(clauseTermsUpdateConditionCustom, "Custom Main Clause Category Data");
                        var termsUpdateIndexCustom = 0;
                        termsUpdateDataCustom[termsUpdateIndexCustom] = [];
                        if (clauseCategoryTermsUpdateCustomData.length > 0) {
                            for (clauseCategoryTermsUpdateCustomData of clauseCategoryTermsUpdateCustomData) {
                                
                                var clauseCategoryTermsID = clauseCategoryTermsUpdateCustomData.id;
                                var isApproved = mainTermCheckedClauses.indexOf(clauseCategoryTermsID.toString());
                                var isApprovedInfo = (isApproved == '-1') ? 'N' : 'Y';

                                termsUpdateDataCustom[termsUpdateIndexCustom] = clauseCategoryTermsUpdateCustomData;

                                termsUpdateDataCustom[termsUpdateIndexCustom]['isApprovedInfo'] = isApprovedInfo;

                                termsUpdateDataCustom[termsUpdateIndexCustom]['mainTermRecordCustom'] = clauseCategoryTermsUpdateCustomData.termsName;

                                termsUpdateDataCustom[termsUpdateIndexCustom]['crossTermCustom'] = '';

                                termsUpdateDataCustom[termsUpdateIndexCustom]['updateDateTime'] = await moment(clauseCategoryTermsUpdateCustomData.updatedAt).format('YYYY-MM-DD');

                                var customTermsOfMainClauseID = clauseCategoryTermsUpdateCustomData.id;

                                var isAvailabel = commonClausesCustomArray.indexOf(customTermsOfMainClauseID.toString());
                                var isChecked = (isAvailabel == '-1') ? 'N' : 'Y';

                                termsUpdateDataCustom[termsUpdateIndexCustom]['isChecked'] = isChecked;

                                var clauseTermsUpdateCustomConditionCustom = {};
                                clauseTermsUpdateCustomConditionCustom["parentId"] = clauseCategoryTermsUpdateCustomData.id;

                                await knex('terms_update')
                                    .where(clauseTermsUpdateCustomConditionCustom)
                                    .where({ 'isDelete': 'N' })
                                    .orderBy('id', 'asc').
                                    then(async (clauseCategoryTermsUpdateCustomDataCustom) => {
                                        var termsUpdateIndexCustomInfo = 0;

                                        var length = clauseCategoryTermsUpdateCustomDataCustom.length;
                                        length = length - 2;
                                        length = (length < 0) ? 0 : length;

                                        if (clauseCategoryTermsUpdateCustomDataCustom.length > 0) {
                                            termsUpdateDataCustom[termsUpdateIndexCustom]['crossTermCustom'] = clauseCategoryTermsUpdateCustomData.termsName;

                                            for (clauseCategoryTermsUpdateCustomDataCustom of clauseCategoryTermsUpdateCustomDataCustom) {

                                                if (termsUpdateIndexCustomInfo == length) {
                                                    termsUpdateDataCustom[termsUpdateIndexCustom]['crossTermCustom'] = clauseCategoryTermsUpdateCustomDataCustom.termsName;
                                                }

                                                termsUpdateDataCustom[termsUpdateIndexCustom]['mainTermRecordCustom'] =
                                                    clauseCategoryTermsUpdateCustomDataCustom.termsName;

                                                termsUpdateIndexCustomInfo = termsUpdateIndexCustomInfo + 1;
                                            }

                                        }
                                    })

                                termsUpdateIndexCustom = termsUpdateIndexCustom + 1;
                            }
                            console.log(termsUpdateDataCustom);
                            mainData[index]['clauseCategoryTermsUpdateCustom'] = termsUpdateDataCustom;
                        }
                    });
                    index = index + 1;
                }
                const responseData =
                {
                    'success': true,
                    'message': "Main Data Records",
                    'data': mainData
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

module.exports.mainClauseScreenDataRecordsTradingOLDBACKUP = (filterCondition) => {
    var tradingId = filterCondition.tradingId;
    var cpFormId = filterCondition.cpFormId;
    var companyId = filterCondition.companyId;
    var commonClauses = filterCondition.commonClauses;
    var commonClausesCustomArray = filterCondition.commonClausesCustomArray;
    var checked_clauses = filterCondition.checked_clauses;

    var mainTermCheckedClauses = (filterCondition.mainTermCheckedClauses != '' && filterCondition.mainTermCheckedClauses != null && filterCondition.mainTermCheckedClauses != undefined) ? filterCondition.mainTermCheckedClauses : [];
    var mainTermCheckedClausesCustom = (filterCondition.mainTermCheckedClausesCustom != '' && filterCondition.mainTermCheckedClausesCustom != null && filterCondition.mainTermCheckedClausesCustom != undefined) ? filterCondition.mainTermCheckedClausesCustom : [];
    var mainTermCheckedClausesCustomTerms = (filterCondition.mainTermCheckedClausesCustomTerms != '' && filterCondition.mainTermCheckedClausesCustomTerms != null && filterCondition.mainTermCheckedClausesCustomTerms != undefined) ? filterCondition.mainTermCheckedClausesCustomTerms : [];


    var clauseCategoryCondition = {};
    clauseCategoryCondition['cpFormId'] = cpFormId;

    return new Promise(async (resolve, reject) => {
        await knex('clauses_category_management').whereIn('id', checked_clauses).where(clauseCategoryCondition).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (clauseCateoryManagementData) => {
            var mainData = [];
            var subMainData = [];
            var termsUpdateData = [];
            var index = 0;
            if (clauseCateoryManagementData.length > 0) {
                mainData = clauseCateoryManagementData;

                for (clauseCateoryManagementData of clauseCateoryManagementData) {
                    var termsUpdateDataCustom = [];
                    var clauseCategoryId = clauseCateoryManagementData.id;
                    mainData[index]['isChecked'] = 'N';
                    mainData[index]['clauseCategoryTermsUpdateCustom'] = [];
                    mainData[index]['clauseCategoryTerms'] = [];

                    mainData[index]['customClauseLength'] = 0;
                    mainData[index]['customClauseTermLength'] = 0;


                    var clauseTermsRecordsCondition = {};
                    clauseTermsRecordsCondition['parentId'] = clauseCategoryId;

                    await knex('clauses_term_details').whereNotIn('id', mainTermCheckedClauses).where(clauseTermsRecordsCondition).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (clauseCategoryTermsData) => {
                        mainData[index]['customClauseLength'] = clauseCategoryTermsData.length;
                        var subIndex = 0;

                        if (clauseCategoryTermsData.length > 0) {
                            subMainData = clauseCategoryTermsData;
                            var isCheckedCount = 0;
                            for (clauseCategoryTermsData of clauseCategoryTermsData) {
                                var clauseCategoryTermsID = clauseCategoryTermsData.id;
                                var isAvailabel = commonClauses.indexOf(clauseCategoryTermsID.toString());
                                var isChecked = (isAvailabel == '-1') ? 'N' : 'Y';

                                if (isChecked == 'Y') {
                                    isCheckedCount = isCheckedCount + 1;
                                }

                                subMainData[subIndex]['isChecked'] = isChecked;
                                subMainData[subIndex]['mainTermRecord'] = clauseCategoryTermsData.termsName;
                                subMainData[subIndex]['crossTerm'] = '';

                                subMainData[subIndex]['clauseCategoryTermsUpdate'] = [];

                                var clauseTermsUpdateCondition = {};
                                clauseTermsUpdateCondition["tu.companyId"] = companyId;
                                clauseTermsUpdateCondition["tu.tradingId"] = tradingId;
                                clauseTermsUpdateCondition["tu.formId"] = cpFormId;
                                clauseTermsUpdateCondition["tu.clauseCategoryId"] = clauseCategoryId;
                                clauseTermsUpdateCondition["tu.clauseTermsId"] = clauseCategoryTermsID;
                                clauseTermsUpdateCondition["tu.isCustom"] = 'N';

                                await knex('terms_update AS tu')
                                    .select(

                                        'tu.*',
                                        'mainUser.username as mainUserName',
                                    )

                                    .join('users_management AS mainUser', 'mainUser.id', '=', 'tu.mainUserId')

                                    .where(clauseTermsUpdateCondition)
                                    .where({ 'tu.isDelete': 'N' })
                                    .orderBy('tu.id', 'asc')
                                    .then(async (clauseCategoryTermsUpdateData) => {
                                        var termsUpdateIndex = 0;

                                        var length = clauseCategoryTermsUpdateData.length;
                                        length = length - 2;
                                        length = (length < 0) ? 0 : length;

                                        if (clauseCategoryTermsUpdateData.length > 0) {
                                            subMainData[subIndex]['crossTerm'] = clauseCategoryTermsData.termsName;
                                            for (clauseCategoryTermsUpdateData of clauseCategoryTermsUpdateData) {
                                                if (termsUpdateIndex == length) {
                                                    subMainData[subIndex]['crossTerm'] = clauseCategoryTermsUpdateData.termsName;
                                                }
                                                subMainData[subIndex]['mainTermRecord'] = clauseCategoryTermsUpdateData.termsName;
                                                termsUpdateData[termsUpdateIndex] = clauseCategoryTermsUpdateData;
                                                termsUpdateData[termsUpdateIndex]['updateDateTime'] = await moment(clauseCategoryTermsUpdateData.updatedAt).format('YYYY-MM-DD');
                                                termsUpdateIndex = termsUpdateIndex + 1;
                                            }
                                            subMainData[subIndex]['clauseCategoryTermsUpdate'] = termsUpdateData;
                                        }
                                    });

                                if (subMainData[subIndex]['crossTerm'] == subMainData[subIndex]['mainTermRecord']) {
                                    subMainData[subIndex]['crossTerm'] = clauseCategoryTermsData.termsName;
                                }
                                subIndex = subIndex + 1;
                            }
                            var isCheckedMain = (isCheckedCount > 0) ? 'Y' : 'N';
                            mainData[index]['isChecked'] = isCheckedMain;
                        }

                        mainData[index]['clauseCategoryTerms'] = subMainData;
                    });

                    var clauseTermsUpdateConditionCustom = {};
                    clauseTermsUpdateConditionCustom["companyId"] = companyId;
                    clauseTermsUpdateConditionCustom["tradingId"] = tradingId;
                    clauseTermsUpdateConditionCustom["formId"] = cpFormId;
                    clauseTermsUpdateConditionCustom["clauseCategoryId"] = clauseCategoryId;
                    clauseTermsUpdateConditionCustom["isCustom"] = 'Y';

                    await knex('terms_update').whereNotIn('id', mainTermCheckedClausesCustom).where(clauseTermsUpdateConditionCustom).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (clauseCategoryTermsUpdateCustomData) => {
                        mainData[index]['customClauseTermLength'] = clauseCategoryTermsUpdateCustomData.length;
                        console.log(clauseTermsUpdateConditionCustom, "Custom Main Clause Category Data");
                        var termsUpdateIndexCustom = 0;
                        termsUpdateDataCustom[termsUpdateIndexCustom] = [];
                        if (clauseCategoryTermsUpdateCustomData.length > 0) {
                            for (clauseCategoryTermsUpdateCustomData of clauseCategoryTermsUpdateCustomData) {
                                termsUpdateDataCustom[termsUpdateIndexCustom] = clauseCategoryTermsUpdateCustomData;
                                termsUpdateDataCustom[termsUpdateIndexCustom]['mainTermRecordCustom'] = clauseCategoryTermsUpdateCustomData.termsName;

                                termsUpdateDataCustom[termsUpdateIndexCustom]['crossTermCustom'] = '';

                                termsUpdateDataCustom[termsUpdateIndexCustom]['updateDateTime'] = await moment(clauseCategoryTermsUpdateCustomData.updatedAt).format('YYYY-MM-DD');

                                var customTermsOfMainClauseID = clauseCategoryTermsUpdateCustomData.id;

                                var isAvailabel = commonClausesCustomArray.indexOf(customTermsOfMainClauseID.toString());
                                var isChecked = (isAvailabel == '-1') ? 'N' : 'Y';

                                termsUpdateDataCustom[termsUpdateIndexCustom]['isChecked'] = isChecked;

                                var clauseTermsUpdateCustomConditionCustom = {};
                                clauseTermsUpdateCustomConditionCustom["parentId"] = clauseCategoryTermsUpdateCustomData.id;

                                await knex('terms_update')
                                    .where(clauseTermsUpdateCustomConditionCustom)
                                    .where({ 'isDelete': 'N' })
                                    .orderBy('id', 'asc').
                                    then(async (clauseCategoryTermsUpdateCustomDataCustom) => {
                                        var termsUpdateIndexCustomInfo = 0;

                                        var length = clauseCategoryTermsUpdateCustomDataCustom.length;
                                        length = length - 2;
                                        length = (length < 0) ? 0 : length;

                                        if (clauseCategoryTermsUpdateCustomDataCustom.length > 0) {
                                            termsUpdateDataCustom[termsUpdateIndexCustom]['crossTermCustom'] = clauseCategoryTermsUpdateCustomData.termsName;

                                            for (clauseCategoryTermsUpdateCustomDataCustom of clauseCategoryTermsUpdateCustomDataCustom) {

                                                if (termsUpdateIndexCustomInfo == length) {
                                                    termsUpdateDataCustom[termsUpdateIndexCustom]['crossTermCustom'] = clauseCategoryTermsUpdateCustomDataCustom.termsName;
                                                }

                                                termsUpdateDataCustom[termsUpdateIndexCustom]['mainTermRecordCustom'] =
                                                    clauseCategoryTermsUpdateCustomDataCustom.termsName;

                                                termsUpdateIndexCustomInfo = termsUpdateIndexCustomInfo + 1;
                                            }

                                        }
                                    })

                                termsUpdateIndexCustom = termsUpdateIndexCustom + 1;
                            }
                            console.log(termsUpdateDataCustom);
                            mainData[index]['clauseCategoryTermsUpdateCustom'] = termsUpdateDataCustom;
                        }
                    });
                    index = index + 1;
                }
                const responseData =
                {
                    'success': true,
                    'message': "Main Data Records",
                    'data': mainData
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

// Custom Clause Insert
module.exports.CustomClauseInsert = (data) => {
    var clauseCategoryCustomCondition = {};
    clauseCategoryCustomCondition['companyId'] = data.companyId;
    clauseCategoryCustomCondition['clauseTitle'] = data.clauseTitle;
    if (data.drawId != '' && data.drawId != null) {
        clauseCategoryCustomCondition['drawId'] = data.drawId;
    }
    if (data.tradingId != '' && data.tradingId != null) {
        clauseCategoryCustomCondition['tradingId'] = data.tradingId;
    }

    return new Promise((resolve, reject) => {
        knex('custom_clause')
            .where(clauseCategoryCustomCondition).then((customClauseData) => {
                if (customClauseData.length > 0) {
                    const responseData =
                    {
                        'success': false,
                        "message": "Name Already Exists"
                    }
                    resolve(responseData)
                } else {
                    return knex('custom_clause').insert(
                        {
                            mainUserId: data.mainUserId,
                            companyId: data.companyId,
                            drawId: data.drawId,
                            tradingId: data.tradingId,
                            clauseTitle: data.clauseTitle,
                            createdBy: data.createdBy,
                            createdAt: new Date(),
                            updatedBy: data.updatedBy,
                            updatedAt: new Date(),
                            isActive: "Y",
                            isDelete: "N",
                        }).then((result) => {
                            const responseData =
                            {
                                'success': true,
                                "message": "Record Inserted Successfully",
                                "data": result
                            }
                            resolve(responseData)
                        })
                }

            })
    })
}

// Custom Clause Terms Update
module.exports.CustomClauseTermsUpdateParentID = (data) => {
    return new Promise((resolve, reject) => {
        return knex('terms_update').update(
            {
                customClauseTermsId: data.id
            }).where('id', data.id).then((data) => {
                if (data) {
                    const responseData =
                    {
                        'success': true,
                        'message': "Record Updated Successfully",
                        'body': data
                    }
                    resolve(responseData);
                }
            })
    })
}

// Custom Clause Terms Update
module.exports.CustomClauseTermsInsert = (data) => {
    return new Promise((resolve, reject) => {
        var clauseCategoryCustomCondition = {};
        if (data.drawId != '' && data.drawId != null) {
            clauseCategoryCustomCondition['drawId'] = data.drawId;
        }
        if (data.tradingId != '' && data.tradingId != null) {
            clauseCategoryCustomCondition['tradingId'] = data.tradingId;
        }
        clauseCategoryCustomCondition['formId'] = data.formId;
        clauseCategoryCustomCondition['customCluaseCategoryId'] = data.customCluaseCategoryId;
        clauseCategoryCustomCondition['termsName'] = data.termsName;

        var customClauseTermsId = (data.customClauseTermsId != '' && data.customClauseTermsId != null) ? data.customClauseTermsId : null;

        console.log(customClauseTermsId);

        knex('terms_update').where(clauseCategoryCustomCondition).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (clauseCateoryManagementData) => {
            if (clauseCateoryManagementData.length > 0) {
                const responseData =
                {
                    'success': false,
                    "message": "Name Already Exists"
                }
                resolve(responseData)
            } else {
                return knex('terms_update').insert(
                    {
                        mainUserId: data.mainUserId,
                        companyId: data.companyId,
                        drawId: data.drawId,
                        formId: data.formId,
                        customCluaseCategoryId: data.customCluaseCategoryId,
                        customClauseTermsId: customClauseTermsId,
                        termsName: data.termsName,
                        createdBy: data.createdBy,
                        createdAt: new Date(),
                        updatedBy: data.updatedBy,
                        updatedAt: new Date(),
                        isActive: "Y",
                        isDelete: "N",
                    }).then((result) => {
                        const responseData =
                        {
                            'success': true,
                            'message': "Record Inserted Successfully",
                        }
                        resolve(responseData);
                    })
            }
        })
    })
}

// Custom Clause Records
module.exports.customClauseRecords = (filterCondition) => {
    var drawId = filterCondition.drawId;
    var tradingId = filterCondition.tradingId;
    var commonClauses = filterCondition.commonClauses;
    var commonClausesBroker = filterCondition.commonClausesBroker;

    var clauseCategoryCondition = {};
    if (drawId != '' && drawId != null) {
        clauseCategoryCondition['drawId'] = drawId;
    }
    if (tradingId != '' && tradingId != null) {
        clauseCategoryCondition['tradingId'] = tradingId;
    }

    return new Promise(async (resolve, reject) => {
        await knex('custom_clause').where(clauseCategoryCondition).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (clauseCateoryManagementData) => {
            var mainData = [];
            var subMainData = [];
            var termsUpdateData = [];
            var termsUpdateDataCustom = [];
            var index = 0;
            if (clauseCateoryManagementData.length > 0) {
                mainData = clauseCateoryManagementData;
                for (clauseCateoryManagementData of clauseCateoryManagementData) {
                    var clauseCategoryId = clauseCateoryManagementData.id;

                    var isApproved = commonClauses.indexOf(clauseCategoryId.toString());
                    var isApprovedInfo = (isApproved == '-1') ? 'N' : 'Y';
                    mainData[index]['isApprovedInfo'] = isApprovedInfo;

                    mainData[index]['isChecked'] = 'N';
                    mainData[index]['clauseCategoryTermsUpdateCustom'] = [];
                    mainData[index]['clauseCategoryTerms'] = [];

                    var clauseTermsRecordsCondition = {};
                    clauseTermsRecordsCondition['customCluaseCategoryId'] = clauseCategoryId;

                    await knex('terms_update').whereNotIn('id',commonClausesBroker).where(clauseTermsRecordsCondition).where({ 'customClauseTermsId': null }).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (clauseCategoryTermsData) => {
                        var subIndex = 0;
                        console.log(clauseTermsRecordsCondition);
                        if (clauseCategoryTermsData.length > 0) {
                            subMainData = clauseCategoryTermsData;
                            var isCheckedCount = 0;
                            for (clauseCategoryTermsData of clauseCategoryTermsData) {
                                var clauseCategoryTermsID = clauseCategoryTermsData.id;
                                var isAvailabel = commonClauses.indexOf(clauseCategoryTermsID.toString());
                                var isChecked = (isAvailabel == '-1') ? 'N' : 'Y';

                                if (isChecked == 'Y') {
                                    isCheckedCount = isCheckedCount + 1;
                                }

                                subMainData[subIndex]['isChecked'] = isChecked;
                                subMainData[subIndex]['mainTermRecord'] = clauseCategoryTermsData.termsName;
                                subMainData[subIndex]['crossTerm'] = '';
                                subMainData[subIndex]['clauseCategoryTermsUpdate'] = [];
                                subMainData[subIndex]['customClauseTermsId'] = clauseCategoryTermsID;

                                subMainData[subIndex]['mainTermID'] = clauseCategoryTermsData.id;

                                var clauseTermsUpdateCondition = {};
                                clauseTermsUpdateCondition["tu.customClauseTermsId"] = clauseCategoryTermsID;

                                await knex('terms_update AS tu')
                                    .select(
                                        'tu.*',
                                        'mainUser.username as mainUserName',
                                    )
                                    .join('users_management AS mainUser', 'mainUser.id', '=', 'tu.mainUserId')
                                    .where(clauseTermsUpdateCondition)
                                    .where({ 'tu.isDelete': 'N' })
                                    .orderBy('tu.id', 'asc')
                                    .then(async (clauseCategoryTermsUpdateData) => {
                                        var termsUpdateIndex = 0;

                                        var length = clauseCategoryTermsUpdateData.length;
                                        length = length - 2;
                                        length = (length < 0) ? 0 : length;

                                        if (clauseCategoryTermsUpdateData.length > 0) {
                                            subMainData[subIndex]['crossTerm'] = clauseCategoryTermsData.termsName;
                                            for (clauseCategoryTermsUpdateData of clauseCategoryTermsUpdateData) {
                                                if (termsUpdateIndex == length) {
                                                    subMainData[subIndex]['crossTerm'] = clauseCategoryTermsUpdateData.termsName;
                                                }
                                                // termsUpdateData[termsUpdateIndex]['customClauseTermsId'] = clauseCategoryTermsID;
                                                termsUpdateData[termsUpdateIndex] = clauseCategoryTermsUpdateData;
                                                termsUpdateData[termsUpdateIndex]['updateDateTime'] = await moment(clauseCategoryTermsUpdateData.updatedAt).format('YYYY-MM-DD');
                                                termsUpdateIndex = termsUpdateIndex + 1;

                                                subMainData[subIndex]['mainTermRecord'] = clauseCategoryTermsUpdateData.termsName;
                                                subMainData[subIndex]['mainTermID'] = clauseCategoryTermsUpdateData.id;
                                            }
                                            subMainData[subIndex]['clauseCategoryTermsUpdate'] = termsUpdateData;
                                        }
                                    });

                                if (subMainData[subIndex]['crossTerm'] == subMainData[subIndex]['mainTermRecord']) {
                                    subMainData[subIndex]['crossTerm'] = clauseCategoryTermsData.termsName;
                                }

                                subIndex = subIndex + 1;
                            }
                            var isCheckedMain = (isCheckedCount > 0) ? 'Y' : 'N';
                            mainData[index]['isChecked'] = isCheckedMain;
                        }

                        mainData[index]['clauseCategoryTerms'] = subMainData;
                    });

                    index = index + 1;
                }
                const responseData =
                {
                    'success': true,
                    'message': "Main Data Records",
                    'data': mainData
                }
                console.log(responseData);
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

// Get Custom Term Data Of Custom Clause
module.exports.getCustomTermDataOfCustomClause = (clauseCategoryCustomCondition) => {
    return new Promise((resolve, reject) => {
        knex('terms_update').where(clauseCategoryCustomCondition).where({ 'isDelete': 'N' }).orderBy('id', 'asc').then(async (clauseCateoryManagementData) => {
            if (clauseCateoryManagementData.length > 0) {
                const responseData =
                {
                    'success': true,
                    "message": "Clause Term Record Data",
                    "data": clauseCateoryManagementData
                }
                resolve(responseData)
            }
        })
    })
}

// View Custom Term Data Of Custom Clause
module.exports.viewCustomTermDataOfCustomClause = (clauseCategoryCustomCondition) => {
    return new Promise((resolve, reject) => {
        knex('terms_update AS tu')
            .select(
                'tu.*',
                'mainUser.username as mainUserName',
            )
            .join('users_management AS mainUser', 'mainUser.id', '=', 'tu.mainUserId')
            .where(clauseCategoryCustomCondition)
            .where({ 'tu.isDelete': 'N' })
            .orderBy('tu.id', 'desc')
            .then(async (clauseCategoryTermsUpdateData) => {
                var termsUpdateData = [];
                var termsUpdateIndex = 0;

                for (clauseCategoryTermsUpdateData of clauseCategoryTermsUpdateData) {
                    termsUpdateData[termsUpdateIndex] = clauseCategoryTermsUpdateData;
                    termsUpdateData[termsUpdateIndex]['updateDateTime'] = await moment(clauseCategoryTermsUpdateData.updatedAt).format('YYYY-MM-DD');
                    termsUpdateIndex = termsUpdateIndex + 1;
                }

                await knex('terms_update AS tu')
                    .select(
                        'tu.*',
                        'mainUser.username as mainUserName',
                    )
                    .join('users_management AS mainUser', 'mainUser.id', '=', 'tu.mainUserId')
                    .where({ 'tu.id': clauseCategoryCustomCondition.customClauseTermsId })
                    .where({ 'tu.isDelete': 'N' })
                    .orderBy('tu.id', 'desc')
                    .then(async (clauseCategoryTermsUpdateData) => {
                        for (clauseCategoryTermsUpdateData of clauseCategoryTermsUpdateData) {
                            termsUpdateData[termsUpdateIndex] = clauseCategoryTermsUpdateData;
                            termsUpdateData[termsUpdateIndex]['updateDateTime'] = await moment(clauseCategoryTermsUpdateData.updatedAt).format('YYYY-MM-DD');
                            termsUpdateIndex = termsUpdateIndex + 1;
                        }
                    })

                const responseData =
                {
                    'success': true,
                    "message": "Clause Term Record Data",
                    "data": termsUpdateData
                }
                resolve(responseData)

                // if (clauseCategoryTermsUpdateData.length > 0)
                // {
                //     for (clauseCategoryTermsUpdateData of clauseCategoryTermsUpdateData)
                //     {
                //         termsUpdateData[termsUpdateIndex] = clauseCategoryTermsUpdateData;
                //         termsUpdateData[termsUpdateIndex]['updateDateTime'] = await moment(clauseCategoryTermsUpdateData.updatedAt).format('YYYY-MM-DD');
                //         termsUpdateIndex = termsUpdateIndex + 1;
                //     }
                //     const responseData =
                //     {
                //         'success': true,
                //         "message": "Clause Term Record Data",
                //         "data" : termsUpdateData 
                //     }
                //     resolve(responseData)
                // } else {
                //     const responseData =
                //     {
                //         'success': true,
                //         "message": "Clause Term Record Data",
                //         "data" : []
                //     }
                //     resolve(responseData)
                // }
            });
    })
}

// Get Clause Term Data For Update
module.exports.getClauseTermDataForUpdate = (filterData) => {
    var filterCondition = {};
    filterCondition['id'] = filterData.clauseTermsID;
    return new Promise((resolve, reject) => {
        knex('clauses_term_details')
            .where(filterCondition)
            .where({ 'isDelete': 'N' })
            .orderBy('id', 'asc')
            .then(async (clauseCategoryTermsUpdateData) => {
                var filterCondition = {};
                if (filterData.drawId != '' && filterData.drawId != null) {
                    filterCondition['drawId'] = filterData.drawId;
                }
                if (filterData.tradingId != '' && filterData.tradingId != null) {
                    filterCondition['tradingId'] = filterData.tradingId;
                }
                filterCondition['companyId'] = filterData.companyId;
                filterCondition['formId'] = filterData.formID;
                filterCondition['clauseCategoryId'] = filterData.ClauseID;
                filterCondition['clauseTermsId'] = filterData.clauseTermsID;

                knex('terms_update')
                    .where(filterCondition)
                    .where({ 'isDelete': 'N' })
                    .orderBy('id', 'asc')
                    .then(async (termUpdateData) => {
                        if (termUpdateData.length > 0) {
                            const responseData =
                            {
                                'success': true,
                                "message": "Term Update Record Data",
                                "data": termUpdateData
                            }
                            resolve(responseData);
                            console.log(responseData, 'Update Clause Terms Data');
                        } else {
                            const responseData =
                            {
                                'success': true,
                                "message": "Clause Term Record Data",
                                "data": clauseCategoryTermsUpdateData
                            }
                            resolve(responseData);
                            console.log(responseData, 'Update Clause Terms Data');
                        }

                    });
            });
    })
}

// Get Clause Terms Update Records Of Main Clause
module.exports.viewClauseTermUpdateRecordsOfMainClause = (filterData) => {
    return new Promise((resolve, reject) => {
        var filterCondition = {};
        if (filterData.drawId != '' && filterData.drawId != null) {
            filterCondition['tu.drawId'] = filterData.drawId;
        }
        if (filterData.tradingId != '' && filterData.tradingId != null) {
            filterCondition['tu.tradingId'] = filterData.tradingId;
        }
        filterCondition['tu.companyId'] = filterData.companyId;
        filterCondition['tu.formId'] = filterData.formID;
        filterCondition['tu.clauseCategoryId'] = filterData.ClauseID;
        filterCondition['tu.clauseTermsId'] = filterData.clauseTermsID;

        knex('terms_update AS tu')
            .select('tu.*', 'mainUser.username as mainUserName')
            .join('users_management AS mainUser', 'mainUser.id', '=', 'tu.mainUserId')
            .where(filterCondition)
            .where({ 'tu.isDelete': 'N' })
            .orderBy('tu.id', 'desc')
            .then(async (clauseCategoryTermsUpdateData) => {
                var termsUpdateData = [];
                var termsUpdateIndex = 0;
                if (clauseCategoryTermsUpdateData.length > 0) {
                    for (clauseCategoryTermsUpdateData of clauseCategoryTermsUpdateData) {
                        termsUpdateData[termsUpdateIndex] = clauseCategoryTermsUpdateData;
                        termsUpdateData[termsUpdateIndex]['updateDateTime'] = await moment(clauseCategoryTermsUpdateData.updatedAt).format('YYYY-MM-DD');
                        termsUpdateIndex = termsUpdateIndex + 1;
                    }

                    const responseData =
                    {
                        'success': true,
                        "message": "Clause Term Record Data",
                        "data": termsUpdateData
                    }
                    resolve(responseData);

                } else {
                    const responseData =
                    {
                        'success': true,
                        "message": "Clause Term Record Data",
                        "data": []
                    }
                    resolve(responseData)
                }
            });
    })
}

// Get Custom Clause Term Data For Update
module.exports.getCustomClauseTermDataForUpdate = (filterData) => {
    var filterCondition = {};
    filterCondition['parentId'] = filterData.id;
    return new Promise((resolve, reject) => {
        knex('terms_update')
            .where(filterCondition)
            .where({ 'isDelete': 'N' })
            .orderBy('id', 'asc')
            .then(async (termUpdateData) => {
                if (termUpdateData.length > 0) {
                    const responseData =
                    {
                        'success': true,
                        "message": "Term Update Record Data",
                        "data": termUpdateData
                    }
                    resolve(responseData);
                } else {
                    var filterCondition = {};
                    filterCondition['id'] = filterData.id;
                    knex('terms_update')
                        .where(filterCondition)
                        .where({ 'isDelete': 'N' })
                        .orderBy('id', 'asc')
                        .then(async (termUpdateData) => {
                            const responseData =
                            {
                                'success': true,
                                "message": "Term Update Record Data",
                                "data": termUpdateData
                            }
                            resolve(responseData);
                        })
                }
            });
    })
}

// Custom Clause Terms Modification Insert / Update
module.exports.customClauseDetailsInsert = (data) => {
    console.log(data);
    return new Promise((resolve, reject) => {
        return knex('terms_update').insert(
            {
                mainUserId: data.mainUserId,
                companyId: data.companyId,
                drawId: data.drawId,
                formId: data.formId,
                clauseCategoryId: data.clauseCategoryId,
                parentId: data.parentId,
                nos: data.nos,
                termsNameOrginal: data.termsNameOrginal,
                termsName: data.termsName,
                createdBy: data.createdBy,
                createdAt: new Date(),
                updatedBy: data.updatedBy,
                updatedAt: new Date(),
                isActive: "Y",
                isDelete: "N",
            }).then((result) => {
                const responseData =
                {
                    'success': true,
                    'message': "Record Updated Successfully",
                }
                resolve(responseData);
            })
    })
}

// Get Custom Clause Terms Update Records Of Main Clause
module.exports.viewCustomClauseTermUpdateRecordsOfMainClause = (filterData) => {
    return new Promise((resolve, reject) => {
        var filterCondition = {};
        filterCondition['tu.parentId'] = filterData.parentId;

        knex('terms_update AS tu')
            .select('tu.*', 'mainUser.username as mainUserName')
            .join('users_management AS mainUser', 'mainUser.id', '=', 'tu.mainUserId')
            .where(filterCondition)
            .where({ 'tu.isDelete': 'N' })
            .orderBy('tu.id', 'desc')
            .then(async (clauseCategoryTermsUpdateData) => {
                var termsUpdateData = [];
                var termsUpdateIndex = 0;

                console.log(clauseCategoryTermsUpdateData, "First Terms Update");

                for (clauseCategoryTermsUpdateData of clauseCategoryTermsUpdateData) {
                    termsUpdateData[termsUpdateIndex] = clauseCategoryTermsUpdateData;
                    termsUpdateData[termsUpdateIndex]['updateDateTime'] = await moment(clauseCategoryTermsUpdateData.updatedAt).format('YYYY-MM-DD');
                    termsUpdateIndex = termsUpdateIndex + 1;
                }

                var filterCondition = {};
                filterCondition['tu.id'] = filterData.parentId;

                await knex('terms_update AS tu')
                    .select('tu.*', 'mainUser.username as mainUserName')
                    .join('users_management AS mainUser', 'mainUser.id', '=', 'tu.mainUserId')
                    .where(filterCondition)
                    .where({ 'tu.isDelete': 'N' })
                    .orderBy('tu.id', 'desc')
                    .then(async (clauseCategoryTermsUpdateData) => {
                        console.log(clauseCategoryTermsUpdateData, "Original Terms Data");
                        for (clauseCategoryTermsUpdateData of clauseCategoryTermsUpdateData) {
                            termsUpdateData[termsUpdateIndex] = clauseCategoryTermsUpdateData;
                            termsUpdateData[termsUpdateIndex]['updateDateTime'] = await moment(clauseCategoryTermsUpdateData.updatedAt).format('YYYY-MM-DD');
                            termsUpdateIndex = termsUpdateIndex + 1;
                        }
                        const responseData =
                        {
                            'success': true,
                            "message": "Clause Term Record Data",
                            "data": termsUpdateData
                        }
                        resolve(responseData);
                        console.log(termsUpdateData, "View Update Records");
                    })


                // if (clauseCategoryTermsUpdateData.length > 0)
                // {
                //     for (clauseCategoryTermsUpdateData of clauseCategoryTermsUpdateData)
                //     {
                //         termsUpdateData[termsUpdateIndex] = clauseCategoryTermsUpdateData;
                //         termsUpdateData[termsUpdateIndex]['updateDateTime'] = await moment(clauseCategoryTermsUpdateData.updatedAt).format('YYYY-MM-DD');
                //         termsUpdateIndex = termsUpdateIndex + 1;
                //     }
                //     const responseData =
                //     {
                //         'success': true,
                //         "message": "Clause Term Record Data",
                //         "data" : termsUpdateData 
                //     }
                //     resolve(responseData);
                // } else {
                //     const responseData =
                //     {
                //         'success': true,
                //         "message": "Clause Term Record Data",
                //         "data" : [] 
                //     }
                //     resolve(responseData)
                // }
            });
    })
}

// Storage the folder functionality
var storage = multer.diskStorage(
    {
        destination: function (req, file, cd) {
            cd(null, 'upload/')
        },

        filename: function (req, file, cd) {
            cd(null, myDate + file.originalname)
        }
    })

//upload the file function
var upload = multer(
    {
        storage: storage
    }).any('');


//image_upload
module.exports.signatureFileUpload = (req, res) => {
    upload(req, res, function (err) {
        if (err) {
        } else {
            var filename = req.files;
            const map1 = filename.map(data => {
                var fileurl = "http://18.219.59.88/" + myDate + data.originalname;
                res.json(
                    {
                        "success": true,
                        "message": 'File uploaded',
                        "url": myDate + data.originalname,
                        "fileurl": fileurl
                    })
            })
        }
    })
}