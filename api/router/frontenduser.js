
const Fuser = require('../controller/frontenduser')

module.exports.userlogin = ( req, res, next) => {
let loginuser = req.body;
Fuser.login(loginuser).then((responseData) => {
res.json(responseData)
}).catch((err) => next(err));
}

module.exports.userchangepassword = ( req, res, next) => {
let changepass = req.body;
Fuser.changePassword(changepass).then((responseData) => {
res.json(responseData)
}).catch((err) => next(err));
}
module.exports.forgotpassword = ( req, res, next) => {
let forgotdata = req.body;
Fuser.forgotpassword(forgotdata).then((responseData) => {
res.json(responseData)
}).catch((err) => next(err));
} 
module.exports.resetPassword = ( req, res, next) => {
let reset = req.body;
Fuser.resetPassword(reset).then((responseData) => {
res.json(responseData)
}).catch((err) => next(err));
}
module.exports.Changeprofile = ( req, res, next) => {
let update = req.body;
Fuser.Changeprofile(update).then((responseData) => {
res.json(responseData)
}).catch((err) => next(err));
}
module.exports.systemActivityAlert = ( req, res, next) => {
let alertid = req.body;
Fuser.systemActivityAlert(alertid).then((responseData) => {
res.json(responseData)
}).catch((err) => next(err));
}

module.exports.systemActivityAlertupdate = ( req, res, next) => {
let dataforupdate = req.body;
Fuser.systemActivityAlertupdate(dataforupdate).then((responseData) => {
res.json(responseData)
}).catch((err) => next(err));
}