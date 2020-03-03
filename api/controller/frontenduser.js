const knex = require('knex')(require('../knexfile'));
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const generator = require('generate-password');
const passwordHash = require('password-hash');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
	login(userLogin){
		var username = userLogin.username;
		var password = userLogin.password;
		var mobileNo = userLogin.mobile;
		var c_code = userLogin.country_code;
		
		return new Promise((resolve, reject) => {
			
			knex('users_management').where({ 'username':username}).then((userFound) => {
				
				for(var key in userFound){
					var resultdata = userFound[key];
					var cpass = userFound[key].password;
					var isdelete = userFound[key].isDelete;
					var isactive = userFound[key].isActive;
					var country_code = userFound[key].country_code;
				}
				if(userFound.length>0){
					if(bcrypt.compareSync(password, cpass)){
						if(mobileNo==userFound[key].mobileNo){
							if(country_code == c_code){
							if(isdelete == 'Y'){
								const responseData = {
									'success': false,
									'message': "Your account is not exists please contact admin" 
								}
								resolve(responseData);
							}else{
								if(isactive == 'N'){
									const responseData = {
										'success': false,
										'message': "Your account is Inactive please contact admin" 
									}
									resolve(responseData);
								}else{
									const token = jwt.sign({
										id : userFound[key].id,
										email : userFound[key].email,
										username : userFound[key].username,
										image : userFound[key].image,
										mobileNo : userFound[key].mobileNo,
										businessPhone : userFound[key].businessPhone,
										businessFax : userFound[key].businessFax,
										title : userFound[key].title
									},
									'secretKey', {
										expiresIn: "365d"
									});
									//console.log(token)
									const responseData = {
										'success': true,
										'message': "Login successfully",
										'token': token,
										'data': resultdata 
									}
									resolve(responseData);
								}
							}
						}else{
							const responseData = {
								'success': false,
								'message': "country Code not match"
							}
						}
						}else{
							const responseData = {
								'success': false,
								'message': "Please enter correct Mobile No "
							}
							resolve(responseData);
						}
					}else {
						
						const responseData = {
							'success': false,
							'message': "Please enter correct password"
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
		
		
	},
	changePassword(cpassword){
		var id = cpassword.id;
		var oldpassword = cpassword.oldpassword;
		var newpassword = cpassword.newpassword;
		var hash = bcrypt.hashSync(newpassword);
		return new Promise((resolve,reject) => {
			if(id){
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

			}else{
				resolve({'message':'id not found'})
			}

		})

	},
forgotpassword (forgot)
{
	var email = forgot.email;
	return new Promise((resolve, reject) =>
	{
		knex('users_management').where({ 'email':email }).then(user =>
		{
			if (user.length>0)
			{
				for(dat of user)
				{
					var userid = dat.id;
				}
				var resetToken = Math.floor(100000 + Math.random() * 900000)
				knex('users_management').update({'resetToken':resetToken}).where('id',userid).then((dara) => {}).catch((error) =>console.log('error = ' + error))
			
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
					subject: 'Forgot Password ',
					//text: 'That is the reset Password link click here! = ' + 'http://shipping-final.herokuapp.com/pages/auth/reset-password?resetToken='+resetToken,
					text: 'That is the reset Password link click here! = ' + 'http://localhost:4200/#/pages/auth/reset-password?resetToken='+resetToken,
				};
			
				transporter.sendMail(mailOptions, function(error, info)
				{
					if (error){} else 
					{
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
		} else {
			const responseData =
			{
				success: false,
				message: 'Email not found'
			}
			resolve(responseData)
		}
		});
	});
},

resetPassword(resetpass)
{
	console.log('resetpass',resetpass);
	var resetToken = resetpass.resetToken;
	var newtoken = Math.floor(100000 + Math.random() * 900000);
	var changepassword = resetpass.resetpassword;
	var hash = bcrypt.hashSync(changepassword);
	return new Promise((resolve,reject) => {
		knex('users_management').where({ 'resetToken':resetToken }).then( async(user) => {

			if(Object.keys(user).length>0){
				await knex('users_management').update({'password':hash,'resetToken':newtoken}).where('resetToken',resetToken).then((data) =>{
					if(!data){
						resolve({'message':'password not set'})
					}else{

						const responseData = {
							'success': true,
							'message': "password successfully reset" 
						}
						console.log('responseData',responseData);
						resolve(responseData);
					}
				}) 

			}else{
				resolve({'message':'token not match'})
			}
		})
	})
},
systemActivityAlert(alertlist){
	var userid = alertlist.userid;
	return new Promise(async(resolve,reject) => {
		if(userid){

			await knex('user_allow_system_activity_alerts').where({userId:userid}).then((alertdata) => {

				if(!alertdata){
					resolve({'message':'data not found'})

				}else{

					var responseData={
						'success':true,
						'data':alertdata
					}
					resolve(responseData)
				}

			})


		}else{
			resolve({'message':'user id not found'})
		}
	});
},
systemActivityAlertupdate(addmorealert){
	return new Promise(async(resolve,reject) => {

		var userId = addmorealert.data[0].userId

// //knes delete via role_id
knex('user_allow_system_activity_alerts').delete().where('userId',userId).then( (data) =>{

})


for(let item of addmorealert.data){
//console.log(item)
if(item.checked){

	var insertobject = {
		id :item.id,
		userId : item.userId,
		systemActivityId : item.systemActivityId,
		systemActivityAlertId	: item.systemActivityAlertId,
		createdBy	: item.createdBy,
		updatedBy	: item.updatedBy,
		isActive	: item.isActive,
		isDelete	: item.isDelete
	}
//console.log(insertobject)
knex('user_allow_system_activity_alerts').insert(insertobject).then( (data) =>{
	const responseData = {
		'success':true,
		'message':"activity alert saved successfully",
		'data':data
	}
	resolve(responseData) 

})


}else{
	resolve({'success':false,'message':'checked false'})
}
}


})


},
Changeprofile(updateprofile){
	var data = updateprofile;
	return new Promise(async(resolve,reject) => {
		if(data.id){
			await knex('users_management').update(data).where({id:data.id}).then( (result) =>{
				if(result){
					resolve({'success':true,'message':'profile save successfully'})
				}
			})
		}else{
			resolve({'success':false,'message':'id not found '})
		}
	})
}


}





