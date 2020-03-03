const knex = require('knex')(require('../knexfile'))
const bcrypt = require('bcrypt-nodejs');
const nodemailer = require('nodemailer');

module.exports.companyadminList = () => {
  return new Promise((resolve, reject) => {
    knex.select('users_management.*', 'company_management.companyName').from('users_management').innerJoin('company_management', 'users_management.companyid', 'company_management.id').where({ 'users_management.userRoleId': '5', 'users_management.isDelete': 'N', 'company_management.isDelete': 'N' }).orderBy('users_management.id', 'desc').then((data) => {
      if (data.length > 0) {
        var arr = [];
        for (dat of data) {
          var resultdata = {
            'id': dat.id,
            'companyName': dat.companyName,
            'userRoleId': dat.userRoleId,
            'companyId': dat.companyId,
            'username': dat.username,
            'fullName': dat.firstName + " " + dat.lastName,
            'firstName': dat.firstName,
            'lastName': dat.lastName,
            'email': dat.email,
            'mobileNo': dat.mobileNo,
            'businessPhone': dat.businessPhone,
            'businessFax': dat.businessFax,
            'title': dat.title,
            'whatsappId':dat.whatsappId,
            'skypeId':dat.skypeId,
            'address': dat.address,
            'createdBy': dat.createdBy,
            'createdAt': dat.createdAt,
            'updatedBy': dat.updatedBy,
            'updatedAt': dat.updatedAt,
            'isActive': dat.isActive
          }
          arr.push(resultdata);
        }
        const responseData = {
          'success': true,
          'message': "company admin list",
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

module.exports.companyadminListSoftDelete = () => {
  return new Promise((resolve, reject) => {
    knex.select('users_management.*', 'company_management.companyName').from('users_management').innerJoin('company_management', 'users_management.companyid', 'company_management.id').where({ 'users_management.userRoleId': '5', 'users_management.isDelete': 'Y', 'company_management.isDelete': 'Y' }).orderBy('users_management.id', 'desc').then((data) => {
      if (data.length > 0) {
        var arr = [];
        for (dat of data) {
          var resultdata = {
            'id': dat.id,
            'companyName': dat.companyName,
            'userRoleId': dat.userRoleId,
            'companyId': dat.companyId,
            'username': dat.username,
            'fullName': dat.firstName + " " + dat.lastName,
            'firstName': dat.firstName,
            'lastName': dat.lastName,
            'email': dat.email,
            'mobileNo': dat.mobileNo,
            'businessPhone': dat.businessPhone,
            'businessFax': dat.businessFax,
            'title': dat.title,
            'whatsappId':dat.whatsappId,
            'skypeId':dat.skypeId,
            'address': dat.address,
            'createdBy': dat.createdBy,
            'createdAt': dat.createdAt,
            'updatedBy': dat.updatedBy,
            'updatedAt': dat.updatedAt,
            'isActive': dat.isActive
          }
          arr.push(resultdata);
        }
        const responseData = {
          'success': true,
          'message': "company admin list",
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

module.exports.companyadminCreate = (userRegister) => {
  var cmail = userRegister.email;
  var email = cmail.toLowerCase();

  var password = Math.random().toString(36).slice(-8);
  var username = userRegister.username;
  return new Promise((resolve, reject) => {
    knex('users_management').where({ email: email }).orWhere({ username: username }).then((data) => {
      //console.log(data)
      if (data[0]) {
        const responseData = {
          'success': false,
          "message": "This username and email is already registered"
        }
        resolve(responseData)

      } else {
        console.log(userRegister);
        
        var hash = bcrypt.hashSync(password);
        return knex('users_management').insert({
          username: userRegister.username,
          companyId: userRegister.companyId,
          mobileNo: userRegister.mobileNo,
          email: userRegister.email,
          password: hash,
          userRoleId: userRegister.userRoleId,
          address: userRegister.address,
          whatsappId:userRegister.whatsappId,
          skypeId:userRegister.skypeId,
          firstName: userRegister.firstName,
          lastName: userRegister.lastName,
          createdBy: userRegister.createdBy,
          updatedBy: userRegister.createdBy
        }).then((result) => {
          //mail send start
console.log(userRegister);

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
          var mailOptions = {
            from: 'charterparty2019@gmail.com',
            to: userRegister.email,
            subject: 'successfully Create user',
            text: 'Hello,\n' +

              'Congrats! You are successfully added as "Company Admin" by Super Admin Admin. \n\n'
              +
              'User credentials are: \n' +
              'Login URL : "http://shipping-final.herokuapp.com" \n' +
              'User Name : ' + userRegister.username + '\n' +
              'Mobile No.: ' + userRegister.mobileNo + '\n' +
              'Password: ' + password + '\n\n' +

              'Thanks !'
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              // console.log(error);
            }
          });

          //mail send close
          const responseData = {
            'success': true,
            "message": "Your company admin account is created successfully"
          }

          console.log("mailsend",responseData);
          
          resolve(responseData)
        });
      }
    })
  })
}

module.exports.companyadminUpdate = (data) => {
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
  var whatsappId=data.whatsappId;
  var skypeId=data.skypeId;   
  var businessPhone = data.businessPhone;
  var hash = bcrypt.hashSync(data.password);
  return new Promise((resolve, reject) => {
    return knex('users_management').update({
      username: username,
      companyId: companyId,
      mobileNo: mobileNo,
      email: email,
      password: hash,
      userRoleId: userRoleId,
      whatsappId:whatsappId,
      skypeId:skypeId,
      address: address,
      firstName: firstName,
      lastName: lastName,
      businessPhone: businessPhone
    }).where('id', id).then((data) => {
      if (data) {
        const responseData = {
          'success': true,
          'message': "Data successfully updated"
        }
        resolve(responseData);
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

module.exports.companyadminDelete = (data) => {
  var id = data.id;
  return new Promise((resolve, reject) => {
    return knex('users_management').update({ isDelete: 'Y' }).where('id', id).then((data) => {
      if (data) {
        const responseData = {
          'success': true,
          'message': "Company Admin remove successfully"
        }
        resolve(responseData);
      }
    })
  })
}

//To Retrieve Deleted Data
module.exports.companyadminretrieve = (data) => {
  var id = data.id;
  return new Promise((resolve, reject) => {
    return knex('users_management').update({ isDelete: 'N' }).where('id', id).then((data) => {
      if (data) {
        const responseData = {
          'success': true,
          'message': "Company Admin retrieve successfully"
        }
        resolve(responseData);
      }
    })
  })
}

module.exports.companyStatusUpdate = (data) => {
  var id = data.id;

  console.log("data",data);
  
  return new Promise((resolve, reject) => {
    return knex('users_management').update(
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
