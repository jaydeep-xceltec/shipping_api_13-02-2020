const knex = require('knex')(require('../knexfile'))
var moment = require('moment');
// Create Draw Invite Entry
module.exports.DrawInviteCreate = (data) =>
{   
    return new Promise((resolve, reject) =>
    {
        return knex('draw_invite_management').insert(
        {
            drawId: data.drawId,
            userId: data.userId,
            roleId: data.roleId,
            createdBy: data.createdBy,
            createdAt: new Date(),
            updatedBy: data.updatedBy,
            updatedAt: new Date(),
            isActive: "Y",
            isDelete: "N",
        }).then((result) => {
            const responseData = {
                'success': true,
                "message": "Draw Invite created successfully"
            }
            resolve(responseData)
        })        
    })
}
// Fetch Draw Invite Records
module.exports.DrawInviteRecordsServerSide = (filterCondition) =>
{
    return new Promise(async (resolve, reject) =>
    {
       // console.log(filterCondition);
       // console.log(filterCondition.drawId);
       // console.log(filterCondition.userId);
       // console.log(filterCondition.roleId);
        await
            knex('draw_invite_management AS dim')
                .select('dim.*','um.username as userName', 'urm.roleName as roleName')
                .join('users_management AS um', 'um.id', '=', 'dim.userId')
                .join('user_role_management AS urm', 'urm.id', '=', 'dim.roleId')
                .where({ 'dim.drawId' : filterCondition.drawId })
                .where({ 'dim.isDelete' : 'N' }).orderBy('dim.id', 'desc').then(async (data) =>
                {
                    var arr = []
                    if (data.length > 0)
                    {
                        for (dat of data)
                        {
                            var dateobject =
                            {
                                'id'            :      dat.id,
                                'drawId'        :      dat.drawId,
                                'userId'        :      dat.userId,
                                'roleId'        :      dat.roleId,
                                'userName'      :      dat.userName,
                                'roleName'      :      dat.roleName,
                                'createdAt'     :      dat.createdAt,
                                'createdBy'     :      dat.createdBy,
                                'updatedAt'     :      dat.updatedAt,
                                'updatedBy'     :      dat.updatedBy,
                                'isActive'      :      dat.isActive,
                                'isDelete'      :      dat.isDelete
                            }
                            arr.push(dateobject)
                        }
                        const responseData =
                        {
                            'success': true,
                            'message': "Draw Invite Records",
                            'data'   : arr
                        }
                        resolve(responseData);
                    } else {
                        const responseData =
                        {
                            'success': false,
                            'message': "Data not found"
                        }
                        resolve(responseData);
                    }
                })
    })
}
// Draw Invite Update
module.exports.DrawInviteUpdate = (data) =>
{
    var id = data.id;
    return new Promise((resolve, reject) =>
    {
        return knex('draw_invite_management').update(
        {
            drawId: data.drawId,
            userId: data.userId,
            roleId: data.roleId,
            createdAt: data.createdAt,
            createdBy: data.createdBy,
            updatedAt: data.updatedAt,
            updatedBy: data.updatedBy,
            isDelete: data.isDelete,
            isActive: data.isActive,
        }).where('id', id).then((data) =>
        {
            if (data)
            {
                const responseData =
                {
                    'success': true,
                    'message': "Data successfully updated",
                    'body': data
                }
                resolve(responseData);
            }
        })
    })
}
// Draw Invite Record Remove
module.exports.DrawInviteRemove = (data) =>
{
    var id = data.id;
    return new Promise((resolve, reject) =>
    {
        return knex('draw_invite_management').update({ isDelete: 'Y' }).where('id', id).then(async (data) =>
        {
            if (data)
            {
                await knex('draw_invite_management').update({ isDelete: 'Y' }).where({ id: id }).then((rdata) =>
                {
                    if (rdata)
                    {
                        const responseData =
                        {
                            'success': true,
                            'message': "Data removed successfully"
                        }
                        resolve(responseData);
                    } else {
                        const responseData =
                        {
                            'success': true,
                            'message': "Data removed successfully"
                        }
                        resolve(responseData);
                    }
                })
            } else {
                const responseData =
                {
                    'success': false,
                    'message': "Id not found"
                }
                resolve(responseData);
            }
        })
    })
}
