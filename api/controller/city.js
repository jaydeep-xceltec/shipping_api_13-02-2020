const knex = require('knex')(require('../knexfile'))
var moment = require('moment');
// const NodeRSA = require('node-rsa');
// const key = new NodeRSA({b: 512});
// const aes256 = require('aes256');
// const crypto =require('crypto');

// console.log(crypto.getCurves());//secp256k1

// const alice = crypto.createECDH('secp256k1');
// alice.generateKeys();

// const bob = crypto.createECDH('secp256k1');
// bob.generateKeys();


// const alicePublicKeyBase64 = alice.getPublicKey().toString('base64');
// const bobPublicKeyBase64 = bob.getPublicKey().toString('base64');

// const aliceSharedKey = alice.computeSecret(bobPublicKeyBase64,'base64','hex');
// const bobSharedKey = bob.computeSecret(alicePublicKeyBase64,'base64','hex');

// console.log(aliceSharedKey === bobSharedKey);
 
// const text = "Lorem Ipsum'S is simply@!#$%^&*(){}[||]\/?'., dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.1234567890 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
// const encrypted = key.encrypt(text, 'base64');
// console.log('encrypted: ', encrypted);
// const decrypted = key.decrypt(encrypted, 'utf8');
// console.log('decrypted: ', decrypted);

// const text1 = "jaydeep";
// const encrypted1 = aes256.encrypt(aliceSharedKey,text1);
// console.log('encrypted: ', encrypted1);
// const decrypted1 = aes256.decrypt(bobSharedKey,encrypted1);
// console.log('decrypted: ', decrypted1);

module.exports.CityCreate = (data) =>
{   
   // console.log(data);
    return new Promise((resolve, reject) =>
    {
        return knex('city_management').insert(
        {
            cityName: data.cityName,
            stateId: data.stateId,
            countryId: data.countryId,

            createdBy: data.createdBy,
            createdAt: new Date(),
            updatedBy: data.updatedBy,
            updatedAt: new Date(),
            isActive: "Y",
            isDelete: "N",
        }).then((result) => {
            const responseData = {
                'success': true,
                "message": "City created successfully"
            }
            resolve(responseData)
        })        
    })
}

module.exports.CityRecords = () =>
{
    return new Promise(async (resolve, reject) =>
    {
        await 
        
            knex('city_management AS city')
                .select('city.*', 'state.stateName','country.countryName')
                .join('state_management AS state', 'state.id', '=', 'city.stateId')
                .join('country_management AS country', 'country.id', '=', 'city.countryId')
                .where({ 'city.isDelete' : 'N' }).orderBy('city.cityName', 'asc').then(async (data) =>
                {
                    var arr = []
                    if (data.length > 0)
                    {
                
                        for (dat of data)
                        {
                            var dateobject =
                            {
                                'id'         : dat.id,
                                'cityName' : dat.cityName,
                                'stateName' : dat.stateName,
                                'countryName' : dat.countryName,
                                'createdAt'  : dat.createdAt,
                                'createdBy'  : dat.createdBy,
                                'updatedAt'  : dat.updatedAt,
                                'updatedBy'  : dat.updatedBy,
                                'isActive'   : dat.isActive,
                                'isDelete'  : dat.isDelete
                            }
                            arr.push(dateobject)
                        }
                       // console.log(arr)
                        const responseData =
                        {
                            'success': true,
                            'message': "City Records",
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

module.exports.CityUpdate = (data) =>
{
    var id = data.id;
    var cityName = data.cityName;
    var stateName = data.stateName;
    var countryName = data.countryName;
    var createdAt = data.createdAt;
    var createdBy = data.createdBy;
    var updatedAt = data.updatedAt;
    var updatedBy = data.updatedBy;

    return new Promise((resolve, reject) =>
    {
        return knex('city_management').update({
            
            cityName: data.cityName,
            stateName: data.stateName,
            countryName: data.countryName,
            createdAt: data.createdAt,
            createdBy: data.createdBy,
            updatedAt: data.updatedAt,
            updatedBy: data.updatedBy,
            isDelete: data.isDelete,
            isActive: data.isActive,
        }).where('id', id).then((data) => {
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

module.exports.CityRemove = (data) =>
{
    var id = data.id;
    return new Promise((resolve, reject) =>
    {
        return knex('city_management').update({ isDelete: 'Y' }).where('id', id).then(async (data) => {
            if (data) {
                await knex('city_management').update({ isDelete: 'Y' }).where({ id: id }).then((rdata) => {
                    if (rdata) {
                        const responseData = {
                            'success': true,
                            'message': "City  removed successfully"
                        }
                        resolve(responseData);
                    } else {
                        const responseData = {
                            'success': true,
                            'message': "City Form remove successfully"
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