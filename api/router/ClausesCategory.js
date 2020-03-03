// Clause Category Management
const cc = require('../controller/clausesCategory');
// Cluase Category Create
module.exports.ccadd = (req, res, next) =>
{
    let data = req.body;
    cc.claueseCategorycreate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Clause Category Records
module.exports.cclist = (req, res, next) =>
{
    cc.claueseCategorylist().then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Clause Category Update
module.exports.ccupdate = (req, res, next) =>
{
    let data = req.body;
    cc.claueseCategoryupdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Clause Category Remove
module.exports.ccdelete = (req, res, next) =>
{
    let data = req.body;
    cc.claueseCategorydelete(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Clause Category Server Side Records
module.exports.clauseCategoryServerSideRecords = (req, res, next) =>
{
    let data = req.body;
    cc.clauseCategoryServerSideRecords(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Clause Category Status Update
module.exports.clauseCategoryStatusUpdate = (req, res, next) =>
{
    let data = req.body;
    cc.clauseCategoryStatusUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Clause Category File Upload
module.exports.clauseCategoryUpload = (req, res, next) =>
{
    let data = req.body;
    cc.clauseCategoryUpload(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}