var express = require('express');
var IndexRouter = express.Router();
var {getbooking1} = require('../controller/Fishing.controller');


IndexRouter.get('/register',(req, res)=>{
    res.render('../views/register.hbs')
})
IndexRouter.get('/forgotpasswprd',(req,res)=>{
    res.render('../views/forgotpass.hbs')
})
IndexRouter.get('/logout', function (req, res) {
    res.clearCookie("token");
    res.redirect('/')
});
IndexRouter.get('/login',(req,res)=>{
    res.render('../views/login.hbs')
})
IndexRouter.get('/all-master',(req,res)=>{
    res.render('../views/index/allmaster.hbs')
})
IndexRouter.get('/booking/:_id',getbooking1)
IndexRouter.get('/',(req,res)=>{
    res.render('../views/index/event.hbs')
})


module.exports = IndexRouter