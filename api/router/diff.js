const diffForm = require('../controller/diff');
//For City Form Management
module.exports.DiffCreate = (req, res, next) =>
{
    let data = req.body;
    diffForm.DiffCreate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.DiffRecords = (req, res, next) =>
{
    diffForm.DiffRecords().then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.DiffUpdate = (req, res, next) =>
{
    let data = req.body;
    diffForm.DiffUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}