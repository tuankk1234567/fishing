var mongoose = require("mongoose");
//const { stringify } = require("querystring");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Tuankk:Tuan0301kk@cluster0.v7dmx.mongodb.net/fishing";
const AccountModel = require('./Account.model')
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const Schema = mongoose.Schema;
const TicketVipSchema = new Schema({
    name: String,
    price: String,
    date: String,
    time : String,
    nameFishing: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'account'
    },
    nameMaster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account'
    },
    type:String,
    
},
{
    collection: 'ticketVip'
});

var TicketVipModel = mongoose.model('ticketVip', TicketVipSchema);
module.exports = TicketVipModel