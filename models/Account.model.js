var mongoose = require("mongoose");
//const { stringify } = require("querystring");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Tuankk:Tuan0301kk@cluster0.v7dmx.mongodb.net/fishing";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const Schema = mongoose.Schema;
const AccountSchema = new Schema({
    email : String,
    password: String,
    role : {
        type : String,
        default : "fishing"
    },
    imageUrl:{
        type: String,
        default : "https://drive.google.com/uc?export=view&id=1cOpBP5EM2JWPgTVcFhXT8lBNmv9wzyHY"
    },
    phone:String,
    address: String,
    name:String,
    bank: String,
    stk: String,
    chat:[{
           type: mongoose.Schema.Types.ObjectId,
           ref : 'chat'
    }],
    blocklist:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'account'
 }]
},
{
    collection: 'account'
});

var AccountModel = mongoose.model('account', AccountSchema);
module.exports = AccountModel