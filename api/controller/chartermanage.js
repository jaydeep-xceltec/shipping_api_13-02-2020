const knex = require('knex')(require('../knexfile'))
const bcrypt = require('bcrypt-nodejs');
const nodemailer = require('nodemailer');

module.exports.charterCreate = (userRegister) => {
  var cmail = userRegister.email;
  var email = cmail.toLowerCase();
  var username = userRegister.username;
  var  data = userRegister.data;
  return new Promise((resolve,reject) => {
   knex('users_management').where({ email:email}).where({username:username}).then((data) => {
          //console.log(data)
          if(data[0]){
            const responseData = {
              'success': false,
              "message": "This username and email is already registered"
            }
            resolve(responseData)

          }else{
            var hash = bcrypt.hashSync(userRegister.password);
            return knex('users_management').insert({
              username   : userRegister.username,
              companyId  : userRegister.companyId,
              mobileNo   : userRegister.mobileNo,
              email      : userRegister.email,
              password   : hash,
              userRoleId : userRegister.userRoleId,
              address    : userRegister.address,
              firstName  : userRegister.firstName,
              lastName   : userRegister.lastName,
              businessPhone : userRegister.businessPhone,
              createdBy  : userRegister.createdBy,
              isActive   : 'Y',
              isDelete   : 'N'
            }).then(async (result)=>{ 
              //console.log(result);
              if(result){
                if(userRegister.data){
                  for (dat of userRegister.data){
                         //console.log(dat.Id + "=" + dat.parentId);
                         await  knex('user_allow_system_activity_alerts').insert({
                          systemActivityId      : dat.Id,
                          systemActivityAlertId : dat.parentId,
                          userId                : result,
                          createdBy             : userRegister.createdBy,
                          isActive              : 'Y',
                          isDelete              : 'N'
                        })
                       }
                     }else{
                      const responseData = {
                       'success': true,
                       "message": "Alert Data not found but charter created successfully"               
                     }
                     resolve(responseData)
                   }
                 }else{
                  const responseData = {
                   'success': false,
                   "message": "User id Not found so alert not save"               
                 }
                 resolve(responseData)
               }
           //mail send start
           var transporter = nodemailer.createTransport({
             service: 'Gmail',
             host: "Smtp.gmail.com",
             port: 465,
             secure: true,
             auth: {
               user: 'phpbatch34@gmail.com',
               pass: '123@@123'
             }
           });
           var mailOptions = {
             from: 'youremail@gmail.com',
             to: email,
             subject: 'successfully Create user',
             text:'Hello,\n' + 
             'Congrats! You are successfully added as "Charterer" by Charter Party Admin. \n\n'
             +'User credentials are: \n' + 
             'User ID: ' + userRegister.email + '\n' + 
             'Password: ' + userRegister.password + '\n\n' +
             'Thanks'
           };
           transporter.sendMail(mailOptions, function(error, info) {
             if (error) {
              // console.log(error);
             }
           });
           var mailOptions = {
             from: 'youremail@gmail.com',
             to: 'cpdemo62@gmail.com',
             subject: 'successfully Create user',
             text:'Hello,\n' +
             'You have succefully created user in "Charter Management".\n\n'
             +'User credentials are: \n' + 
             'User ID: ' + userRegister.email + '\n' + 
             'Password: ' + userRegister.password + '\n\n' +
             'Thanks'
           };
           transporter.sendMail(mailOptions, function(error, info) {
             if (error) {
              // console.log(error);
             }
           });
    //mail send close
    const responseData = {
      'success': true,
      "message": "Your charterer account is created successfully"               
    }
    resolve(responseData)
  });
          }
        })
})
}

module.exports.charterList = () => {
  return new Promise((resolve,reject) => {
    knex.select('users_management.*','company_management.companyName').from('users_management').innerJoin('company_management','users_management.companyid','company_management.id').where({'users_management.userRoleId':'4','users_management.isDelete':'N','company_management.isDelete':'N'}).orderBy('users_management.id', 'desc').then((data) =>{
      if(data.length>0){
        var arr = [];
       for(dat of data){
           var resdata = {
          'id'                  : dat.id,
          'companyName'         : dat.companyName,
          'userRoleId'          : dat.userRoleId,
          'companyId'           : dat.companyId,
          'username'            : dat.username,
          'fullName'            : dat.firstName + " " + dat.lastName,
          'firstName'           : dat.firstName,
          'lastName'            : dat.lastName,
          'email'               : dat.email,
          'mobileNo'            : dat.mobileNo,
          'businessPhone'       : dat.businessPhone,
          'businessFax'         : dat.businessFax,
          'title'               : dat.title,
          'address'             : dat.address,
          'createdBy'           : dat.createdBy,
          'createdAt'           : dat.createdAt,
          'updatedBy'           : dat.updatedBy,
          'updatedAt'           : dat.updatedAt,
          'isActive'            : dat.isActive
           }
            arr.push(resdata);
      }
      const  responseData = {
          'success':true,
          'message':"charterer list",
          'data':arr
        }
        resolve(responseData);
    }else{
      const  responseData = {
        'success':false,
        'message':"Data not found"
      }
      resolve(responseData);
    }

  })
  })
}

module.exports.charterDetails = (data) => {
  var   id = data.id;
  return new Promise( async (resolve,reject) => {
    if(id){
      await knex.select('u.*','c.companyName','r.roleName').from('users_management as u').innerJoin('company_management as c','u.companyid','c.id').innerJoin('user_role_management as r','u.userRoleId','r.id').where({'u.id':id,'u.userRoleId':'4','u.isDelete':'N','c.isDelete':'N'}).then( async (datares) => {
        if(datares[0] == undefined){
         const  responseData = {
          'success':false,
          'message':"Data not found"
        }
        resolve(responseData);
      }else {
        var newdata = await datares;
        var newarray=[];
        var arr = [];
        var count=0;
        for(datid of newdata){
          await knex.select('user_allow_system_activity_alerts.id','user_allow_system_activity_alerts.systemActivityId','user_allow_system_activity_alerts.systemActivityAlertId','user_allow_system_activity_alerts.createdBy','user_allow_system_activity_alerts.updatedBy').from('user_allow_system_activity_alerts').where({userId:datid.id}).then((alertdata) => {
            newarray.push(alertdata) ;
                    //console.log(alertdata);
                  })
          var temp = {
            'id' : datid.id,
            'username' : datid.username,
            'firstName': datid.firstName,
            'lastName':datid.lastName,
            'email':datid.email,
            'mobileNo':datid.mobileNo,
            'businessPhone':datid.businessPhone,
            'title':datid.title,
            'companyName':datid.companyName,
            'roleName':datid.roleName,
            'userRoleId':datid.userRoleId,
            'companyId':datid.companyId,
            'address':datid.address,
            'password':datid.password,
            'createdBy':datid.createdBy,
            'updatedBy':datid.updatedBy,
            'alertdata' :newarray[count]
          };
          arr.push(temp);
          count++;  
        }
        const  responseData = {
          'success':true,
          'message':"charterer Detailslist",
          'data':arr
        }
        resolve(responseData);
      }
      
    })
    }else{
      const  responseData = {
        'success':false,
        'message':"please provide id"
      }
      resolve(responseData);
    }
  })
}

module.exports.charterUpdate = (updatedata) => {
  var id         = updatedata.id;
  var username   = updatedata.username;
  var companyId  = updatedata.companyId;
  var mobileNo   = updatedata.mobileNo;
  var cmail = updatedata.email;
  var email = cmail.toLowerCase();
  var userRoleId = updatedata.userRoleId;
  var address    = updatedata.address;
  var firstName  = updatedata.firstName;
  var lastName   = updatedata.lastName;
  var businessPhone = updatedata.businessPhone;
  var createdBy  = updatedata.createdBy;
  var updatedBy   = updatedata.updatedBy;
  var hash = bcrypt.hashSync(updatedata.password);
  return new Promise((resolve,reject) => {
    knex('user_allow_system_activity_alerts').delete().where('userId',id).then( (deletealertdata) =>{        
    })
    return knex('users_management').update({
     username   : username,
     companyId  : companyId,
     mobileNo   : mobileNo,
     email      : email,
     password   : hash,
     userRoleId : userRoleId,
     address    : address,
     businessPhone : businessPhone,
     firstName  : firstName,
     lastName   : lastName,
     updatedBy  : updatedBy 
   }).where('id',id).then( async (result) =>{
      //console.log(result);
      if(result){
        if(updatedata.data){
         for (dat of updatedata.data){
            //console.log(dat.Id + "=" + dat.parentId);
            await  knex('user_allow_system_activity_alerts').insert({
              systemActivityId      : dat.Id,
              systemActivityAlertId : dat.parentId,
              userId                : updatedata.id,
              createdBy             : updatedata.createdBy,
              updatedBy             : updatedata.updatedBy,
              isActive              : 'Y',
              isDelete              : 'N'
            })
          }
        }else{
          const responseData = {
           'success': true,
           "message": "Alert Data not found but charterer updated successfully"               
         }
         resolve(responseData)
       }
     }else{
      const responseData = {
       'success': false,
       "message": "User id Not found"               
     }
     resolve(responseData)
   }

   const  responseData = {
    'success':true,
    'message':"Charterer updated successfully"
  }
  resolve(responseData);

})
 })
}

module.exports.charterDelete = (data) => {
  var id = data.id;
  return new Promise((resolve,reject) => {
    return knex('users_management').update({'isDelete':'Y'}).where('id',id).then((data) => {
      if(data){
        const responseData = {
         'success': true,
         'message':"charterer remove successfully"
       }
       resolve(responseData);
     }else{
      const responseData = {
        'success': false,
        'message':"id not found"
      }
      resolve(responseData);
    }
  })
  })
}
