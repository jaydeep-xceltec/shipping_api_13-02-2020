            const tradetimer = require('../controller/tradetimer');
//For City Form Management
module.exports.tradetimercreate = (req, res, next) =>
{
    let data = req.body;
    tradetimer.tradetimercreate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.tradetimerlist = (req, res, next) =>
{
    tradetimer.tradetimerlist().then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.tradetimerupdate = (req, res, next) =>
{
    let data = req.body;
    tradetimer.tradetimerupdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.tradetimerStatusUpdate = (req, res, next) =>
{
    let data = req.body;
    tradetimer.tradetimerStatusUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.tradetimerdelete = (req, res, next) =>
{
    let data = req.body;
    tradetimer.tradetimerdelete(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}