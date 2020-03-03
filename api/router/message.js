// Message Center Management
const messageCenterManagement = require('../controller/message');
// Message Center Create
module.exports.messageCenterCreate = (req, res, next) =>
{
    let data = req.body;
    messageCenterManagement.messageCenterCreate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Message Center Records Server Side
module.exports.messageCenterRecordsServerSide = (req, res, next) =>
{
    let data = req.body;
    messageCenterManagement.messageCenterRecordsServerSide(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Message Center Data Update
module.exports.messageCenterDataUpdate = (req, res, next) =>
{
    let data = req.body;
    messageCenterManagement.messageCenterDataUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Message Center Data Update
module.exports.tradingProgressRecordsServerSide = (req, res, next) =>
{
    let data = req.body;
    messageCenterManagement.tradingProgressRecordsServerSide(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}