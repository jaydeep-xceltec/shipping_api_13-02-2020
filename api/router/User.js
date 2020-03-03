const User = require('../controller/store');
const Superadmin = require('../controller/superadmin');
const Userrole = require('../controller/userrolemanage');
const Moduledata = require('../controller/modulemanage');
const Moduleactiondata = require('../controller/moduleactionmanage');
const RoleAssign = require('../controller/roleassignmanage');
const CreateUser = require('../controller/createuser');
const Companymanagement = require('../controller/companymanage');
const CompanyAdminmanagement = require('../controller/companyadminmanage');
const CharterManagement = require('../controller/chartermanage');
const StaffManagement = require('../controller/staffmanagement');


module.exports.companyStatusUpdate = (req,res,next) => {
    let companyStatus = req.body;
    console.log(req.body);
    
    CompanyAdminmanagement.companyStatusUpdate(companyStatus).then((responseData) => {
        res.json(responseData)
     }).catch((err) => next(err));
}

module.exports.register = (req, res, next) => {
      
    let userRegister = req.body;
    //console.log(userRegister);
    User.register(userRegister).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}


module.exports.createasubadmin = (req, res, next) => {
      
    let userRegister = req.body;
    //console.log(userRegister);
    CreateUser.createasubadmin(userRegister).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.login = ( req, res, next) => {
	let loginuser = req.body;
	User.login(loginuser).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.superadminregister = (req, res, next) => {
      
    let userRegister = req.body;
    //console.log(userRegister);
    Superadmin.superAdminregister(userRegister).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.superadminlogin = ( req, res, next) => {
	let loginuser = req.body;
	Superadmin.superAdminlogin(loginuser).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.superadmiforgotpassword = ( req, res, next) => 
{
	let forgot = req.body;
	Superadmin.forgotpassword(forgot).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.superadminchangepassword = (req,res,next) => {
    let cpassword = req.body;
     //console.log(cpassword);
    Superadmin.changePassword(cpassword).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.userrolecreate = (req,res,next) => {
    let userrole = req.body;
    Userrole.userRolemanage(userrole).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.userroleread = (req,res,next) => {
    Userrole.userRoleread().then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.userroleupdate = (req,res,next) => {
    let userrole = req.body;
    Userrole.userRoleupdate(userrole).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.userroledelete = (req,res,next) =>{
    let userrole = req.body;
    Userrole.userRoledelete(userrole).then((responseData) => {
           res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.userroleactive = (req,res,next) => {
  let userroleactive = req.body;
    Userrole.userRoleactive(userroleactive).then((responseData) => {
     res.json(responseData)
 }).catch((err) => next(err));
}



module.exports.modulecreate = (req,res,next) => {
    let moduledata = req.body;
     Moduledata.moduleCreate(moduledata).then((responseData) => {
        res.json(responseData)
     }).catch((err) => next(err));
}
module.exports.moduleread = (req,res,next) => {
    Moduledata.moduleRead().then((responseData) => {
        res.json(responseData)
    }).catch((err) => (err));
}
module.exports.moduleupdate = (req,res,next) => {
     let moduleupdatedata = req.body;
    Moduledata.moduleUpdate(moduleupdatedata).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.moduledelete = (req,res,next) => {
      let moduledelete = req.body;
      Moduledata.moduleDelete(moduledelete).then((responseData) => {
        res.json(responseData)
      }).catch((err) => next(err));
}


module.exports.moduleactioncreate = (req,res,next) => {
    let actionmdata = req.body;
    Moduleactiondata.moduleactionCreate(actionmdata).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.selectrolelist = (req,res,next) => {
    let actionrolemdata = req.body;
    Moduleactiondata.selectroleList(actionrolemdata).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.roleAssign = (req,res,next) => {
    let roleassigndata = req.body;
    RoleAssign.RoleAssigncreate(roleassigndata).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.createUser = (req,res,next) => {
    let data = req.body;
    CreateUser.createUser(data).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.createsubadmin = (req,res,next) => {
    let data = req.body;
    CreateUser.createasubadmin(data).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.userList = (req,res,next) => {
    CreateUser.userFatchList().then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.userFatchListSoftDelete = (req,res,next) => {
    CreateUser.userFatchListSoftDelete().then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.userLogin = (req,res,next) => {
    let data = req.body;
    CreateUser.loginUser(data).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.removeUser = (req,res,next) => {
    let data = req.body;
    CreateUser.userRemove(data).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}

//To Retrieve data
module.exports.retrieveUser = (req,res,next) => {
    let data = req.body;
    CreateUser.userRetrieve(data).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.userInfo = (req,res,next) => {
    let data = req.params;
    //console.log(data);
    CreateUser.userInfo(data).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.userupdate = (req,res,next) => {
     let data = req.body;
    CreateUser.userUpdate(data).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}

// company Management 

module.exports.companycreate = (req,res,next) => {
    let data = req.body;
    Companymanagement.companyCreate(data).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.companyadminListSoftDelete = (req,res,next) => {
    CompanyAdminmanagement.companyadminListSoftDelete().then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
 }
 module.exports.companyList = (req,res,next) => {
    Companymanagement.companylist().then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
 }
 
 module.exports.getUsersCompanyList = (req,res,next) => {
    let data = req.body;
    Companymanagement.getUsersCompanyList(data).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
 }
 module.exports.companyUpdate = (req,res,next) => {
    let data = req.body;
    Companymanagement.companyupdate(data).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
 }

  module.exports.companyDelete = (req,res,next) => {
      let data = req.body;
    Companymanagement.companydelete(data).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
 }
 
 //comapany  Admin Management

 module.exports.companyadminlist = (req,res,next) => {
    CompanyAdminmanagement.companyadminList().then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
 }
 module.exports.companyadmincreate = (req,res,next) => {
      let data = req.body;
    CompanyAdminmanagement.companyadminCreate(data).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
 }
 module.exports.companyadminupdate = (req,res,next) => {
      let data = req.body;
    CompanyAdminmanagement.companyadminUpdate(data).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
 }
 module.exports.companyadmindelete = (req,res,next) => {
    let data = req.body;
    CompanyAdminmanagement.companyadminDelete(data).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
 }
//To retrieve Deleted Data
 module.exports.companyadminretrieve = (req,res,next) => {
    let data = req.body;
    CompanyAdminmanagement.companyadminretrieve(data).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
 }
 
// Charter management

module.exports.chartercreate = (req,res,next) => {
      let data = req.body;
    CharterManagement.charterCreate(data).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.charterlist = (req,res,next) => {
    CharterManagement.charterList().then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.charterdetails = (req,res,next) => {
    let data = req.body;
    CharterManagement.charterDetails(data).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.charterupdate = (req,res,next) => {
       let data = req.body;
    CharterManagement.charterUpdate(data).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.charterdelete = (req,res,next) => {
       let data = req.body;
    CharterManagement.charterDelete(data).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}



module.exports.roleActionView = (req,res,next) => {
RoleAssign.roleActionView().then((responseData) => {
res.json(responseData)
}).catch((err) => (err));
}

module.exports.rolePermision = (req,res,next) => {
let data = req.body;
RoleAssign.rolePermision(data).then((responseData) => {
res.json(responseData)
}).catch((err) => next(err));
}

//For staff management 
module.exports.staffadd = (req,res,next) => {
    let data = req.body;
    StaffManagement.StaffAdd(data).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.stafflist = (req,res,next) => {
    StaffManagement.Stafflist().then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.staffdetails = (req,res,next) => {
    let data = req.body;
    StaffManagement.StaffDetails(data).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.staffedit = (req,res,next) => {
    let data = req.body;
    StaffManagement.StaffEdit(data).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.staffdelete = (req,res,next) => {
    let data = req.body;
    StaffManagement.StaffDelete(data).then((responseData) => {
        res.json(responseData)
    }).catch((err) => next(err));
}
