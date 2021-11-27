var express = require('express');
var FishingRouter = express.Router();
const AccountModel = require('../models/Account.model')
var { isEmail, checkLogin, checkAdmin, checkMaster, checkAuthentication } = require('../middleware/middleware');
var { getpage, getbooking1, getbooking2, bookingticket, warehouse, getticketVip, getdata, addtomessage, getwarehouse, getticket } = require('../controller/Fishing.controller');
var jwt = require('jsonwebtoken');

FishingRouter.get('/booking/:_id', getbooking2)
FishingRouter.post('/bookingticket', checkAuthentication, bookingticket)
FishingRouter.post('/getticketvip', getticketVip)
FishingRouter.get('/warehouse', warehouse)
FishingRouter.get('/getwarehouse', checkAuthentication, getwarehouse)
FishingRouter.get('/', getpage)
FishingRouter.post('/getdata', getdata)
FishingRouter.post('/addtomessage', checkAuthentication, addtomessage)
FishingRouter.post('/getticket', getticket)
FishingRouter.get('/event', (req, res) => {
    let token = req.cookies.token
    if (token === undefined) {
        res.render('../views/fishing/event.hbs', { data: '0' })

    } else {
        var id = jwt.verify(token, 'tuan')
        AccountModel.findOne({ _id: id })
            .then(data => {
                res.render('../views/fishing/event.hbs', { data: data })

            })
    }


})
FishingRouter.get('/chat', (req, res) => {
    let token = req.cookies.token
    if (token === undefined) {
        res.render('../views/fishing/chat.hbs', { data: '0' })
    } else {
        var id = jwt.verify(token, 'tuan')
        AccountModel.findOne({ _id: id })
            .then(data => {
                res.render('../views/fishing/chat.hbs', { data: data })

            })
    }


})















FishingRouter.get('*', (req, res) => {
    res.redirect('/error')
})



module.exports = FishingRouter