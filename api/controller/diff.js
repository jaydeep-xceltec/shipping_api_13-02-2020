const knex = require('knex')(require('../knexfile'))
var moment = require('moment');

module.exports.DiffCreate = (data) =>
{   
   // console.log(data);
    return new Promise((resolve, reject) =>
    {
        return knex('diff_check').insert(
        {
           
            'para' : data.para,
            
        }).then((result) => {
            const responseData = {
                'success': true,
                "message": "Data created successfully"
            }
            resolve(responseData)
        })        
    })
}

module.exports.DiffRecords = () =>
{
    return new Promise(async (resolve, reject) =>
    {
        await 
        
            knex('diff_check')
                .select('diff_check.*')
                .orderBy('id', 'desc').then(async (data) =>
                {
                    var arr = []
                    if (data.length > 0)
                    {
                
                        for (dat of data)
                        {
                            var dateobject =
                            {
                                'id'         : dat.id,
                                'para' : dat.para,
                                'created_at' : dat.created_at,
                                'updated_at'  : dat.updated_at,
                                // 'createdBy'  : dat.createdBy,
                                // 'updatedAt'  : dat.updatedAt,
                                // 'updatedBy'  : dat.updatedBy,
                                // 'isActive'   : dat.isActive,
                                // 'isDelete'  : dat.isDelete
                            }
                            arr.push(dateobject)
                        }
                       // console.log(arr)
                        const responseData =
                        {
                            'success': true,
                            'message': "Diff Records",
                            'data'   : arr
                        }
                        resolve(responseData);
                       // console.log(responseData);
                    } else {
                        const responseData =
                        {
                            'success': false,
                            'message': "Data not found"
                        }
                        resolve(responseData);
                       // console.log(responseData);
                    }
                })
    })
}

module.exports.DiffUpdate = (data) =>
{
    var id = data.id;
    //var para = data.para;
    

    return new Promise((resolve, reject) =>
    {
        return knex('diff_check').update({'para' : data.para}).where('id', id).then((data) => {
            if (data) {
                const responseData = {
                    'success': true,
                    'message': "Data successfully updated",
                    'body': data
                }
                resolve(responseData);
            }
        })
    })
}