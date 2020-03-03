// Chat Management
const chatManagement = require('../controller/chat');
// Chat Create
module.exports.chatCreate = (req, res, next) =>
{
    let data = req.body;
    chatManagement.chatCreate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Chat Records Server Side
module.exports.chatRecordsServerSide = (req, res, next) =>
{
    let data = req.body;
    chatManagement.chatRecordsServerSide(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Fetch Chat Details
module.exports.fetchChatDetails = (req, res, next) =>
{
    let data = req.body;
    chatManagement.fetchChatDetails(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Chat Data Update
module.exports.chatDataUpdate = (req, res, next) =>
{
    let data = req.body;
    chatManagement.chatDataUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Real Time Chat Details
module.exports.fetchRealTimeChatData = (req, res, next) =>
{
    let data = req.body;
    chatManagement.fetchRealTimeChatData(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Real Time Chat Records Server Side
module.exports.realTimeChatRecordsServerSide = (req, res, next) =>
{
    let data = req.body;
    chatManagement.realTimeChatRecordsServerSide(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}