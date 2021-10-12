var mongoose = require("mongoose");
//const { stringify } = require("querystring");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Tuankk:Tuan0301kk@cluster0.v7dmx.mongodb.net/fishing";
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const Schema = mongoose.Schema;
const CalendarSchema = new Schema({
    priceMorning: String,
    priceAfternoon: String,
    priceNight: String,
    numberOfTent : Number,
    dayOff:[String],
    nameMaster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account'
    },
    
},
{
    collection: 'mastermanage'
});

var CalendarModel = mongoose.model('calendar', CalendarSchema);
module.exports = CalendarModel