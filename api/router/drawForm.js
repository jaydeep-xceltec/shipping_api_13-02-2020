const cpForm = require('../controller/draw');
//For Draw Form Management
module.exports.DrawFormCreate = (req, res, next) =>
{
    let data = req.body;
    cpForm.DrawFormCreate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.DrawFormCopyCreate = (req, res, next) =>	
{	
    let data = req.body;	
    cpForm.DrawFormCopyCreate(data).then((responseData) =>	
    {	
        res.json(responseData)	
    }).catch((err) => next(err));	
}
module.exports.drawFormRecords = (req, res, next) =>
{
    cpForm.drawFormRecords().then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.drawRecordsServerSide = (req, res, next) =>
{
    let data = req.body;
    cpForm.drawRecordsServerSide(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.drawFormUpdate = (req, res, next) =>
{
    let data = req.body;
    cpForm.drawFormUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.drawDataRemove = (req, res, next) =>
{
    let data = req.body;
    cpForm.drawDataRemove(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Draw Accept Reject Data
module.exports.CharterDrawAcceptReject = (req, res, next) =>
{
    let data = req.body;
    cpForm.CharterDrawAcceptReject(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Draw Server Side Records For Charterer
module.exports.drawRecordsServerSideCharterer = (req, res, next) =>
{
    let data = req.body;
    cpForm.drawRecordsServerSideCharterer(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Draw Request Create
module.exports.DrawRequestToChartererCreate = (req, res, next) =>
{
    let data = req.body;
    cpForm.DrawRequestToChartererCreate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Draw Request Status Update
module.exports.charterPartyRequestStatusUpdate = (req, res, next) =>
{
    let data = req.body;
    cpForm.charterPartyRequestStatusUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Draw Server Side Records For Charterer
module.exports.drawRecordsServerSideCharterer = (req, res, next) =>
{
    let data = req.body;
    cpForm.drawRecordsServerSideCharterer(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.drawFormUpdateByBrokerCheck = (req, res, next) =>
{
    let data = req.body;
    cpForm.drawFormUpdateByBrokerCheck(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}


module.exports.drawFormUpdateByCharterCheck = (req, res, next) =>
{
    let data = req.body;
    cpForm.drawFormUpdateByCharterCheck(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}


module.exports.drawFormUpdateByOwnerCheck = (req, res, next) =>
{
    let data = req.body;
    cpForm.drawFormUpdateByOwnerCheck(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.tradingFormUpdateByOwnerCheck = (req, res, next) =>
{
    let data = req.body;
    cpForm.tradingFormUpdateByOwnerCheck(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.tradingFormUpdateByBrokerCheck = (req, res, next) =>
{
    let data = req.body;
    cpForm.tradingFormUpdateByBrokerCheck(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.tradingFormUpdateByChartererCheck = (req, res, next) =>
{
    let data = req.body;
    cpForm.tradingFormUpdateByChartererCheck(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.drawProgressUpdate = (req, res, next) =>
{
    let data = req.body;
    cpForm.drawProgressUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.tradingProgressUpdate = (req, res, next) =>
{
    let data = req.body;
    cpForm.tradingProgressUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.drawStatusInfoUpdate = (req, res, next) =>
{
    let data = req.body;
    cpForm.drawStatusInfoUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.tradingStatusInfoUpdate = (req, res, next) =>
{
    let data = req.body;
    cpForm.tradingStatusInfoUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Draw Data Update
module.exports.drawDataUpdate = (req, res, next) =>
{
    let data = req.body;
    cpForm.drawDataUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Fetch Draw Data
module.exports.fetchDrawData = (req, res, next) =>
{
    let data = req.body;
    cpForm.fetchDrawData(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Fetch Trading Data
module.exports.fetchTradingData = (req, res, next) =>
{
    let data = req.body;
    cpForm.fetchTradingData(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Trading Data Update
module.exports.tradingDataUpdate = (req, res, next) =>
{
    let data = req.body;
    cpForm.tradingDataUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Fetch Company Data
module.exports.fetchCompanyData = (req, res, next) =>
{
    let data = req.body;
    cpForm.fetchCompanyData(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Update Checked Checkbox
module.exports.updateCheckedClauses = (req, res, next) =>
{
    let data = req.body;
    cpForm.updateCheckedClauses(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Custom Input Draw Data Update
module.exports.customInputDrawDataUpdate = (req, res, next) =>
{
    let data = req.body;
    cpForm.customInputDrawDataUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Draw Data Signature Update
module.exports.drawDataSignatureUpadate = (req, res, next) =>
{
    let data = req.body;
    cpForm.drawDataSignatureUpadate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Trading Data Signature Update
module.exports.tradingDataSignatureUpadate = (req, res, next) =>
{
    let data = req.body;
    cpForm.tradingDataSignatureUpadate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Update Checked Checkbox Trading
module.exports.updateCheckedClausesTrading = (req, res, next) =>
{
    let data = req.body;
    cpForm.updateCheckedClausesTrading(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Update Custom Input Data Trading
module.exports.customInputTradingDataUpdate = (req, res, next) =>
{
    let data = req.body;
    cpForm.customInputTradingDataUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Draw Data Progress Update
module.exports.drawProgressUpdateCustom = (req, res, next) =>
{
    let data = req.body;
    cpForm.drawProgressUpdateCustom(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Company Records Server Side
module.exports.companyRecordsServerSide = (req, res, next) =>
{
    let data = req.body;
    cpForm.companyRecordsServerSide(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// User Records Server Side
module.exports.userRecordsServerSide = (req, res, next) =>
{
    let data = req.body;
    cpForm.userRecordsServerSide(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Draw Data Update Common
module.exports.drawDataUpdateCommon = (req, res, next) =>
{
    let data = req.body;
    cpForm.drawDataUpdateCommon(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Draw Send Notification To Charterer
module.exports.sendNotificationToCharterer = (req, res, next) =>
{
    let data = req.body;
    cpForm.sendNotificationToCharterer(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Update Charterer For Trade
module.exports.updateChartererToTrade = (req, res, next) =>
{
    let data = req.body;
    cpForm.updateChartererToTrade(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Update Owner For Trade
module.exports.updateOwnerToTrade = (req, res, next) =>
{
    let data = req.body;
    cpForm.updateOwnerToTrade(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Update Charterer For Draw
module.exports.updateChartererToDraw = (req, res, next) =>
{
    let data = req.body;
    cpForm.updateChartererToDraw(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.drawMessageInsert = (req, res, next) =>
{
    let data = req.body;
    cpForm.drawMessageInsert(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.drawNotificationInsert = (req, res, next) =>
{
    let data = req.body;
    cpForm.drawNotificationInsert(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}