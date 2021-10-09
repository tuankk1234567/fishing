var express = require('express');
var router = express.Router();
var {docreateFishing,loginController,indexAdmin,indexMaster,indexFishing,forgotpassword,doupdate,getdata,dochangepass,profile,getprofile,getPostData} = require('../controller/Account.controller');
var {isEmail,checkLogin, checkAdmin,checkMaster,checkAuthentication} = require('../middleware/middleware');


router.post('/dologin', checkLogin,loginController),
router.post('/doRegister', isEmail, docreateFishing,loginController),
router.post('/doupdate',doupdate),
router.post('/dochangepass',dochangepass)
router.post('/doforgotpassword',forgotpassword)
router.get('/indexAdmin',checkAdmin, indexAdmin)
router.get('/getdata',getdata)
router.get('/indexMaster',checkMaster, indexMaster)
router.get('/indexFishing',checkAuthentication,indexFishing)
router.get('/profile/:_id',profile)
router.post('/getprofile',getprofile)
router.post('/getPostData',getPostData)



module.exports = router