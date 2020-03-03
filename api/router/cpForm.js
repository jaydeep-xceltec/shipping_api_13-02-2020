// CP Form Management
const cpForm = require('../controller/cpForm');
// CP Form Create
module.exports.cpFormadd = (req, res, next) =>
{
    let data = req.body;
    cpForm.cpFormcreate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// CP Form Records
module.exports.cpFormlist = (req, res, next) =>
{
    cpForm.cpFormlist().then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// CP Form Update
module.exports.cpFormupdate = (req, res, next) =>
{
    let data = req.body;
    cpForm.cpFormupdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// CP Form Remove
module.exports.cpFormdelete = (req, res, next) =>
{
    let data = req.body;
    cpForm.cpFormdelete(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// CP Form Status Update
module.exports.cpFormStatusUpdate = (req, res, next) =>
{
    let data = req.body;
    cpForm.cpFormStatusUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}