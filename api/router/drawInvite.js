const drawInvite = require('../controller/drawInvite');
//For Draw Invite Management
module.exports.DrawInviteCreate = (req, res, next) =>
{
    let data = req.body;
    drawInvite.DrawInviteCreate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.DrawInviteRecordsServerSide = (req, res, next) =>
{
    let data = req.body;
    drawInvite.DrawInviteRecordsServerSide(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.DrawInviteUpdate = (req, res, next) =>
{
    let data = req.body;
    drawInvite.DrawInviteUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.DrawInviteRemove = (req, res, next) =>
{
    let data = req.body;
    drawInvite.DrawInviteRemove(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
