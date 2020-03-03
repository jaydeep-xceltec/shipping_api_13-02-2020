const knex = require('knex')(require('../knexfile'))
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const generator = require('generate-password');
const passwordHash = require('password-hash');
const bcrypt = require('bcrypt-nodejs');



module.exports.superAdminregister = (userRegister) => {
      //console.log(roleName.toLowerCase())
      var password = userRegister.password;
      var cmail = userRegister.email;
      var email = cmail.toLowerCase();
      var hash = bcrypt.hashSync(password);
            //console.log(hash);
            return new Promise((resolve, reject) => {
              knex('users_management').where({ email:email }).then((data) => {
         //// console.log(data)
         if(data[0]){
          const responseData = {
            'success': false,
            "message": "This email is already registered",

          }
          resolve(responseData)

        }else{

          return knex('users_management').insert({
            firstName  : userRegister.firstname,
            lastName   : userRegister.lastname,
            username   : userRegister.username,
            mobileNo   : userRegister.mobileno,
            password   : hash,
            resetToken : userRegister.otp,
            email      : email,
            userRoleId  : "1",
            companyId   : "1"
              // otp       : userRegister.otp
              // otpstutes  : userRegister.otpstutes
              
            }).then((result)=>{
              const responseData = {
                'success': true,
                "message": "Your account is created successfully"               
              }
              resolve(responseData)
            });
          }
        })
            }) 
          }

module.exports.superAdminlogin = (userLogin) => {

            var cmail = userLogin.email;
            var email = cmail.toLowerCase();
            var password=userLogin.password;
            var otp = userLogin.otp;

            return new Promise((resolve, reject) => {
          //const { salt, hash } = saltHashPassword({ password })

          knex('users_management').where({ email:email }).then((userFound) => {
            for(var key in userFound){
              var resultdata = userFound[key];
              var cpass = userFound[key].password;
              var roleid = userFound[key].userRoleId;
            }
            
            if(userFound.length>0){
              if(roleid == 1 || roleid == 2 ){
                if(bcrypt.compareSync(password, cpass)){

                  const token = jwt.sign({
                   id     : userFound[key]._id,
                   email  : userFound[key].email,
                   username: userFound[key].username
                 },
                 'secretKey', {
                   expiresIn: "365d"
                 });
                    //console.log(token)
                    const responseData = {
                      'success': true,
                      'message': "Login successfully",
                      'token': token,
                      'data' : resultdata        
                    }
                    resolve(responseData);

                  }
                  else {

                    const responseData = {
                      'success': false,
                      'message': "Please enter correct password"
                    }
                    resolve(responseData);
                  }
                }else{
                  const responseData = {
                    'success': false,
                    'message': "Only super admin can login here"
                  }
                  resolve(responseData);
                }
              }else{

                const responseData = {
                  'success': false,
                  "message": "Your account is not exist please create new account"

                }
                resolve(responseData);

              }


            })
        })
          }

module.exports.forgotpassword = (forgot) => {
            var cmail = forgot.email;
            var email = cmail.toLowerCase();
      //// console.log(email)
      return new Promise((resolve, reject) => {

        knex('users_management').where({ 'email':email }).then(user => {

          if (user.length>0) {
            //// console.log(user);
            for(dat of user){
              // var user =user[key];
              var userid = dat.id;
            }
            var password = generator.generate({
              length: 10,
              numbers: true
            });
            bcrypt.genSalt(10, function(err, salt) {
              if (err) {
                return next(err);
              }
              bcrypt.hash(password, salt, null, function(err, hash) {
                if (err) {
                  return next(err);
                }
                var password = hash;
                var id = userid;

                knex('users_management').update({ password:password}).where('id',id).then((dara) => {}).catch((error) =>console.log('error = ' + error))
              });
            });
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'charterparty2019@gmail.com',
                pass: 'nyzfungfcrywpoea'
              }
            });

            var mailOptions = {
              from: 'charterparty2019@gmail.com',
              to: email,
              subject: 'Forgot Password  ',
              text: 'Hello,\n' +

              'Congrats! You are successfully added as "User Management" by Admin. \n\n'
              +
              'User credentials are: \n' +
               'Login URL: "http://cp-admin-production.herokuapp.com" \n' +     
              'User ID: ' + userRegister.email + '\n' +
              'Password: ' + password + '\n\n' +

              'Thanks'
                        // Password: password
                      };

                     // console.log(password);

                      transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                         // console.log(error);
                        } else {
                          const responseData = {
                            'success': true,
                            'message': ' Email send successfully .',
                            'data': info
                          }
                          resolve(responseData)
                            // .catch((error) => reject('userId not found'))

                            //// console.log('Email sent: ' + info.response);
                            // res.send(info)
                          }
                        });
                    }else {
                      const responseData = {
                        success: false,
                        message: 'Emailid not found'
                      }
                      resolve(responseData)
                    }
                  });
      });
    }

module.exports.changePassword = (cpassword) => {
     var id = cpassword.id;
     var oldpassword = cpassword.oldpassword;
     var newpassword = cpassword.newpassword;
     var hash = bcrypt.hashSync(newpassword);
     return new Promise((resolve,reject) => {
      knex('users_management').where({ id:id }).then((userFound) => {
        for(var key in userFound){
          var cpass = userFound[key].password;
        }
           //console.log(cpass);

           if(userFound.length>0){
            if(bcrypt.compareSync(oldpassword, cpass)){
              return knex('users_management').update({password:hash}).where('id',id).then((data) =>{
               const responseData = {
                'success': true,
                'message': "password successfully changed"       
              }
              resolve(responseData);
            })        
            }else {

              const responseData = {
                'success': false,
                'message': "old password not matched"
              }
              resolve(responseData);
            }
          }else{

            const responseData = {
              'success': false,
              "message": "Invalid user id"

            }
            resolve(responseData);

          }


        })



    })

   }