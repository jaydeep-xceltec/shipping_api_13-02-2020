const knex = require('knex')(require('../knexfile'))
const bcrypt = require('bcrypt-nodejs');
const nodemailer = require('nodemailer');

module.exports.StaffAdd = (userRegister) => {
	var cmail = userRegister.email;
	var email = cmail.toLowerCase();
	var username = userRegister.username;
	return new Promise((resolve,reject) => {
		knex('users_management').where({ email:email}).orWhere({username:username}).then((data) => {
			if(data.length>0){
				const responseData = {
					'success': false,
					"message": "This username and email is already registered"
				}
				resolve(responseData)

			}else{
				var hash = bcrypt.hashSync(userRegister.password);
				var insertdata = {
					username : userRegister.username,
					companyId : userRegister.companyId,
					mobileNo : userRegister.mobileNo,
					email : email,
					password : hash,
					userRoleId : userRegister.userRoleId,
					address : userRegister.address,
					firstName : userRegister.firstName,
					lastName : userRegister.lastName,
					businessPhone : userRegister.businessPhone,
					createdBy : userRegister.createdBy,
					updatedBy : userRegister.updatedBy,
					isActive : 'Y',
					isDelete : 'N'
				}
	//// console.log(insertdata)
	return knex('users_management').insert(insertdata).then((result)=>{
		if(result){

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
	'Congrats! You are successfully added as "Broker" by Broker Management Admin. \n\n'
	+'User credentials are: \n' +
	'User ID: ' + userRegister.email + '\n' +
	'Password: ' + userRegister.password + '\n\n' +
	'Thanks'
};
transporter.sendMail(mailOptions, function(error, info) {
	if (error) {
		console.log(error);
	}
});
var mailOptions = {
	from: 'youremail@gmail.com',
	to: 'cpdemo62@gmail.com',
	subject: 'successfully Create user',
	text:'Hello,\n' +
	'You have succefully created user in "Broker Management".\n\n'
	+'User credentials are: \n' +
	'User ID: ' + userRegister.email + '\n' +
	'Password: ' + userRegister.password + '\n\n' +
	'Thanks'
};
transporter.sendMail(mailOptions, function(error, info) {
	if (error) {
		console.log(error);
	}
});
//mail send close
const responseData = {
	'success': true,
	"message": "Your staff Account is created successfully."
}
resolve(responseData)
}else{
	const responseData = {
		'success': false,
		"message": "Your staff Account is not created"
	}
	resolve(responseData)
}
});
}
})
	})
}

module.exports.Stafflist = () => {
	return new Promise((resolve,reject) => {
		knex.select('users_management.username','users_management.id','users_management.firstName','users_management.lastName','users_management.email','users_management.mobileNo','users_management.businessPhone','users_management.businessFax','users_management.address','users_management.title').from('users_management').where({userRoleId:'5',isDelete:'N'}).then((data) =>{
			if(data.length>0){
				const responseData = {
					'success':true,
					'message':"Broker list",
					'data':data
				}
				resolve(responseData);
			}else{
				const responseData = {
					'success':false,
					'message':"Data not found"
				}
				resolve(responseData);
			} 
		})
	})
}

module.exports.StaffDetails = (data) => {
	var id = data.id;
	return new Promise( async (resolve,reject) => {
		if(id){
			await knex.select('u.userRoleId','u.companyId','u.username','u.firstName','u.lastName','u.email','u.mobileNo','u.businessPhone','u.businessFax','u.address','c.companyName','r.roleName').from('users_management as u').innerJoin('company_management as c','u.companyid','c.id').innerJoin('user_role_management as r','u.userRoleId','r.id').where({'u.id':id,'u.userRoleId':'5','u.isDelete':'N','c.isDelete':'N'}).then( async (datares) => {
				if(datares.length>0){
					const responseData = {
						'success':true,
						'message':"Staff details list",
						'data': datares
					}
					resolve(responseData);
				}else{
					const responseData = {
						'success':false,
						'message':"Data not found"
					}
					resolve(responseData);
				}
			})
		}else{
			const responseData = {
				'success':false,
				'message':"please insert id"

			}
			resolve(responseData);
		}
	})
}

module.exports.StaffEdit = (updatedata) => {
	var id = updatedata.id;
	var username = updatedata.username;
	var companyId = updatedata.companyId;
	var mobileNo = updatedata.mobileNo;
	var email = updatedata.email;
	var userRoleId = updatedata.userRoleId;
	var address = updatedata.address;
	var firstName = updatedata.firstName;
	var lastName = updatedata.lastName;
	var businessPhone = updatedata.businessPhone;
	var createdBy = updatedata.createdBy;
	var updatedBy = updatedata.updatedBy;
	var hash = bcrypt.hashSync(updatedata.password);
	return new Promise((resolve,reject) => {
		return knex('users_management').update({
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
		}).where({id:id}).then( async (result) =>{
			//console.log(result);
			if(result){
				const responseData = {
					'success':true,
					'message':"Broker successfully updated"
				}
				resolve(responseData);
			}else{
				const responseData = {
					'success': false,
					"message": "User id Not found"
				}
				resolve(responseData)
			}

		})

	})
}

module.exports.StaffDelete = (data) => {
	var id = data.id;
	return new Promise((resolve,reject) => {
		return knex('users_management').update({'isDelete':'Y'}).where('id',id).then((data) => {
			if(data){
				const responseData = {
					'success': true,
					'message':"staff remove successfully"
				}
				resolve(responseData);
			}else{
				const responseData = {
					'success': false,
					'message':"Id not found"
				}
				resolve(responseData);
			}
		})
	})
}
















































