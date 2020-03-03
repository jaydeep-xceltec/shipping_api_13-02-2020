            const userSetting = require('../controller/userSetting');
//For City Form Management
module.exports.userSettingcreate = (req, res, next) =>
{
    let data = req.body;
    userSetting.userSettingcreate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.userSettinglist = (req, res, next) =>
{
    userSetting.userSettinglist().then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.userSettingupdate = (req, res, next) =>
{
    let data = req.body;
    userSetting.userSettingupdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.userSettingStatusUpdate = (req, res, next) =>
{
    let data = req.body;
    userSetting.userSettingStatusUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.userSettingdelete = (req, res, next) =>
{
    let data = req.body;
    userSetting.userSettingdelete(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}