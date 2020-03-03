const knex = require('knex')(require('../knexfile'))
const bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

module.exports.createUser = (userRegister) => {
    //console.log(userRegister);
    var cmail = userRegister.email;
    var email = cmail.toLowerCase();
    var username = userRegister.username;

    if(userRegister.password != '' && userRegister.password != null && userRegister.password != undefined)
    {
        var password = userRegister.password;
    } else {
        var password           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 7; i++ )
        {
        password += characters.charAt(Math.floor(Math.random() * charactersLength));
        }    
    }

    return new Promise((resolve, reject) => {
        knex('users_management').where({ email: email }).orWhere({ username: username }).where({'isDelete':'N'}).then((data) => {
            //console.log(data)
            if (data[0]) {
                const responseData = {
                    'success': false,
                    "message": "This username and email is already registered"
                }
                resolve(responseData)

            } else {
                var hash = bcrypt.hashSync(password);
                return knex('users_management').insert({
                    username: userRegister.username,
                    companyId: userRegister.companyId,
                    mobileNo: userRegister.mobileNo,
                    countryCode: userRegister.countryCode,
                    email: email,
                    password: hash,
                    userRoleId: userRegister.userRoleId,
                    address: userRegister.address,
                    whatsappId:userRegister.whatsappId,
                    skypeId:userRegister.skypeId,
                    firstName: userRegister.firstName,
                    lastName: userRegister.lastName,
                    createdBy: userRegister.createdBy,
                    updatedBy: userRegister.updatedBy
                }).then((result) => {
                    //mail send start

                    if (userRegister.userRoleId) {
                        
                    }
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
                        to: email,
                        subject: 'successfully Create user',
                        text: 'Hello,\n' +

                            'Congrats! You are successfully added as "User Management" by Admin. \n\n'
                            +
                            'User credentials are: \n' +
                             'Login URL: "http://shipping-final.herokuapp.com" \n' +     
                            'User ID: ' + userRegister.username + '\n' +
                            'Mobile No: ' + userRegister.mobileNo + '\n\n' +
                            'Password: ' + password + '\n\n' +

                            'Thanks'
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) { } else {
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
                })
            }
        })
    })
}


module.exports.createasubadmin = (userRegister) => {
    //console.log(userRegister);
    var cmail = userRegister.email;
    var email = cmail.toLowerCase();
    var username = userRegister.username;

    if(userRegister.password != '' && userRegister.password != null && userRegister.password != undefined)
    {
        var password = userRegister.password;
    } else {
        var password           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 7; i++ )
        {
        password += characters.charAt(Math.floor(Math.random() * charactersLength));
        }    
    }

    return new Promise((resolve, reject) => {
        knex('users_management').where({ email: email }).orWhere({ username: username }).where({'isDelete':'N'}).then((data) => {
            //console.log(data)
            if (data[0]) {
                const responseData = {
                    'success': false,
                    "message": "This username and email is already registered"
                }
                resolve(responseData)

            } else {
                var hash = bcrypt.hashSync(password);
                return knex('users_management').insert({
                    username: userRegister.username,
                    companyId: userRegister.companyId,
                    mobileNo: userRegister.mobileNo,
                    countryCode: userRegister.countryCode,
                    email: email,
                    password: hash,
                    userRoleId: userRegister.userRoleId,
                    address: userRegister.address,
                    whatsappId:userRegister.whatsappId,
                    skypeId:userRegister.skypeId,
                    firstName: userRegister.firstName,
                    lastName: userRegister.lastName,
                    createdBy: userRegister.createdBy,
                    updatedBy: userRegister.updatedBy
                }).then((result) => {
                    //mail send start

                    if (userRegister.userRoleId) {
                        
                    }
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
                        to: email,
                        subject: 'successfully Create user',
                        text: 'Hello,\n' +

                            'Congrats! You are successfully added as "User Management" by Admin. \n\n'
                            +
                            'User credentials are: \n' +
                            //'Login URL: "http://cp-admin-production.herokuapp.com" \n' +     
                            // 'User ID: ' + userRegister.email + '\n' +
                            // 'Password: ' + password + '\n\n' +
                            'Login URL: "http://shipping-final-test.herokuapp.com/" \n' +
                            'User Name : ' + userRegister.username + '\n' +
                            'Mobile No.: ' + userRegister.mobileNo + '\n' +
                            'Password: ' + password + '\n\n' +

                            'Thanks'
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) { } else {
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
                })
            }
        })
    })
}
module.exports.userFatchList = () => {
    return new Promise((resolve, reject) => {
        return knex.select('u.id', 'u.userRoleId', 'u.companyId', 'u.username ', 
        'u.firstName', 'u.lastName', 'u.email', 'u.mobileNo', 'u.businessPhone', 
        'u.businessFax', 'u.title', 'u.address', 'u.image', 'u.createdBy', 
        'u.createdAt', 'u.updatedBy', 'u.updatedAt','u.whatsappId','u.skypeId', 'u.isActive', 'u.isDelete', 
        'r.roleName')
        .from('users_management as u')
        .innerJoin('user_role_management as r', 'r.id', 'u.userRoleId').where({ 'u.isDelete': 'N' }).orderBy('u.id', 'desc').then((data) => {
            if (data.length > 0) {
                const arr = [];
                for (dat of data) {
                    var datalist = {
                        "id": dat.id,
                        "userRoleId": dat.userRoleId,
                        "companyId": dat.companyId,
                        "username": dat.username,
                        "fullName": dat.firstName + " " + dat.lastName,
                        "firstName": dat.firstName,
                        "lastName": dat.lastName,
                        "email": dat.email,
                        "mobileNo": dat.mobileNo,
                        "businessPhone": dat.businessPhone,
                        "businessFax": dat.businessFax,
                        "title": dat.title,
                        "address": dat.address,
                        "whatsappId":dat.whatsappId,
                        "skypeId":dat.skypeId,
                        "createdBy": dat.createdBy,
                        "createdAt": dat.createdAt,
                        "updatedBy": dat.updatedBy,
                        "updatedAt": dat.updatedAt,
                        "isActive": dat.isActive,
                        "isDelete": dat.isDelete,
                        "countryCode": dat.countryCode,
                        "roleName": dat.roleName
                    }
                    arr.push(datalist);
                }
                const responseData = {
                    'success': true,
                    'message': "User list",
                    'data': arr
                }
                resolve(responseData);
            } else {
                const responseData = {
                    'success': false,
                    'message': "Data not found"
                }
                resolve(responseData);
            }
        })
    })
}

module.exports.userFatchListSoftDelete = () => {
    return new Promise((resolve, reject) => {
        return knex.select('u.id', 'u.userRoleId', 'u.companyId', 'u.username ', 
        'u.firstName', 'u.lastName', 'u.email', 'u.mobileNo', 'u.businessPhone', 
        'u.businessFax', 'u.title', 'u.address', 'u.image', 'u.createdBy', 
        'u.createdAt', 'u.updatedBy', 'u.updatedAt', 'u.isActive', 'u.isDelete', 
        'r.roleName')
        .from('users_management as u')
        .innerJoin('user_role_management as r', 'r.id', 'u.userRoleId').where({ 'u.isDelete': 'Y' }).orderBy('u.id', 'desc').then((data) => {
            if (data.length > 0) {
                const arr = [];
                for (dat of data) {
                    var datalist = {
                        "id": dat.id,
                        "userRoleId": dat.userRoleId,
                        "companyId": dat.companyId,
                        "username": dat.username,
                        "fullName": dat.firstName + " " + dat.lastName,
                        "firstName": dat.firstName,
                        "lastName": dat.lastName,
                        "email": dat.email,
                        "mobileNo": dat.mobileNo,
                        "businessPhone": dat.businessPhone,
                        "businessFax": dat.businessFax,
                        "title": dat.title,
                        "address": dat.address,
                        "createdBy": dat.createdBy,
                        "createdAt": dat.createdAt,
                        "updatedBy": dat.updatedBy,
                        "whatsappId":dat.whatsappId,
                        "skypeId":dat.skypeId,
                        "countryCode": dt.countryCode,
                        "updatedAt": dat.updatedAt,
                        "isActive": dat.isActive,
                        "isDelete": dat.isDelete,
                        "roleName": dat.roleName
                    }
                    arr.push(datalist);
                }
                const responseData = {
                    'success': true,
                    'message': "User list",
                    'data': arr
                }
                resolve(responseData);
            } else {
                const responseData = {
                    'success': false,
                    'message': "Data not found"
                }
                resolve(responseData);
            }
        })
    })
}
module.exports.loginUser = (userLogin) => {
    var username = userLogin.username;
    var mobile = userLogin.mobile;
    var password = userLogin.password;
    //var otp = userLogin.otp;
    return new Promise((resolve, reject) => {
        knex('users_management').where({ username: username }).then((userFound) => {
            if (userFound.length > 0) {
                for (var key in userFound) {
                    var resultdata = userFound[key];
                    var cpass = userFound[key].password;
                    var mobilenum = userFound[key].mobileNo;
                    var isdelete = userFound[key].isDelete;
                    var isactive = userFound[key].isActive;
                }
                //console.log(mobilenum + "===" + mobile)
                if (mobilenum === mobile) {
                    if (bcrypt.compareSync(password, cpass)) {
                        //// console.log(isdelete)
                        if (isdelete == 'Y') {
                            const responseData = {
                                'success': false,
                                'message': "Your account is not exists please contact admin"
                            }
                            resolve(responseData);
                        } else {
                            if (isactive == 'N') {
                                const responseData = {
                                    'success': false,
                                    'message': "Your account is Inactive please contact admin"
                                }
                                resolve(responseData);
                            } else {
                                const token = jwt.sign({
                                    id: userFound[key]._id,
                                    email: userFound[key].email,
                                    username: userFound[key].username
                                },
                                    'secretKey', {
                                    expiresIn: "365d"
                                });
                                //// console.log(token)
                                const responseData = {
                                    'success': true,
                                    'message': "Login successful",
                                    'token': token
                                }
                                resolve(responseData);
                            }
                        }
                    } else {
                        const responseData = {
                            'success': false,
                            'message': "Please enter correct password"
                        }
                        resolve(responseData);
                    }
                } else {
                    const responseData = {
                        'success': false,
                        'message': "Please enter correct mobile no "
                    }
                    resolve(responseData);
                }
            } else {
                const responseData = {
                    'success': false,
                    'message': "Please enter correct username"
                }
                resolve(responseData);
            }
        })

    })
}

module.exports.userRemove = (moduledelete) => {
    var id = moduledelete.id;
    return new Promise((resolve, reject) => {
        return knex('users_management').update({ isDelete: 'Y' }).where('id', id).then((data) => {
            if (data) {
                const responseData = {
                    'success': true,
                    'message': "User remove successfully"
                }
                resolve(responseData);
            }
        })
    })
}

//To Retrieve Deleted Data
module.exports.userRetrieve = (moduledelete) => {
    var id = moduledelete.id;
    return new Promise((resolve, reject) => {
        return knex('users_management').update({ isDelete: 'N' }).where('id', id).then((data) => {
            if (data) {
                const responseData = {
                    'success': true,
                    'message': "User retrieve successfully"
                }
                resolve(responseData);
            }
        })
    })
}

module.exports.userInfo = (data) => {
    //console.log(data.id);
    return new Promise((resolve, reject) => {
        return knex('users_management').where({ id: data.id }).then((data) => {
            if (data.length > 0) {
                var arr = [];
                for (dat of data) {
                    var resdata = {
                        'id': dat.id,
                        'userRoleId': dat.userRoleId,
                        'companyId': dat.companyId,
                        'username': dat.username,
                        'firstName': dat.firstName,
                        'lastName': dat.lastName,
                        'email': dat.email,
                        'mobileNo': dat.mobileNo,
                        "countryCode": dt.countryCode,
                        'businessPhone': dat.businessPhone,
                        'businessFax': dat.businessFax,
                        'title': dat.title,
                        'address': dat.address,
                        'createdBy': dat.createdBy,
                        'createdAt': dat.createdAt,
                        'whatsappId':dat.whatsappId,
                        'skypeId':dat.skypeId,
                        'updatedBy': dat.updatedBy,
                        'updatedAt': dat.updatedAt,
                        'isActive': dat.isActive
                    }
                    arr.push(resdata);
                }
                const responseData = {
                    'success': true,
                    'message': "User list",
                    'data': arr
                }
                resolve(responseData);
            } else {
                const responseData = {
                    'success': false,
                    'message': "Data not found"
                }
                resolve(responseData);
            }
        })
    })
}

module.exports.userUpdate = (data) => {
    var id = data.id;
    var username = data.username;
    var companyId = data.companyId;
    var mobileNo = data.mobileNo;
    var cmail = data.email;
    var email = cmail.toLowerCase();
    var userRoleId = data.userRoleId;
    var address = data.address;
    var firstName = data.firstName;
    var lastName = data.lastName;
    var image = data.image;
    return new Promise((resolve, reject) => {
        return knex('users_management').update({
            username: username,
            companyId: companyId,
            mobileNo: mobileNo,
            email: email,
            userRoleId: userRoleId,
            countryCode: data.countryCode,
            address: address,
            image:image,
            whatsappId:data.whatsappId,
            skypeId:data.skypeId,
            firstName: firstName,
            lastName: lastName
        }).where('id', id).then((data) => {
            if (data) {
                const responseData = {
                    'success': true,
                    'message': "Data successfully updated"
                }
                resolve(responseData);
            }
        })
    })

}