// Notification Management
const notificationManagement = require('../controller/notification');
// Notification Create
module.exports.notificationCreate = (req, res, next) =>
{
    let data = req.body;
    notificationManagement.notificationCreate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Notification Records
module.exports.notificationRecords = (req, res, next) =>
{
    let data = req.body;
    notificationManagement.notificationRecords(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}