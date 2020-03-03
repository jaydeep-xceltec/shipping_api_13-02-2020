const knex = require('knex')(require('../knexfile'))
const bcrypt = require('bcrypt-nodejs');
const nodemailer = require('nodemailer');

module.exports =
{
    OwnerCreate(userRegister)
    {
        var email = userRegister.email.toLowerCase();
        var fName = userRegister.firstName;
        var lName = userRegister.lastName;
        var fristname = fName.charAt(0).toUpperCase() + fName.slice(1)
        var lastname = lName.charAt(0).toUpperCase() + lName.slice(1)
        var username = userRegister.username;
        var data = userRegister.data;
        
        return new Promise((resolve,reject) =>
        {
            knex('users_management').where({ email:email }).orWhere({username:username}).then((data) =>
            {
                if(data[0])
                {
                    const responseData =
                    {
                        'success': false,
                        "message": "This username and email is already registered"
                    }
                    
                    resolve(responseData)

                } else {

                    var hash = bcrypt.hashSync(userRegister.password);

                    var insertdata =
                    {
                        username : userRegister.username,
                        companyId : userRegister.companyId,
                        mobileNo : userRegister.mobileNo,
                        email : email,
                        password : hash,
                        userRoleId : userRegister.userRoleId,
                        address : userRegister.address,
                        firstName : fristname,
                        lastName : lastname,
                        title : userRegister.title,
                        businessPhone : userRegister.businessPhone,
                        createdBy : userRegister.createdBy,
                        updatedBy : userRegister.updatedBy,
                        isActive : 'Y',
                        isDelete : 'N'
                    }

                    return knex('users_management').insert(insertdata).then(async (result)=>
                    {
                        if(result)
                        {
                            if(userRegister.data)
                            {
                                for (dat of userRegister.data)
                                {
                                    var activitydata =
                                    {
                                        systemActivityId : dat.Id,
                                        systemActivityAlertId : dat.parentId,
                                        userId : result,
                                        createdBy : userRegister.createdBy,
                                        updatedBy : userRegister.updatedBy,
                                        isActive : 'Y',
                                        isDelete : 'N'
                                    }

                                    await knex('user_allow_system_activity_alerts').insert(activitydata);
                                }
                            
                            } else {

                                const responseData =
                                {
                                    'success': true,
                                    "message": "Alert Data not found but broker created successfully"
                                }
                                resolve(responseData)
                            }

                        } else {

                            const responseData =
                            {
                                'success': true,
                                "message": "User id Not found so alert not save"
                            }

                            resolve(responseData)
                        }
                        
                        var transporter = nodemailer.createTransport(
                        {
                            service: 'Gmail',
                            host: "Smtp.gmail.com",
                            port: 465,
                            secure: true,
                            auth:
                            {
                                user: 'phpbatch34@gmail.com',
                                pass: '123@@123'
                            }
                        });

                        var mailOptions =
                        {
                            from: 'youremail@gmail.com',
                            to: email,
                            subject: 'successfully Create user',
                            text:'Hello,\n' +
                            'Congrats! You are successfully added as "Broker" by Broker Management Admin. \n\n'
                            +'User credentials are: \n' +
                            'User ID: ' + email + '\n' +
                            'Password: ' + userRegister.password + '\n\n' +
                            'Thanks'
                        };

                        transporter.sendMail(mailOptions, function(error, info)
                        {
   
                        });

                        var mailOptions =
                        {
                            from: 'youremail@gmail.com',
                            to: 'cpdemo62@gmail.com',
                            subject: 'successfully Create user',
                            text:'Hello,\n' +
                            'You have succefully created user in "Broker Management".\n\n'
                            +'User credentials are: \n' +
                            'User ID: ' + email + '\n' +
                            'Password: ' + userRegister.password + '\n\n' +
                            'Thanks'
                        };

                        transporter.sendMail(mailOptions, function(error, info)
                        {});

                        const responseData =
                        {
                            'success': true,
                            "message": "Your Broker Account is created successfully."
                        }
                        
                        resolve(responseData)

                    });

                }
        
            })
        
        })
    },

    OwnerRecords()
    {
        return new Promise((resolve,reject) =>
        {
            var array =[]
            knex.select('users_management.*','company_management.companyName').from('users_management').innerJoin('company_management','users_management.companyid','company_management.id').where({'users_management.userRoleId':'6','users_management.isDelete':'N','company_management.isDelete':'N'}).orderBy('users_management.id', 'desc').then((data) =>
            {
            
                for(var i of data)
                {
                    var fatcheddata=
                    {
                        id : i.id,
                        username : i.username,
                        fullName : i.firstName + " " + i.lastName, 
                        firstName : i.firstName,
                        lastName : i.lastName,
                        email : i.email,
                        mobileNo : i.mobileNo,
                        companyName : i.companyName
                    }
                    array.push(fatcheddata);
                }
            
                const responseData =
                {
                    'success':true,
                    'message':"Broker list",
                    'data':array
                }
                resolve(responseData);
            })
        })
    },

    OwnerDetails(data)
    {
        var id = data.id;

        return new Promise( async (resolve,reject) =>
        {

            if(id)
            {
                await knex.select('u.*','c.companyName','r.roleName').from('users_management as u').innerJoin('company_management as c','u.companyid','c.id').innerJoin('user_role_management as r','u.userRoleId','r.id').where({'u.id':id,'u.userRoleId':'6','u.isDelete':'N','c.isDelete':'N'}).then( async (datares) => 
                {
                    if(datares[0]==undefined)
                    {
                        const responseData =
                        {
                            'success':false,
                            'message':"data not found",
                        }
                        resolve(responseData);

                    } else {

                        var newdata = await datares;
                        var newarray=[];
                        var arr = [];
                        var count=0;

                        for(datid of newdata)
                        {
                            await knex.select('user_allow_system_activity_alerts.id','user_allow_system_activity_alerts.systemActivityId','user_allow_system_activity_alerts.systemActivityAlertId','user_allow_system_activity_alerts.createdBy','user_allow_system_activity_alerts.updatedBy').from('user_allow_system_activity_alerts').where({userId:datid.id}).then((alertdata) =>
                            {
                                newarray.push(alertdata);
                            });

                            var temp =
                            {
                                'id' : datid.id,
                                'roleName' : datid.roleName,
                                'companyId': datid.companyId,
                                'userRoleId':datid.userRoleId,
                                'username' : datid.username,
                                'firstName' : datid.firstName,
                                'lastName' : datid.lastName,
                                'email' : datid.email,
                                'mobileNo' : datid.mobileNo,
                                'businessPhone' : datid.businessPhone,
                                'title' : datid.title,
                                'address' : datid.address,
                                'createdBy' : datid.createdBy,
                                'updatedBy' : datid.updatedBy,
                                'companyName' : datid.companyName,
                                'alertdata' : newarray[count]
                            };

                            arr.push(temp);
                            count++;
                        }

                        const responseData =
                        {
                            'success':true,
                            'message':"Broker Detail list",
                            'data':arr
                        }
                        resolve(responseData);

                    }

                }) 
            
            } else {

                const responseData =
                {
                    'success':false,
                    'message':"please insert id",
                }
                
                resolve(responseData);
            }
        })
    },

    OwnerEdit(updatedata)
    {
        var id = updatedata.id;
        var username = updatedata.username;
        var companyId = updatedata.companyId;
        var mobileNo = updatedata.mobileNo;
        var email = updatedata.email.toLowerCase();
        var userRoleId = updatedata.userRoleId;
        var address = updatedata.address;
        var fname = updatedata.firstName;
        var lname = updatedata.lastName;
        var firstName = fname.charAt(0).toUpperCase() + fname.slice(1)
        var lastName = lname.charAt(0).toUpperCase() + lname.slice(1)
        var businessPhone = updatedata.businessPhone;
        var createdBy = updatedata.createdBy;
        var updatedBy = updatedata.updatedBy;
        var hash = bcrypt.hashSync(updatedata.password);

        return new Promise(async(resolve,reject) =>
        {
            var brokercreate =
            {
                username : username,
                companyId : companyId,
                mobileNo : mobileNo,
                email : email,
                password : hash,
                userRoleId : userRoleId,
                address : address,
                businessPhone : businessPhone,
                firstName : firstName,
                lastName : lastName,
                updatedBy : updatedBy
            };

            await knex('users_management').update(brokercreate).where('id',id).then( async (result) =>
            {
                if(result)
                {
                    if(updatedata.data)
                    {
                        for (dat of updatedata.data)
                        {
                            await knex('user_allow_system_activity_alerts').insert(
                            {
                                systemActivityId : dat.Id,
                                systemActivityAlertId : dat.parentId,
                                userId : updatedata.id,
                                createdBy : updatedata.createdBy,
                                updatedBy : updatedata.updatedBy,
                                isActive : 'Y',
                                isDelete : 'N'
                            })
                        }

                    } else {

                        const responseData =
                        {
                            'success': false,
                            "message": "Alert Data not found"
                        }

                        resolve(responseData)
                    }

                    const responseData =
                    {
                        'success':true,
                        'message':"Broker updated successfully"
                    }

                    resolve(responseData);
                
                } else {

                    const responseData =
                    {
                        'success': false,
                        "message": "User id Not found so alert not save"
                    }
                    resolve(responseData)
                }
            })
        })
    },

    OwnerDelete(data)
    {
        var id = data.id;
        return new Promise((resolve,reject) =>
        {
            return knex('users_management').update({'isDelete':'Y'}).where('id',id).then((data) =>
            {
                if(data)
                {
                    const responseData =
                    {
                        'success': true,
                        'message':"Broker remove successfully"
                    }
                    resolve(responseData);
                }
            })
        })
    }
}















































