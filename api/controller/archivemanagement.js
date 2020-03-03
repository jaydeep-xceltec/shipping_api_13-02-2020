const knex = require('knex')(require('../knexfile'))


module.exports.archiverolelist = (req,res) => {
    knex('user_role_management').where({isDelete:'Y'}).then((rldata) => {
        if(rldata.length>0){
            const responseData = {
                'success':true,
                'message':"Archive role list",
                'data' : rldata
            }
            res.send(responseData);
        }else{
            const responseData = {
                'success':false,
                'message':"Data not found"
            }
            res.send(responseData);
        }
    })
}
module.exports.archivecompanylist = (req,res) => {
    knex('company_management').where({isDelete:'Y'}).then((companydata) => {
        if(companydata.length>0){
            const responseData = {
                'success':true,
                'message':"Archive company list",
                'data' : companydata
            }
            res.send(responseData);
        }else{
            const responseData = {
                'success':false,
                'message':"Data not found"
            }
            res.send(responseData);
        }
    })
}
module.exports.archiveuserlist = (req,res) => {
    knex('users_management').where({isDelete:'Y'}).then((userlist) => {
        if(userlist.length>0){
            var arr = [];
            for(dat of userlist){
                var ulistdata ={
                    'id': dat.id ,
                    'userRoleId': dat.userRoleId,
                    'companyId': dat.companyId,
                    'username': dat.username,
                    'firstName':dat.firstName ,
                    'lastName': dat.lastName,
                    'email': dat.email ,
                    'mobileNo': dat.mobileNo,
                    'businessPhone': dat.businessPhone,
                    'businessFax': dat.businessFax ,
                    'title': dat.title,
                    'address': dat.address,
                    'isActive': dat.isActive,
                    'isDelete': dat.isDelete
                }
                arr.push(ulistdata);
            }            
            const responseData = {
                'success': true,
                'message':"Archive users list",
                'data': arr
            }
            res.send(responseData)
        }else{
            const responseData = {
                'success': false,
                'message':"Data not found"
            }
            res.send(responseData)
        }
    })
}

module.exports.rolerecover = (req,res) =>{
    var rdata = req.body;
    var id = rdata.id;
    return knex('user_role_management').update({isDelete:'N'}).where('id',id).then((data) => {
        if(data){
            knex('users_management').update({isDelete:'N'}).where({userRoleId: id}).then((roldata) => {
                if(roldata){
                    const responseData = {
                        'success': true,
                        'message':"Role and all users related this role unArchived"
                    }
                    res.send(responseData); 
                }else{
                    const responseData = {
                        'success': true,
                        'message':"Role unArchived"
                    }
                    res.send(responseData); 
                }  
            })
        }else{
            const responseData = {
                'success': false,
                'message':"Id not found"
            }
            res.send(responseData);
        }
    })
}

module.exports.companyrecover = (req,res) => {
    var cdata = req.body;
    var id = cdata.id;
    return knex('company_management').update({isDelete:'N'}).where('id',id).then((data) => {
        if(data){
            knex('users_management').update({isDelete:'N'}).where({companyId: id}).then((comdata) => {
                if(comdata){
                    const responseData = {
                        'success': true,
                        'message':"Company and all users related this company unArchived"
                    }
                    res.send(responseData); 
                }else{
                    const responseData = {
                        'success': true,
                        'message':"Company unArchived"
                    }
                    res.send(responseData); 
                }  
            })
        }else{
            const responseData = {
                'success': false,
                'message':"Id not found"
            }
            res.send(responseData);
        }
    })
}

module.exports.permanentdeleteuser = (req,res) => {
          var data = req.body;
          var id = data.id;
          knex('users_management').where({id : id}).del().then((pdata) => {
               if(pdata){
                const responseData = {
                    'success': true,
                    'message':"user permanently deleted"
                }
                res.send(responseData);
               }else{
                const responseData = {
                    'success': false,
                    'message':"something wrong"
                }
                res.send(responseData);
               }
          })
}