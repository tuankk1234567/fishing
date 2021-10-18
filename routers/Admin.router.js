var express = require('express');
var AdminRouter = express.Router();
var {isEmail,checkLogin, checkAdmin,checkMaster,checkAuthentication} = require('../middleware/middleware');
var {getAccount,deleteAccount,addMaster,deletePost,getnumberaccount} = require('../controller/Admin.controller');
var jwt = require('jsonwebtoken');
const AccountModel = require('../models/Account.model')
AdminRouter.get('/manage',(req,res)=>{
    res.render('../views/Admin/manage.hbs')
})
AdminRouter.post('/getaccount',checkAdmin,getAccount)
AdminRouter.delete('/deleteaccount',checkAdmin,deleteAccount)
AdminRouter.post('/addmaster',checkAdmin,addMaster)
AdminRouter.get('/event',(req,res)=>{
    let token = req.cookies.token
      var id = jwt.verify(token,'tuan')
      AccountModel.findOne({_id:id})
      .then(data=>{
        res.render('../views/Admin/event.hbs',{data:data})
  
      })
      
  })
AdminRouter.post('/getnumberaccount',getnumberaccount)
  AdminRouter.delete('/deletePost',checkAuthentication,deletePost)
module.exports = AdminRouter