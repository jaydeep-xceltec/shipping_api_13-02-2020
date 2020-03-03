const subadmin = require('../controller/subadminrole');


module.exports.subadminroleupdate = (req,res,next) => {
    let subadminrole = req.body;
    subadmin.subadminroleupdate(subadminrole).then((responseData) => {
        res.json(responseData)
     }).catch((err) => next(err));
}

module.exports.subadminroleCreate = (req,res,next) => {
    let subadminrole = req.body;
    subadmin.subadminroleCreate(subadminrole).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}

// module.exports.userroledelete = (req,res,next) =>{
//     let userrole = req.body;
//     subadmin.userRoledelete(userrole).then((responseData) => {
//            res.json(responseData)
//     }).catch((err) => next(err));
// }

// module.exports.stafflist = (req,res,next) => {
//     StaffManagement.Stafflist().then((responseData) => {
//         res.json(responseData)
//     }).catch((err) => next(err));
// }

module.exports.subadminroleread = (req,res,next) => {
    let subadminrole = req.body;
    subadmin.subadminroleread(subadminrole).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}
// module.exports.subadminroleupdate = (req,res,next) => {
//     let subadminrole = req.body;
//     subadmin.subadminroleupdate(subadminrole).then((responseData) => {
//         res.json(responseData)
//     }).catch((err) => next(err));
// }
