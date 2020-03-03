const knex = require('knex')(require('../knexfile'))

module.exports.subadminroleCreate = (subadminrole) => {
	var userId = subadminrole.userId;
	var cmadd = subadminrole.cmadd;
	var cmedit = subadminrole.cmedit;
	var cmList = subadminrole.chmList;
	var cmview = subadminrole.view;
	var cmactive = subadminrole.alertactive;

	var chmadd = subadminrole.chmadd;
	var chmedit = subadminrole.chmedit;
	var chmList = subadminrole.chmlist;
	var chmview = subadminrole.chmview;
	var chmactive = subadminrole.chmactive;

	var alertadd = subadminrole.alertadd;
	var alertedit = subadminrole.alertedit;
	var alertList = subadminrole.alertlist;
	var alertview = subadminrole.alertview;
	var alertactive = subadminrole.alertactive;

	var vesseladd = subadminrole.vesseladd;
	var veseeledit = subadminrole.vesseledit;
	var veseelList = subadminrole.vessellist;
	var vesselview = subadminrole.vesselview;
	var vesselactive = subadminrole.vesselactive;

	return new Promise((resolve, reject) => {

		knex('subadmin_role').where({ userId: userId }).then((rdata) => {
			if (rdata.length > 0) {
				const responseData = {
					'success': false,
					"message": "user already exists"
				}
				resolve(responseData)
			} else {
				return knex('subadmin_role').insert({
					userId : subadminrolesubadminrole.userId,
					cmadd : subadminrole.cmadd,
					cmedit : subadminrole.cmedit,
					cmList : subadminrole.chmList,
					cmview : subadminrole.view,
					cmactive : subadminrole.alertactive,
					chmadd : subadminrole.chmadd,
					chmedit : subadminrole.chmedit,
					chmList : subadminrole.chmlist,
					chmview : subadminrole.chmview,
					chmactive : subadminrole.chmactive,
					alertadd : subadminrole.alertadd,
					alertedit : subadminrole.alertedit,
					alertList : subadminrole.alertlist,
					alertview : subadminrole.alertview,
					alertactive : subadminrole.alertactive,
					vesseladd : subadminrole.vesseladd,
					veseeledit : subadminrole.vesseledit,
					veseelList : subadminrole.vessellist,
					vesselview : subadminrole.vesselview,
					vesselactive : subadminrole.vesselactive
				}).then((result) => {
					const responseData = {
						'success': true,
						"message": "Your role is created successfully"
					}
					resolve(responseData)
				});
			}

		})

	})
}

module.exports.subadminroleread = (subadminrole) => {
var userId = subadminrole.userId;
	return new Promise((resolve, reject) => {
		return knex('subadmin_role').where({ userId: userId }).orderBy('id', 'desc').then((data) => {
			if (data) {
				const responseData = {
					'success': true,
					'message': "Data fetch successfully",
					'data': data
				}
				resolve(responseData);
			}
		})
	})
}

module.exports.subadminroleupdate = (subadminrole) => {
	var id= subadminrole.id;
	var userId = subadminrole.userId;
	var cmadd = subadminrole.cmadd;
	var cmedit = subadminrole.cmedit;
	var cmList = subadminrole.chmList;
	var cmview = subadminrole.view;
	var cmactive = subadminrole.alertactive;

	var chmadd = subadminrole.chmadd;
	var chmedit = subadminrole.chmedit;
	var chmList = subadminrole.chmlist;
	var chmview = subadminrole.chmview;
	var chmactive = subadminrole.chmactive;

	var alertadd = subadminrole.alertadd;
	var alertedit = subadminrole.alertedit;
	var alertList = subadminrole.alertlist;
	var alertview = subadminrole.alertview;
	var alertactive = subadminrole.alertactive;

	var vesseladd = subadminrole.vesseladd;
	var veseeledit = subadminrole.vesseledit;
	var veseelList = subadminrole.vessellist;
	var vesselview = subadminrole.vesselview;
	var vesselactive = subadminrole.vesselactive;


	return new Promise((resolve, reject) => {
			 
				return knex('subadmin_role').update({ 	
					cmadd : subadminrole.cmadd,
					cmedit : subadminrole.cmedit,
					cmList : subadminrole.chmList,
					cmview : subadminrole.view,
					cmactive : subadminrole.alertactive,
					chmadd : subadminrole.chmadd,
					chmedit : subadminrole.chmedit,
					chmList : subadminrole.chmlist,
					chmview : subadminrole.chmview,
					chmactive : subadminrole.chmactive,
					alertadd : subadminrole.alertadd,
					alertedit : subadminrole.alertedit,
					alertList : subadminrole.alertlist,
					alertview : subadminrole.alertview,
					alertactive : subadminrole.alertactive,
					vesseladd : subadminrole.vesseladd,
					veseeledit : subadminrole.vesseledit,
					veseelList : subadminrole.vessellist,
					vesselview : subadminrole.vesselview,
					vesselactive : subadminrole.vesselactive

				}).where('id', id).then((data) => {
					if (data) {
						const responseData = {
							'success': true,
							'message': "Role successfully updated"
						}
						resolve(responseData);
					}
				})
		
	})
}

module.exports.subadminroledelete = (subadminrole) => {
	var id = subadminrole.id;
	var isDelete = subadminrole.isDelete;
	return new Promise((resolve, reject) => {
		return knex('subadmin_role').update({ isDelete: 'Y' }).where('id', id).then((data) => {
			if (data) {
				knex('users_management').update({ isDelete: 'Y' }).where({ id: id }).then((rdata) => {
					if (rdata) {
						const responseData = {
							'success': true,
							'message': "Role and all users related this role removed successfully"
						}
						resolve(responseData);
					} else {
						const responseData = {
							'success': true,
							'message': "Role remove successfully"
						}
						resolve(responseData);
					}

				})

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

// module.exports.subadminroleactive = (subadminroleactive) => {
// 	var id = subadminroleactive.id;
// 	var isActive = subadminroleactive.isActive;
// 	return new Promise((resolve, reject) => {
// 		return knex('subadmin_role').update({ isActive: isActive }).where({ id: id }).then(async (data) => {
// 			if (data) {
// 				await knex('users_management').update({ isActive: isActive }).where({ userId: id }).then((userdata) => {
// 				})
// 				if (subadminroleactive.isActive == 'Y') {
// 					const responseData = {
// 						'success': true,
// 						'message': "User role and all related users active"
// 					}
// 					resolve(responseData);

// 				} else {
// 					const responseData = {
// 						'success': false,
// 						'message': "User role and all related users Inactive"
// 					}
// 					resolve(responseData);
// 				}
// 			} else {
// 				const responseData = {
// 					'success': false,
// 					'message': "Id not found"
// 				}
// 				resolve(responseData);
// 			}
// 		})
// 	})
// }