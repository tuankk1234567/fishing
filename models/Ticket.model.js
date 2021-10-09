var mongoose = require("mongoose");
//const { stringify } = require("querystring");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Tuankk:Tuan0301kk@cluster0.v7dmx.mongodb.net/fishing";
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const Schema = mongoose.Schema;
const TicketSchema = new Schema({
    price: Number,
    time : String,
    sentenceTime: String,
    nameMaster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account'
    },
    
},
{
    collection: 'ticket'
});

var TicketModel = mongoose.model('ticket', TicketSchema);
module.exports = TicketModel