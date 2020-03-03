const multer = require('multer');
var moment   = require('moment');

var myDate   =  Date.now();
const knex = require('knex')(require('../knexfile'));
//console.log(myDate)
//var date     = moment(myDate).format('LL');

//console.log(date);

//Storage the folder functionality
var storage = multer.diskStorage({
    destination: function(req, file, cd) {
        cd(null, 'imagefolder/')
    },
    filename: function(req, file, cd) {
        //// console.log(req.file);
        cd(null, myDate + file.originalname)
    }

})

//upload the file function
var upload = multer({
    storage: storage
}).any('');


//image_upload
module.exports.image_upload = (req, res) => {
     var userid = req.params.id
     console.log(req);
     
     upload(req, res, function(err) {
        if (err) {
           // console.log(err)
        } else {

            var imagename = req.files;
             const map1 = imagename.map(data => {

                 var imageurl = "http://18.216.106.180:3001/"+myDate+data.originalname;
                 
                 return knex('users_management').update({'image':imageurl}).where('id',userid).then((uploadimage) =>{
                     if(uploadimage){
                         res.send({'success':true,'message':'profile upload successfully'})
                     }
                
                 })
     

             })
         }
    })
    //// console.log("image_upload")
}

//image_list
// module.exports.image_list = (req, res, next) => {

//     return new Promise((resolve, reject) => {
//         User.find().then((result) => {
//            // console.log(result.imageName)
//             res.json(result)
//             // resolve(responseData)
//         })
//     }).catch((error) => reject('userId not found'))


//    // console.log("image_list")
// }



