// Clause Category Terms Management
const cu = require('../controller/clausesDetail');
// Clause Category Terms Create
module.exports.cuadd = (req,res,next) =>
{
    let data = req.body;    
    cu.claueseDetailcreate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Clause Category Terms Records
module.exports.culist = (req,res,next) =>
{
    cu.claueseDetaillist().then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Clause Category Terms Update
module.exports.cuupdate = (req,res,next) =>
{
    let data = req.body;
    cu.claueseDetailupdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Clause Category Terms Remove
module.exports.cudelete = (req,res,next) =>
{
    let data = req.body;
    cu.claueseDetaildelete(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Clause Category Terms Details records Server Side
module.exports.clauseTermsDetailsRecordsServerSide = (req,res,next) =>
{
    let data = req.body;    
    cu.clauseTermsDetailsRecordsServerSide(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Clause Category Terms Review records Server Side
module.exports.clauseTermsReviewsRecordsServerSide = (req,res,next) =>
{
    let data = req.body;    
    cu.clauseTermsReviewsRecordsServerSide(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Clause Category Terms Review records Server Side Custom
module.exports.clauseTermsReviewsRecordsServerSideCustom = (req,res,next) =>
{
    let data = req.body;    
    cu.clauseTermsReviewsRecordsServerSideCustom(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Clause Categoey Terms Status Update
module.exports.clauseTermsStatusUpdate = (req,res,next) =>
{
    let data = req.body;
    cu.clauseTermsStatusUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Clause Categoey Terms Update For Review
module.exports.claueseDetailInsertUpdate = (req,res,next) =>
{
    let data = req.body;    
    cu.claueseDetailInsertUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Clause Categoey Terms fetch For Review
module.exports.GetTerms = (req,res,next) =>
{
    let data = res.body; 
    cu.GetTerms(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Clause Categoey Terms Update For Custom Review
module.exports.claueseDetailCustomInsertUpdate = (req,res,next) =>
{
    let data = req.body;
    cu.claueseDetailCustomInsertUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}
// Main Clause Screen Array
module.exports.mainClauseScreenDataRecords = (req,res,next) =>
{
    let data = req.body;
    cu.mainClauseScreenDataRecords(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Main Clause Screen Array
module.exports.mainClauseScreenDataRecordsTrading = (req,res,next) =>
{
    let data = req.body;
    cu.mainClauseScreenDataRecordsTrading(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Custom Clause Insert
module.exports.CustomClauseInsert = (req,res,next) =>
{
    let data = req.body;
    cu.CustomClauseInsert(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Custom Clause Terms Insert
module.exports.CustomClauseTermsInsert = (req,res,next) =>
{
    let data = req.body;
    cu.CustomClauseTermsInsert(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Custom Clause Terms Record Data
module.exports.customClauseRecords = (req,res,next) =>
{
    let data = req.body;
    cu.customClauseRecords(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Custom Clause Terms Record Data
module.exports.getCustomTermDataOfCustomClause = (req,res,next) =>
{
    let data = req.body;
    cu.getCustomTermDataOfCustomClause(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Custom Clause Terms Record Data
module.exports.CustomClauseTermsUpdateParentID = (req,res,next) =>
{
    let data = req.body;
    cu.CustomClauseTermsUpdateParentID(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.viewCustomTermDataOfCustomClause = (req,res,next) =>
{
    let data = req.body;
    cu.viewCustomTermDataOfCustomClause(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.getClauseTermDataForUpdate = (req,res,next) =>
{
    let data = req.body;
    cu.getClauseTermDataForUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.viewClauseTermUpdateRecordsOfMainClause = (req,res,next) =>
{
    let data = req.body;
    cu.viewClauseTermUpdateRecordsOfMainClause(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.getCustomClauseTermDataForUpdate = (req,res,next) =>
{
    let data = req.body;
    cu.getCustomClauseTermDataForUpdate(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.customClauseDetailsInsert = (req,res,next) =>
{
    let data = req.body;
    cu.customClauseDetailsInsert(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.viewCustomClauseTermUpdateRecordsOfMainClause = (req,res,next) =>
{
    let data = req.body;
    cu.viewCustomClauseTermUpdateRecordsOfMainClause(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Clause Category Records Server Side
module.exports.clauseCategoryRecordsServerSide = (req,res,next) =>
{
    let data = req.body;
    cu.clauseCategoryRecordsServerSide(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.clauseCategoryRecordsServerSideTrading = (req,res,next) =>
{
    let data = req.body;
    cu.clauseCategoryRecordsServerSideTrading(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// CP Form Data
module.exports.cpFormData = (req,res,next) =>
{
    let data = req.body;
    cu.cpFormData(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Fetch Vessel Data
module.exports.fetchVesselData = (req,res,next) =>
{
    let data = req.body;
    cu.fetchVesselData(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Signature File Upload
module.exports.signatureFileUpload = (req,res,next) =>
{
    let data = req.body;
    cu.signatureFileUpload(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}

// Vessel Records Server Side
module.exports.vesselRecordsServerSide = (req,res,next) =>
{
    let data = req.body;
    cu.vesselRecordsServerSide(data).then((responseData) =>
    {
        res.json(responseData)
    }).catch((err) => next(err));
}