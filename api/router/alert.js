
const Alert = require('../controller/alert');

module.exports.BrokerManegeAlerlist = (req,res,next) => {

	Alert.BrokerManegeAlerlist().then((responseData) => {
		res.json(responseData)
	}).catch((err) => (err));
}

module.exports.OwnerManegeAlerlist = (req,res,next) => {

	Alert.OwnerManegeAlerlist().then((responseData) => {
		res.json(responseData)
	}).catch((err) => (err));
}
module.exports.categoryAdd = (req,res,next) => {
	var alertdata = req.body;
	Alert.categoryInsert(alertdata).then((responseData) => {
		res.json(responseData)
	}).catch((err) => (err));
}
module.exports.categoryEdit = (req,res,next) => {
	var alertdata = req.body;
	Alert.categoryUpdate(alertdata).then((responseData) => {
		res.json(responseData)
	}).catch((err) => (err));
}
module.exports.categoryDelete = (req,res,next) => {
	var alertdata = req.body;
	Alert.categoryDelete(alertdata).then((responseData) => {
		res.json(responseData)
	}).catch((err) => (err));
}

module.exports.subcategoryAdd = (req,res,next) => {
	var alertdata = req.body;
	Alert.subcategoryAdd(alertdata).then((responseData) => {
		res.json(responseData)
	}).catch((err) => (err));
}
module.exports.subcategoryEdit = (req,res,next) => {
	var alertdata = req.body;
	Alert.subcategoryUpdate(alertdata).then((responseData) => {
		res.json(responseData)
	}).catch((err) => (err));
}

module.exports.subcategoryDelete = (req,res,next) => {
	var alertdata = req.body;
	Alert.subcategoryDelete(alertdata).then((responseData) => {
		res.json(responseData)
	}).catch((err) => (err));
}