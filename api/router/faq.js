const cityForm = require('../controller/faq');
//For City Form Management
module.exports.faqcreate = (req, res, next) =>
{
    let data = req.body;
    cityForm.faqcreate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.faqlist = (req, res, next) =>
{
    cityForm.faqlist().then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.faqlistactive = (req, res, next) =>
{
    cityForm.faqlistactive().then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.faqupdate = (req, res, next) =>
{
    let data = req.body;
    cityForm.faqupdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.faqStatusUpdate = (req, res, next) =>
{
    let data = req.body;
    cityForm.faqStatusUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.faqdelete = (req, res, next) =>
{
    let data = req.body;
    cityForm.faqdelete(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}