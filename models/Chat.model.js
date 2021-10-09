var mongoose = require("mongoose");
//const { stringify } = require("querystring");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Tuankk:Tuan0301kk@cluster0.v7dmx.mongodb.net/fishing";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const Schema = mongoose.Schema;
const ChatSchema = new Schema({
    idMaster:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'account'
    },
    write:[{
        idWriter:{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'account'
        },
        write: String,
        date:String,
        time:String,
    }]
},
{
    collection: 'chat'
});

var AccountModel = mongoose.model('chat', ChatSchema);
module.exports = AccountModel