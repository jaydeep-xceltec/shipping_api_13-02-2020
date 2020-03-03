const TradingForm = require('../controller/trading');
// Trading Platform Management
module.exports.TradingFormCreate = (req, res, next) =>
{
    let data = req.body;
    TradingForm.TradingFormCreate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Trading Platfrom Records
module.exports.TradingFormRecords = (req, res, next) =>
{
    TradingForm.TradingFormRecords().then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Trading Platform Records Server Side
module.exports.TradingFormRecordsServerSide = (req, res, next) =>
{
    let data = req.body;
    TradingForm.TradingFormRecordsServerSide(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Trading Platform Update
module.exports.TradingFormUpdate = (req, res, next) =>
{
    let data = req.body;
    TradingForm.TradingFormUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Trading Platform Update
module.exports.tradeCancel = (req, res, next) =>
{
    let data = req.body;
    TradingForm.tradeCancel(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Trading Platform Remove
module.exports.TradingPlatformDataRemove = (req, res, next) =>
{
    let data = req.body;
    TradingForm.TradingPlatformDataRemove(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Trading Platform Accept Reject
module.exports.TradingPlatformAcceptReject = (req, res, next) =>
{
    let data = req.body;
    TradingForm.TradingPlatformAcceptReject(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Trading Request To Charterer Create
module.exports.TradingPlatformRequestToChartererCreate = (req, res, next) =>
{
    let data = req.body;
    TradingForm.TradingPlatformRequestToChartererCreate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Trading Platform Request Accept Reject Status Update
module.exports.TradingPlatformRequestStatusUpdate = (req, res, next) =>
{
    let data = req.body;
    TradingForm.TradingPlatformRequestStatusUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Trading Platform Request For Charterer
module.exports.TradingPlatformRecordsServerSideCharterer = (req, res, next) =>
{
    let data = req.body;
    TradingForm.TradingPlatformRecordsServerSideCharterer(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Trading Platform Get Counter Number
module.exports.getCounterNumber = (req, res, next) =>
{
    let data = req.body;
    TradingForm.getCounterNumber(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Trading Counter Insert
module.exports.TradingCounterInsert = (req, res, next) =>
{
    let data = req.body;
    TradingForm.TradingCounterInsert(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Trading Counter Insert
module.exports.TradingData = (req, res, next) =>
{
    let data = req.body;
    TradingForm.TradingData(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Trading Standard Bid Form Create
module.exports.TradingStandardFormCreate = (req, res, next) =>
{
    let data = req.body;
    TradingForm.TradingStandardFormCreate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Trading Standard Bid Email And Notification Send
module.exports.tradingEmailIDAndNotificationSend = (req, res, next) =>
{
    let data = req.body;
    TradingForm.tradingEmailIDAndNotificationSend(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Get Company Data
module.exports.getCompanyName = (req, res, next) =>
{
    let data = req.body;
    TradingForm.getCompanyName(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Fetch Trading Data
module.exports.fetchTradingDataInfo = (req, res, next) =>
{
    let data = req.body;
    TradingForm.fetchTradingDataInfo(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Fetch Trading Status Info
module.exports.fetchTradingStatusInfo = (req, res, next) =>
{
    let data = req.body;
    TradingForm.fetchTradingStatusInfo(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Fetch Std Bid Ready For Process
module.exports.fetchTradingStdBidReady = (req, res, next) =>
{
    let data = req.body;
    TradingForm.fetchTradingStdBidReady(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Standard Bid Form Data Update
module.exports.StandardBidFormDataUpdate = (req, res, next) =>
{
    let data = req.body;
    TradingForm.StandardBidFormDataUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Owner Status Update
module.exports.TradingPlatformRequestStatusUpdateCommon = (req, res, next) =>
{
    let data = req.body;
    TradingForm.TradingPlatformRequestStatusUpdateCommon(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Trading Message Insert
module.exports.tradingMessageInsert = (req, res, next) =>
{
    let data = req.body;
    TradingForm.tradingMessageInsert(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Trading Progess Insert
module.exports.tradingProgressInsert = (req, res, next) =>
{
    let data = req.body;
    TradingForm.tradingProgressInsert(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Trading Data Update
module.exports.tradingDataUpdateCommon = (req, res, next) =>
{
    let data = req.body;
    TradingForm.tradingDataUpdateCommon(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Trading Notification Insert
module.exports.tradingNotificationInsert = (req, res, next) =>
{
    let data = req.body;
    TradingForm.tradingNotificationInsert(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Copy Trading Data
module.exports.copyTradingData = (req, res, next) =>
{
    let data = req.body;
    TradingForm.copyTradingData(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Copy Trading Data
module.exports.chartererInviteOwnerForTrade = (req, res, next) =>
{
    let data = req.body;
    TradingForm.chartererInviteOwnerForTrade(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Invite Charterer
module.exports.ownerInviteChartererForTrade = (req, res, next) =>
{
    let data = req.body;
    TradingForm.ownerInviteChartererForTrade(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// New UserS Records
module.exports.newUsersRecords = (req, res, next) =>
{
    let data = req.body;
    TradingForm.newUsersRecords(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Trade Status Data
module.exports.tradeStatusData = (req, res, next) =>
{
    let data = req.body;
    TradingForm.tradeStatusData(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Trading Records Server Side According To Vessel
module.exports.tradingRecordsServerSideAccordingToVessel = (req, res, next) =>
{
    let data = req.body;
    TradingForm.tradingRecordsServerSideAccordingToVessel(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Trading Messages Records Server Side
module.exports.tradingMessagesDataRecordsServerSide = (req, res, next) =>
{
    let data = req.body;
    TradingForm.tradingMessagesDataRecordsServerSide(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Trading Messages Records Server Side
module.exports.invitationEmailSend = (req, res, next) =>
{
    let data = req.body;
    TradingForm.invitationEmailSend(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Trading Messages Records Server Side
module.exports.invitedUserRecordsServerSide = (req, res, next) =>
{
    let data = req.body;
    TradingForm.invitedUserRecordsServerSide(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.invitationEmailSendCompanyAdmin = (req, res, next) =>
{
    let data = req.body;
    TradingForm.invitationEmailSendCompanyAdmin(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.changeOwnerShip = (req, res, next) =>
{
    let data = req.body;
    TradingForm.changeOwnerShip(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.emailSendCommon = (req, res, next) =>
{
    let data = req.body;
    TradingForm.emailSendCommon(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}


module.exports.ownerShipRecordsServerSide = (req, res, next) =>
{
    let data = req.body;
    TradingForm.ownerShipRecordsServerSide(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}



// share trade


module.exports.shareTrade = (req, res, next) =>
{
    let data = req.body;
    TradingForm.shareTrade(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}


module.exports.shareTradeRecordsServerSide = (req, res, next) =>
{
    let data = req.body;
    TradingForm.shareTradeRecordsServerSide(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
module.exports.emailSendCommon = (req, res, next) =>
{
    let data = req.body;
    TradingForm.emailSendCommon(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}


module.exports.saveBid = (req, res, next) =>
{
    let data = req.body;
    TradingForm.saveBid(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.saveBidRecords = (req, res, next) =>
{
    let data = req.body;
    TradingForm.saveBidRecords(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err))
}