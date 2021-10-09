var mongoose = require("mongoose");
//const { stringify } = require("querystring");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Tuankk:Tuan0301kk@cluster0.v7dmx.mongodb.net/fishing";
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const Schema = mongoose.Schema;
const PostSchema = new Schema({
    idUser : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'account'
    },
    date: String,
    time: String,
    imageUrl: [{type: String}],
    writePost : String,
    comment : [{
        idUserC : {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'account'
        },
        writeComment : String,
        date: String,
        time: String,
    }],
    like:[{
        type: mongoose.Schema.Types.ObjectId,
            ref : 'account'
    }]
    
},
{
    collection: 'post'
});

var PostModel = mongoose.model('post', PostSchema);
module.exports = PostModel