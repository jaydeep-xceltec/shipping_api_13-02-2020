// Clause Category Management


const knex = require('knex')(require('../knexfile'))
const express = require('express')
const multer = require('multer');
var moment   = require('moment');
var date   = new Date();
var myDate   = moment(date).format('llll');
var fs = require('fs');

// Clause Category Create
module.exports.claueseCategorycreate = (data) =>
{
    var typename = data.name;
    var cpFormId = data.cpFormId;
    return new Promise((resolve, reject) =>
    {
        knex('clauses_category_management').where({ name: typename }).where({ cpFormId: cpFormId }).then((rdata) =>
        {
            if (rdata.length > 0)
            {
                const responseData =
                {
                    'success': false,
                    "message": "Clause Category Already Exists"
                }
                resolve(responseData)
            } else {
                return knex('clauses_category_management').insert({

                    name: data.name,
                    cpFormId: data.cpFormId,
                    createdBy: data.createdBy,
                    createdAt: new Date(),
                    updatedBy: data.updatedBy,
                    updatedAt: new Date(),
                    isActive: "Y",
                    isDelete: "N",
                }).then((result) => {
                    const responseData = {
                        'success': true,
                        "message": "Clause Category Created Successfully"
                    }
                    resolve(responseData)
                })
            }

        })
    })
}
// Clause Category Records
module.exports.claueseCategorylist = () =>
{
    return new Promise(async (resolve, reject) =>
    {
        await 
            knex('clauses_category_management AS ccm')
                .select('ccm.*','cfm.cpFormName')
                .join('cp_form_management AS cfm','cfm.id','=','ccm.cpFormId')
                .where({ 'ccm.isDelete': 'N' }).orderBy('ccm.id', 'desc').then(async (data) =>
                {
                    var arr = []
                    if (data.length > 0)
                    {
                        for (dat of data)
                        {
                            var dateobject =
                            {
                                'id'         :  dat.id,
                                'name'       :  dat.name,
                                'cpformName' :  dat.cpFormName,
                                'cpFormId'   :  dat.cpFormId,
                                'createdAt'  :  dat.createdAt,
                                'createdBy'  :  dat.createdBy,
                                'updatedAt'  :  dat.updatedAt,
                                'updatedBy'  :  dat.updatedBy,
                                'isActive'   :  dat.isActive,
                                'isDelete'   :  dat.isDelete
                            }
                            arr.push(dateobject);
                        }
                        const responseData =
                        {
                            'success': true,
                            'message': "Clause Category Records",
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
// Clause Category Update
module.exports.claueseCategoryupdate = (data) =>
{
    var id = data.id;
    var name = data.name;
    var cpFormId = data.cpFormId;
    return new Promise((resolve, reject) =>
    {
        knex('clauses_category_management').where({ name: name }).where({ cpFormId: cpFormId }).where({ isDelete: 'N' }).then((rdata) =>
        {
            if (rdata.length > 0)
            {
                if(rdata[0].id == data.id)
                {
                    return knex('clauses_category_management').update(
                    {
                        name: data.name,
                        cpFormId: data.cpFormId,
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
                        'message': "Clause Category Already Exists"
                    }
                    resolve(responseData);
                }
            } else {
                return knex('clauses_category_management').update(
                {
                    name: data.name,
                    cpFormId: data.cpFormId,
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
// Clause Category Remove
module.exports.claueseCategorydelete = (data) =>
{
    var id = data.id;
    return new Promise((resolve, reject) =>
    {
        return knex('clauses_category_management').update({ isDelete: 'Y' }).where('id', id).then(async (data) =>
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
// Clause Category Records Server Side
module.exports.clauseCategoryServerSide = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await knex('clauses_category_management').where(filterCondition).where({ isDelete: 'N' }).orderBy('id', 'desc').then(async (data) =>
        {
            var arr = []
            if (data.length > 0)
            {
                for (dat of data)
                {
                    var createdat = await dat.createdAt;
                    var datetime = await moment(createdat).format('lll');
                    var dateobject =
                    {
                        'id'       : dat.id,
                        'name'     : dat.name,
                        'cpFormId' : dat.cpFormId,
                        'createdAt': dat.createdAt,
                        'createdBy': dat.createdBy,
                        'updatedAt': dat.updatedAt,
                        'updatedBy': dat.updatedBy,
                        'isActive' : dat.isActive,
                        'isDelete' : dat.isDelete
                    }
                    arr.push(dateobject)
                }
                const responseData =
                {
                    'success': true,
                    'message': "Clause Category Records",
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
// Fetch Clause Category Records According To Filter Condition
module.exports.clauseCategoryServerSideRecords = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
        await knex('clauses_category_management').where(filterCondition).where({ isDelete: 'N' }).orderBy('id', 'asc').then(async (data) =>
        {
            var arr = []
            if (data.length > 0)
            {
                for (dat of data)
                {
                    var createdat = await dat.createdAt;
                    var datetime = await moment(createdat).format('lll');
                    var dateobject =
                    {
                        'id'       : dat.id,
                        'name'     : dat.name,
                        'cpFormId' : dat.cpFormId,
                        'createdAt': dat.createdAt,
                        'createdBy': dat.createdBy,
                        'updatedAt': dat.updatedAt,
                        'updatedBy': dat.updatedBy,
                        'isActive' : dat.isActive,
                        'isDelete' : dat.isDelete
                    }
                    arr.push(dateobject)
                }
                const responseData =
                {
                    'success': true,
                    'message': "Clause Category Records",
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

// Clause Category Status Update
module.exports.clauseCategoryStatusUpdate = (data) =>
{
    var id = data.id;
    return new Promise((resolve, reject) =>
    {
        return knex('clauses_category_management').update(
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

//Storage the folder functionality
var storage = multer.diskStorage({
    destination: function(req, file, cd) {
        cd(null, 'upload/')
    },
    filename: function(req, file, cd) {
        //// console.log(req.file);
        cd(null, myDate + file.originalname)
    }

})

//upload the file function
var upload = multer({
    storage: storage
}).any('');

//image_upload
module.exports.clauseCategoryUpload = (req, res) =>
{
    upload(req, res, function(err)
    {
        if (err){} else
        {
            var filename = req.files;
            const map1 = filename.map(data =>
            {
                var fileurl = "http://localhost:4203/"+myDate+data.originalname;
                res.json({
                    "success": true,
                    "message": 'File uploaded',
                    "url": myDate+data.originalname,
                    "fileurl": fileurl
                })
            })
        }
    })
}
