const express = require('express');
const multer = require('multer');
const router = express.Router();
const User = require('./User');
const Alert = require('./alert');
const Broker = require('./brokermanage');
const Owner = require('./owner');
const Use =require('../controller/createuser');
const VesselManagement = require('../controller/vesselmanage');
var moment   = require('moment');
var date   = new Date();
var myDate   = moment(date).format('llll');
var FrontUser = require('./frontenduser');
const Imagecontrol = require('../controller/image.js');
const Messagecentercontrol=require('./messagecenter.js');
const Archievedata = require('../controller/archivemanagement');
const charterpartytypedata = require('./charterpartytype');
const cu = require('./Clausesdetail');
const cc = require('./ClausesCategory');
const cpForm = require('./cpForm');
const drawForm = require('./drawForm');
const drawInvite = require('./drawInvite');

const notification = require('./notification');

const tradingPlatformRouteInfo = require('./trading');

const cityForm = require('./city');

const subadminrole = require('./subadminrole');

const messageCenterManagement = require('./message');
const chatManagement = require('./chat');

const tc = require('./terms-condition');
const faq = require('./faq');

// var storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null,'upload/') 
// 	},
// 	filename: function (req, file, cb) {
// 		cb(null, file.fieldname + myDate + file.originalname)
// 	}
// })

//var upload = multer({ dest :'upload/' })
// var upload = multer({ storage :storage })
// var cpUpload = upload.fields([{ name: 'company_background_sheet'}, { name: 'vessal_history_sheet'}, { name: 'operating_record_sheet'}])


router.post('/register', User.register);
router.post('/login', User.login);

//Route for super Admin
router.post('/superadminregister', User.superadminregister);
router.post('/superadminlogin', User.superadminlogin);
router.post('/forgotpassword', User.superadmiforgotpassword);
router.post('/changepassword',User.superadminchangepassword);

router.post('/subadminroleupdate', subadminrole.subadminroleupdate);
router.get('/subadminroleread', subadminrole.subadminroleread);
router.post('/subadminroleCreate',subadminrole.subadminroleCreate);


//Route for user role
router.post('/userrolecreate',User.userrolecreate);
router.post('/userroleread',User.userroleread);
router.post('/userroleupdate',User.userroleupdate);
router.post('/userroledelete',User.userroledelete);
router.post('/userroleactive',User.userroleactive);
 
//Route for module
router.post('/modulecreate',User.modulecreate);
router.post('/moduleread',User.moduleread);
router.post('/moduleupdate',User.moduleupdate);
router.post('/moduledelete',User.moduledelete);

router.post('/moduleactioncreate',User.moduleactioncreate);
router.post('/selectrolelist',User.selectrolelist);

// Route for Role Management
router.post('/roleAssign',User.roleAssign);

// Route for User Management
router.post('/userLogin',User.userLogin);
router.post('/createUser',User.createUser);
router.post('/removeUser',User.removeUser);
router.get('/userList',User.userList);
router.post('/userupdate',User.userupdate);

router.get('/userInfo/:id',User.userInfo);
// router.put('/userUpdate',Use.userUpdate);

//Route for company management 
router.post('/companycreate',User.companycreate);
router.get('/companylist',User.companyList);
router.post('/getUsersCompanyList',User.getUsersCompanyList);
router.post('/companyupdate',User.companyUpdate);
router.post('/companydelete',User.companyDelete);

//Route for company Admin Management
router.post('/companyStatusUpdate',User.companyStatusUpdate);
router.get('/companyadminlist',User.companyadminlist);
router.post('/companyadmincreate',User.companyadmincreate);
router.post('/companyadminupdate',User.companyadminupdate);
router.post ('/companyadmindelete',User.companyadmindelete);

//Route for company Admin Management
// router.get('/companyadminlist',User.companyadminlist);
// router.post('/companyadmincreate',User.companyadmincreate);
// router.post('/companyadminupdate',User.companyadminupdate);
// router.post('/companyadmindelete',User.companyadmindelete);

//Router for Charter Management
router.post('/chartercreate',User.chartercreate);
router.get('/charterlist',User.charterlist);
router.post('/charterdetails',User.charterdetails);
router.post('/charterupdate',User.charterupdate);
router.post('/charterdelete',User.charterdelete);

router.get('/roleAccessmoduleView',User.roleActionView);
router.post('/rolePermision',User.rolePermision);

//alert api 
router.post('/categoryAdd',Alert.categoryAdd);
router.post('/categoryEdit',Alert.categoryEdit);
router.post('/categoryDelete',Alert.categoryDelete);
router.post('/subcategoryAdd',Alert.subcategoryAdd);
router.post('/subcategoryEdit',Alert.subcategoryEdit);
router.post('/subcategoryDelete',Alert.subcategoryDelete);


router.get('/BrokerManegeAlerlist',Alert.BrokerManegeAlerlist);

//Router for Broker management
router.get('/AllBrokerlist',Broker.Brokerlist);
router.post('/BrokerAdd',Broker.BrokerAdd);
router.post('/BrokerEdit',Broker.BrokerEdit);
router.post('/BrokerDelete',Broker.BrokerDelete);
router.post('/BrokerDetails',Broker.BrokerDetails);

//Router for Owner management
router.post('/OwnerCreate',Owner.OwnerCreate);
router.get('/OwnerRecords',Owner.OwnerRecords);
router.post('/OwnerDetails',Owner.OwnerDetails);
router.post('/OwnerEdit',Owner.OwnerEdit);
router.post('/OwnerDelete',Owner.OwnerDelete);

//Router for vessel management
//router.post('/vesseladd',upload.array('file',12),VesselManagement.addvessel);
router.post('/fileupload',VesselManagement.FileUpload);
router.post('/vesseladd',VesselManagement.addvessel);
router.get('/vessellist',VesselManagement.vesselList);
router.post('/vesseldelete',VesselManagement.vesselDelete);
router.post('/vesselupdate',VesselManagement.vesselUpdate);
router.get('/vesselbase',VesselManagement.vesselBase);
router.get('/vesselstatus',VesselManagement.vesselStatus);
router.get('/vesselcomment',VesselManagement.commentList);
router.get('/vesselbuilder',VesselManagement.vesselBuilder);
router.get('/vesselflag',VesselManagement.vesselFlag);
router.get('/auxenginedesignlist',VesselManagement.auxenginedesignList);
router.get('/auxenginetypelist',VesselManagement.auxenginetypeList);
router.get('/fueltypeslist',VesselManagement.fueltypesList);
router.get('/nationalitylist',VesselManagement.nationalityList);
router.get('/portregistrylist',VesselManagement.portregistryList);
router.get('/shiptypelist',VesselManagement.shiptypeList);
router.get('/vesselactivity',VesselManagement.vesselActivity);
router.post('/vesseldetails',VesselManagement.vesselDetails);

router.post('/addvesselposition',VesselManagement.addvesselPosition);
router.get('/vesselportlist',VesselManagement.vesselportList);
router.post('/vesselpositionlist',VesselManagement.vesselpositionList);
router.get('/vesselmateriallist',VesselManagement.vesselmaterialList);
router.get('/vesselportberthlist',VesselManagement.vesselportberthList);
router.post('/vesselpositiondelete',VesselManagement.vesselpositiondelete);
router.post('/addvesseltracking',VesselManagement.addvesselTracking);
router.post('/vesseltrackinglist',VesselManagement.vesseltrackinglist);
router.post('/vesseltrackingdelete',VesselManagement.vesseltrackingdelete);


//cp-frontend user section
router.post('/userslogin', FrontUser.userlogin);
router.post('/userchangepassword', FrontUser.userchangepassword);
router.post('/userforgotpassword', FrontUser.forgotpassword);
router.post('/resetPassword', FrontUser.resetPassword);
router.post('/systemActivityAlert', FrontUser.systemActivityAlert);
router.post('/Changeprofile', FrontUser.Changeprofile);
router.post('/systemActivityAlertupdate', FrontUser.systemActivityAlertupdate);
router.post('/image_uplaod/:id', Imagecontrol.image_upload);

// staff management
router.post('/staffcreate',User.staffadd);
router.get('/stafflist',User.stafflist);
router.post('/staffdetails',User.staffdetails);
router.post('/staffupdate',User.staffedit);
router.post('/staffdelete',User.staffdelete);

//message center section
router.get('/nudgelist', Messagecentercontrol.nudgelist);
router.post('/nudgedelete', Messagecentercontrol.nudgedelete);
router.post('/singleNudgeview/:id', Messagecentercontrol.singleNudgeview);
router.post('/editNudge', Messagecentercontrol.editNudge);
router.post('/addNudge', Messagecentercontrol.addNudge);
router.post('/messageread/:id', Messagecentercontrol.messageread);
router.get('/messageSystemAlertlist/', Messagecentercontrol.messageSystemAlertlist);

// Archive router
router.get('/archiverolelist', Archievedata.archiverolelist);
router.get('/archiveuserlist', Archievedata.archiveuserlist);
router.get('/archivecompanylist', Archievedata.archivecompanylist);
router.post('/companyrecover', Archievedata.companyrecover);
router.post('/rolerecover', Archievedata.rolerecover);
router.post('/permanentdeleteuser',Archievedata.permanentdeleteuser);

// youngbrainz update***********************************************************************************

// Charter Party Type Routes
router.get('/charterpartylist', charterpartytypedata.cptypelist);
router.post('/charterpartytypecreate',charterpartytypedata.cptypeadd);
router.post('/charterpartypeupdate',charterpartytypedata.cptypeupdate);
router.post('/charterpartytypedelete',charterpartytypedata.cptypedelete);
router.post('/charterPartyStatusUpdate',charterpartytypedata.charterPartyStatusUpdate);

// CP Form Routes
router.get('/cpFromlist', cpForm.cpFormlist);
router.post('/cpFromcreate',cpForm.cpFormadd);
router.post('/cpFromupdate',cpForm.cpFormupdate);
router.post('/cpFromdelete',cpForm.cpFormdelete);
router.post('/cpFormStatusUpdate',cpForm.cpFormStatusUpdate);

// Clause Category Routes
router.get('/clusesCategorylist', cc.cclist);
router.post('/clusesCategorycreate',cc.ccadd);
router.post('/clusesCategoryupdate',cc.ccupdate);
router.post('/clusesCategorydelete',cc.ccdelete);
router.post('/clauseCategoryServerSideRecords',cc.clauseCategoryServerSideRecords);
router.post('/clauseCategoryStatusUpdate',cc.clauseCategoryStatusUpdate);
router.post('/clauseCategoryUpload',cc.clauseCategoryUpload);

// Clause Category Terms Routes
router.get('/cluseslist', cu.culist);
router.post('/clusescreate',cu.cuadd);
router.post('/clusesupdate',cu.cuupdate);
router.post('/clusesdelete',cu.cudelete);
router.post('/clauseTermsDetailsRecordsServerSide',cu.clauseTermsDetailsRecordsServerSide);
router.post('/clauseTermsReviewsRecordsServerSide',cu.clauseTermsReviewsRecordsServerSide);
router.post('/clauseTermsReviewsRecordsServerSideCustom',cu.clauseTermsReviewsRecordsServerSideCustom);
router.post('/clauseTermsStatusUpdate',cu.clauseTermsStatusUpdate);
router.post('/claueseDetailInsertUpdate',cu.claueseDetailInsertUpdate);
router.post('/claueseDetailCustomInsertUpdate',cu.claueseDetailCustomInsertUpdate);
router.post('/mainClauseScreenDataRecords',cu.mainClauseScreenDataRecords);
router.post('/mainClauseScreenDataRecordsTrading',cu.mainClauseScreenDataRecordsTrading);

router.post('/CustomClauseInsert',cu.CustomClauseInsert);
router.post('/CustomClauseTermsInsert',cu.CustomClauseTermsInsert);

router.post('/customClauseRecords',cu.customClauseRecords);
router.post('/getCustomTermDataOfCustomClause',cu.getCustomTermDataOfCustomClause);
router.post('/CustomClauseTermsUpdateParentID',cu.CustomClauseTermsUpdateParentID);
router.post('/viewCustomTermDataOfCustomClause',cu.viewCustomTermDataOfCustomClause);

router.post('/getClauseTermDataForUpdate',cu.getClauseTermDataForUpdate);
router.post('/viewClauseTermUpdateRecordsOfMainClause',cu.viewClauseTermUpdateRecordsOfMainClause);
router.post('/getCustomClauseTermDataForUpdate',cu.getCustomClauseTermDataForUpdate);
router.post('/customClauseDetailsInsert',cu.customClauseDetailsInsert);

router.post('/viewCustomClauseTermUpdateRecordsOfMainClause',cu.viewCustomClauseTermUpdateRecordsOfMainClause);

router.post('/clauseCategoryRecordsServerSide',cu.clauseCategoryRecordsServerSide);
router.post('/clauseCategoryRecordsServerSideTrading',cu.clauseCategoryRecordsServerSideTrading);

router.post('/cpFormData',cu.cpFormData);

router.post('/fetchVesselData',cu.fetchVesselData);
router.post('/vesselRecordsServerSide',cu.vesselRecordsServerSide);
router.post('/signatureFileUpload',cu.signatureFileUpload);

// Draw Management Routes
router.get('/drawFormRecords',drawForm.drawFormRecords);
router.post('/drawRecordsServerSide',drawForm.drawRecordsServerSide);
router.post('/DrawFormCreate',drawForm.DrawFormCreate);
router.post('/DrawFormCopyCreate',drawForm.DrawFormCopyCreate);
router.post('/drawFormUpdate',drawForm.drawFormUpdate);
router.post('/drawDataRemove',drawForm.drawDataRemove);
router.post('/CharterDrawAcceptReject',drawForm.CharterDrawAcceptReject);
router.post('/charterPartyRequestStatusUpdate',drawForm.charterPartyRequestStatusUpdate);

router.post('/drawRecordsServerSideCharterer',drawForm.drawRecordsServerSideCharterer);
router.post('/DrawRequestToChartererCreate',drawForm.DrawRequestToChartererCreate);

router.post('/drawFormUpdateByCharterCheck',drawForm.drawFormUpdateByCharterCheck);
router.post('/drawFormUpdateByBrokerCheck',drawForm.drawFormUpdateByBrokerCheck);
router.post('/drawFormUpdateByOwnerCheck',drawForm.drawFormUpdateByOwnerCheck);

router.post('/tradingFormUpdateByOwnerCheck',drawForm.tradingFormUpdateByOwnerCheck);
router.post('/tradingFormUpdateByBrokerCheck',drawForm.tradingFormUpdateByBrokerCheck);
router.post('/tradingFormUpdateByChartererCheck',drawForm.tradingFormUpdateByChartererCheck);

router.post('/drawProgressUpdateCustom',drawForm.drawProgressUpdateCustom);

router.post('/companyRecordsServerSide',drawForm.companyRecordsServerSide);
router.post('/userRecordsServerSide',drawForm.userRecordsServerSide);

router.post('/drawDataUpdateCommon',drawForm.drawDataUpdateCommon);
router.post('/sendNotificationToCharterer',drawForm.sendNotificationToCharterer);

router.post('/updateChartererToTrade',drawForm.updateChartererToTrade);
router.post('/updateOwnerToTrade',drawForm.updateOwnerToTrade);

router.post('/updateChartererToDraw',drawForm.updateChartererToDraw);

router.post('/drawProgressUpdate',drawForm.drawProgressUpdate);
router.post('/tradingProgressUpdate',drawForm.tradingProgressUpdate);
router.post('/drawStatusInfoUpdate',drawForm.drawStatusInfoUpdate);
router.post('/tradingStatusInfoUpdate',drawForm.tradingStatusInfoUpdate);
router.post('/DrawFormCopyCreate',drawForm.DrawFormCopyCreate);

router.post('/drawDataUpdate',drawForm.drawDataUpdate);
router.post('/fetchDrawData',drawForm.fetchDrawData);
router.post('/fetchTradingData',drawForm.fetchTradingData);
router.post('/tradingDataUpdate',drawForm.tradingDataUpdate);
router.post('/fetchCompanyData',drawForm.fetchCompanyData);

router.post('/updateCheckedClauses',drawForm.updateCheckedClauses);
router.post('/customInputDrawDataUpdate',drawForm.customInputDrawDataUpdate);
router.post('/drawDataSignatureUpadate',drawForm.drawDataSignatureUpadate);
router.post('/tradingDataSignatureUpadate',drawForm.tradingDataSignatureUpadate);
router.post('/updateCheckedClausesTrading',drawForm.updateCheckedClausesTrading);
router.post('/customInputTradingDataUpdate',drawForm.customInputTradingDataUpdate);

// City Management Routes
router.get('/CityRecords',cityForm.CityRecords);
router.post('/CityCreate',cityForm.CityCreate);
router.post('/CityUpdate',cityForm.CityUpdate);
router.post('/CityRemove',cityForm.CityRemove);

// Draw Invite Management Routes
router.post('/DrawInviteRecordsServerSide',drawInvite.DrawInviteRecordsServerSide);
router.post('/DrawInviteCreate',drawInvite.DrawInviteCreate);
router.post('/DrawInviteUpdate',drawInvite.DrawInviteUpdate);
router.post('/DrawInviteRemove',drawInvite.DrawInviteRemove);

// Notification Management Routes
router.post('/notificationCreate',notification.notificationCreate);
router.post('/notificationRecords',notification.notificationRecords);

// Trading Platform Routes
router.get('/TradingFormRecords',tradingPlatformRouteInfo.TradingFormRecords);
router.post('/TradingFormCreate',tradingPlatformRouteInfo.TradingFormCreate);
router.post('/TradingFormRecordsServerSide',tradingPlatformRouteInfo.TradingFormRecordsServerSide);
router.post('/TradingFormUpdate',tradingPlatformRouteInfo.TradingFormUpdate);
router.post('/TradingPlatformDataRemove',tradingPlatformRouteInfo.TradingPlatformDataRemove);
router.post('/TradingPlatformAcceptReject',tradingPlatformRouteInfo.TradingPlatformAcceptReject);
router.post('/TradingPlatformRequestToChartererCreate',tradingPlatformRouteInfo.TradingPlatformRequestToChartererCreate);
router.post('/TradingPlatformRequestStatusUpdate',tradingPlatformRouteInfo.TradingPlatformRequestStatusUpdate);
router.post('/TradingPlatformRecordsServerSideCharterer',tradingPlatformRouteInfo.TradingPlatformRecordsServerSideCharterer);

router.post('/TradingCounterInsert',tradingPlatformRouteInfo.TradingCounterInsert);
router.post('/getCounterNumber',tradingPlatformRouteInfo.getCounterNumber);
router.post('/TradingData',tradingPlatformRouteInfo.TradingData);

router.post('/TradingStandardFormCreate',tradingPlatformRouteInfo.TradingStandardFormCreate);

router.post('/tradingEmailIDAndNotificationSend',tradingPlatformRouteInfo.tradingEmailIDAndNotificationSend);

router.post('/getCompanyName',tradingPlatformRouteInfo.getCompanyName);

router.post('/fetchTradingDataInfo',tradingPlatformRouteInfo.fetchTradingDataInfo);
router.post('/fetchTradingStatusInfo',tradingPlatformRouteInfo.fetchTradingStatusInfo);
router.post('/fetchTradingStdBidReady',tradingPlatformRouteInfo.fetchTradingStdBidReady);
router.post('/StandardBidFormDataUpdate',tradingPlatformRouteInfo.StandardBidFormDataUpdate);
router.post('/TradingPlatformRequestStatusUpdateCommon',tradingPlatformRouteInfo.TradingPlatformRequestStatusUpdateCommon);
router.post('/tradingMessageInsert',tradingPlatformRouteInfo.tradingMessageInsert);
router.post('/tradingNotificationInsert',tradingPlatformRouteInfo.tradingNotificationInsert);
router.post('/tradingProgressInsert',tradingPlatformRouteInfo.tradingProgressInsert);
router.post('/tradingDataUpdateCommon',tradingPlatformRouteInfo.tradingDataUpdateCommon);
router.post('/copyTradingData',tradingPlatformRouteInfo.copyTradingData);
router.post('/chartererInviteOwnerForTrade',tradingPlatformRouteInfo.chartererInviteOwnerForTrade);
router.post('/ownerInviteChartererForTrade',tradingPlatformRouteInfo.ownerInviteChartererForTrade);
router.post('/newUsersRecords',tradingPlatformRouteInfo.newUsersRecords);
router.post('/tradeStatusData',tradingPlatformRouteInfo.tradeStatusData);

// Message Center Routes
router.post('/messageCenterCreate',messageCenterManagement.messageCenterCreate);
router.post('/messageCenterRecordsServerSide',messageCenterManagement.messageCenterRecordsServerSide);
router.post('/messageCenterDataUpdate',messageCenterManagement.messageCenterDataUpdate);
router.post('/tradingProgressRecordsServerSide',messageCenterManagement.tradingProgressRecordsServerSide);



// Chat Management Routes
router.post('/chatCreate',chatManagement.chatCreate);
router.post('/chatRecordsServerSide',chatManagement.chatRecordsServerSide);
router.post('/fetchChatDetails',chatManagement.fetchChatDetails);
router.post('/chatDataUpdate',chatManagement.chatDataUpdate);
router.post('/fetchRealTimeChatData',chatManagement.fetchRealTimeChatData);
router.post('/realTimeChatRecordsServerSide',chatManagement.realTimeChatRecordsServerSide);


// FAQ Management Routes
router.get('/faqlist',faq.faqlist);
router.post('/faqcreate',faq.faqcreate);
router.post('/faqupdate',faq.faqupdate);
router.post('/faqdelete',faq.faqdelete);
router.post('/faqStatusUpdate',faq.faqStatusUpdate);

// TERMS CONDITION Management Routes
router.get('/tclist',tc.tclist);
router.post('/tccreate',tc.tccreate);
router.post('/tcupdate',tc.tcupdate);
router.post('/tcdelete',tc.tcdelete);
router.post('/tcStatusUpdate',tc.tcStatusUpdate);

module.exports = router;