var express = require('express');
var MasterRouter = express.Router();
const AccountModel = require('../models/Account.model')
const PostModel = require('../models/Post.model')
var jwt = require('jsonwebtoken');
var {isEmail,checkLogin, checkAdmin,checkMaster,checkAuthentication} = require('../middleware/middleware');
var {getPostData,getticketvip,getticket,deleteticketvip,uploadpost,addcomment,getcomment,like,getlist,getdatachat,addchat,addticket,addcalendar,getdatacalendar,paymentconfirmation,addtoblacklist,adddayoff,updatemanageticket,deletedayoff,notlike} = require('../controller/Master.controller');


MasterRouter.post('/getPostData',getPostData)
MasterRouter.post('/addcomment',checkAuthentication,addcomment)

MasterRouter.post('/getticketvip',getticketvip)
MasterRouter.get('/getticket',getticket)
MasterRouter.delete('/deleteticketvip',checkMaster,deleteticketvip)


MasterRouter.post('/getcomment',getcomment)
MasterRouter.get('/getlist',checkAuthentication,getlist)
MasterRouter.post('/getdatachat',checkAuthentication,getdatachat)
MasterRouter.post('/addchat',checkAuthentication,addchat)
MasterRouter.post('/addcalendar',checkMaster,addcalendar)
MasterRouter.get('/getdatacalendar',checkMaster,getdatacalendar)
MasterRouter.post('/paymentconfirmation',checkMaster,paymentconfirmation)
MasterRouter.post('/addtoblacklist',checkMaster,addtoblacklist)
MasterRouter.post('/adddayoff',checkMaster,adddayoff)
MasterRouter.post('/updatemanageticket',checkMaster,updatemanageticket)
MasterRouter.delete('/deletedayoff',checkMaster,deletedayoff)
MasterRouter.post('/notlike',checkAuthentication,notlike)

MasterRouter.get('/manageBooking',(req,res)=>{
      res.render("../views/Master/managerBooking.hbs")


  
})




MasterRouter.get('/event',(req,res)=>{
  let token = req.cookies.token
  if(token === undefined){
    res.render('../views/Master/event.hbs',{data:'0'})
  }else{
    var nameMaster = jwt.verify(token,'tuan')
    AccountModel.findOne({_id:nameMaster})
    .then(data=>{
      res.render('../views/Master/event.hbs',{data:data})

    })

  }
    
    
})
MasterRouter.get('/manageTicket',(req,res)=>{
      res.render('../views/Master/manageTicket.hbs')


  
})
MasterRouter.post('/like',checkAuthentication,like)
MasterRouter.get('/chat',(req,res)=>{
  let token = req.cookies.token
  if(token === undefined){
    res.render('../views/Master/chat.hbs',{data:'0'})
  }else{
    var nameMaster = jwt.verify(token,'tuan')
    AccountModel.findOne({_id:nameMaster})
    .then(data=>{
      res.render('../views/Master/chat.hbs',{data:data})

    })

  }
    
  
})



MasterRouter.post('/uploadPost',checkAuthentication, uploadpost)
MasterRouter.post('/addticket',addticket)



module.exports = MasterRouter