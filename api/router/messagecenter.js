const Messagedata = require('../controller/messagecenter.js');

module.exports.nudgelist = (req,res,next) => {
	
	Messagedata.nudgelist().then((responseData) => {
		res.json(responseData)
	}).catch((err) => (err));
}
module.exports.nudgedelete = (req,res,next) => {
	var userid = req.body;
	Messagedata.nudgedelete(userid).then((responseData) => {
		res.json(responseData)
	}).catch((err) => (err));
}
module.exports.singleNudgeview = (req,res,next) => {
	var userid = req.params;
	Messagedata.singleNudgeview(userid).then((responseData) => {
		res.json(responseData)
	}).catch((err) => (err));
}
module.exports.addNudge = (req,res,next) => {
	var nudgedata = req.body;
	Messagedata.addNudge(nudgedata).then((responseData) => {
		res.json(responseData)
	}).catch((err) => (err));
}
module.exports.editNudge = (req,res,next) => {
	var nudgedata = req.body;
	Messagedata.editNudge(nudgedata).then((responseData) => {
		res.json(responseData)
	}).catch((err) => (err));
}
module.exports.messageread = (req,res,next) => {
	var userid = req.params;
	Messagedata.messageread(userid).then((responseData) => {
		res.json(responseData)
	}).catch((err) => (err));
}
module.exports.messageSystemAlertlist = (req,res,next) => {
	var userid = req.params;
	Messagedata.messageSystemAlertlist(userid).then((responseData) => {
		res.json(responseData)
	}).catch((err) => (err));
}