const crypto = require('crypto')
 
const knex = require('knex')(require('../knexfile'))
require('dotenv');
const bcrypt = require('bcrypt-nodejs');
const generator = require('generate-password');
const passwordHash = require('password-hash');
const nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');

module.exports = {
  register(userRegister){
      
    var password = userRegister.password;
    var email = userRegister.email;
    return new Promise((resolve, reject) => {
      knex('users_management').where({ email:email }).then((data) => {
         // console.log(data)
          if(data[0]){
              const responseData = {
                'success': false,
                "Message": "this email is already registered",
                
              }
              resolve(responseData)
      
          }else{
            //var hash = bcrypt.hashSync(userRegister.password);
            return knex('users_management').insert({
              username   : userRegister.username,
              companyId  : userRegister.companyId,
              mobileno   : userRegister.mobileno,
              email      : userRegister.email,
              password   : userRegister.password,
              userRoleId : userRegister.userRoleId,
              firstName  : userRegister.firstName,
              lastName   : userRegister.lastName,
              createdBy  : userRegister.createdBy,
              updatedBy  : userRegister.updatedBy
            }).then((result)=>{
              const responseData = {
                'success': true,
                "Message": "successfully insert data"               
              }
              resolve(responseData)
            });
          }
        })
      }) 
    },
    login (userLogin) {

      var email = userLogin.email;
      var password=userLogin.password;
      return new Promise((resolve, reject) => {
          //const { salt, hash } = saltHashPassword({ password })
            
        knex('users_management').where({ email:email }).then((userFound) => {
          for(var key in userFound){
              var resultdata = userFound[key];
          }
         // console.log(resultdata)
           if(userFound){
            //console.log(userFound[key])
          // var passd= bcrypt.compareSync(password, userFound[key].password); // true
           // bcrypt.compareSync("veggies", hash); // fals
           //console.log(passd)
           //userFound.comparePassword(password, userFound.password, (err, isMatch) => {
            if(password == userFound[key].password){
                const token = jwt.sign({
                       id     : userFound[key]._id,
                       email  : userFound[key].email,
                      username: userFound[key].username
                  },
                    'secretKey', {
                       expiresIn: "365d"
                });
                 // console.log(token)
                  const responseData = {
                    'success': true,
                    'message': "Login successful",
                    'token': token,
                    'data': resultdata        
                  }
                  resolve(responseData);
            }else {
                        
                const responseData = {
                    'success': false,
                    'message': "Password incorrect"

                }
                resolve(responseData);

            }
          }else if(userFound.length>0){
            const responseData = {
              'success': false,
              "Message": "user registration require"
                
            }
            resolve(responseData)
       
          }
        

        })
      })
    }

  }
    function saltHashPassword ({
  password,
  salt = randomString()
}) {
  const hash = crypto
    .createHmac('sha512', salt)
    .update(password)
  return {
    salt,
    hash: hash.digest('hex')
  }
}

function randomString () {
  return crypto.randomBytes(4).toString('hex')
}


