const Brokerdata = require('../controller/owner.js');

module.exports.OwnerRecords = (req,res,next) => {
	
	Brokerdata.OwnerRecords().then((responseData) => {
		res.json(responseData)
	}).catch((err) => (err));
}

module.exports.OwnerCreate = (req,res,next) => {
	var brokerdata = req.body;
	Brokerdata.OwnerCreate(brokerdata).then((responseData) => {
		res.json(responseData)
	}).catch((err) => (err));
}
module.exports.OwnerDetails = (req,res,next) => {
	var brokerdata = req.body;
	Brokerdata.OwnerDetails(brokerdata).then((responseData) => {
		res.json(responseData)
	}).catch((err) => (err));
}

module.exports.OwnerEdit = (req,res,next) => {
	var brokerdata = req.body;
	Brokerdata.OwnerEdit(brokerdata).then((responseData) => {
		res.json(responseData)
	}).catch((err) => (err));
}
module.exports.OwnerDelete = (req,res,next) => {
	var brokerdata = req.body;
	Brokerdata.OwnerDelete(brokerdata).then((responseData) => {
		res.json(responseData)
	}).catch((err) => (err));
}
