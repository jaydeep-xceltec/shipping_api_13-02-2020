const cityForm = require('../controller/city');
//For City Form Management
module.exports.CityCreate = (req, res, next) =>
{
    let data = req.body;
    cityForm.CityCreate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.CityRecords = (req, res, next) =>
{
    cityForm.CityRecords().then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.CityUpdate = (req, res, next) =>
{
    let data = req.body;
    cityForm.CityUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.CityRemove = (req, res, next) =>
{
    let data = req.body;
    cityForm.CityRemove(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}