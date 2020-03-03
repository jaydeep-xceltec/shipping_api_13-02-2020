const Brokerdata = require('../controller/brokermanage.js');



module.exports.Brokerlist = (req,res,next) => {
	
	Brokerdata.Brokerlist().then((responseData) => {
		res.json(responseData)
	}).catch((err) => (err));
}

module.exports.BrokerAdd = (req,res,next) => {
	var brokerdata = req.body;
	Brokerdata.BrokerAdd(brokerdata).then((responseData) => {
		res.json(responseData)
	}).catch((err) => (err));
}
module.exports.BrokerEdit = (req,res,next) => {
	var brokerdata = req.body;
	Brokerdata.BrokerEdit(brokerdata).then((responseData) => {
		res.json(responseData)
	}).catch((err) => (err));
}

module.exports.BrokerDelete = (req,res,next) => {
	var brokerdata = req.body;
	Brokerdata.BrokerDelete(brokerdata).then((responseData) => {
		res.json(responseData)
	}).catch((err) => (err));
}
module.exports.BrokerDetails = (req,res,next) => {
	var brokerdata = req.body;
	Brokerdata.BrokerDetails(brokerdata).then((responseData) => {
		res.json(responseData)
	}).catch((err) => (err));
}
