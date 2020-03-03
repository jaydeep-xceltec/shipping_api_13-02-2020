// charter party Type management
const cptype = require('../controller/charterpartytype');
// Charter Party Type Create
module.exports.cptypeadd = (req,res,next) =>
{
    let data = req.body;    
    cptype.charterpartytypecreate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Charter Party Type Records
module.exports.cptypelist = (req,res,next) =>
{
    cptype.charterpartytypelist().then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Charter Party Type Update
module.exports.cptypeupdate = (req,res,next) =>
{
    let data = req.body;
    cptype.charterpartytypeupdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Charter Party Type Remove
module.exports.cptypedelete = (req,res,next) =>
{
    let data = req.body;
    cptype.charterpartytypedelete(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Charter Party Status Update
module.exports.charterPartyStatusUpdate = (req,res,next) =>
{
    let data = req.body;
    cptype.charterPartyStatusUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}