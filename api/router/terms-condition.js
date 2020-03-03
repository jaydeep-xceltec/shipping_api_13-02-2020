const tc = require('../controller/termscondition');
//For City Form Management
module.exports.tccreate = (req, res, next) =>
{
    let data = req.body;
    tc.tccreate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.tclist = (req, res, next) =>
{
    tc.tclist().then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.tclistactive = (req, res, next) =>
{
    tc.tclistactive().then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.tcupdate = (req, res, next) =>
{
    let data = req.body;
    tc.tcupdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.tcStatusUpdate = (req, res, next) =>
{
    let data = req.body;
    tc.tcStatusUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.tcdelete = (req, res, next) =>
{
    let data = req.body;
    tc.tcdelete(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}