const express = require("express");
const app = express();
var bodyParser = require('body-parser')
const multer = require('multer');
var jsonParser = bodyParser.json()
var hbs = require('hbs');
var jwt = require('jsonwebtoken');
var path = require('path');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded({ extended: false }))
var cookieParser = require('cookie-parser')
const AccountModel = require('./models/Account.model')
var bodyParser = require('body-parser');
const PostModel = require('./models/Post.model')
const ChatModel = require('./models/Chat.model')
const Account = require("./routers/Account.router");
const Fishing = require("./routers/fishing.router")
const Admin= require("./routers/Admin.router");
const Master = require("./routers/Master.router");
const Index = require("./routers/index.router")

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/views')));
// parse application/json
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/account',Account);
app.use('/admin',Admin)
app.use('/master',Master)
app.use('/allmaster',Fishing)
app.use('/',Index);

const http = require('http');
const socket = require('socket.io');

const server = http.createServer(app);
const io = socket(server);


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


io.on("connection",function(socket){
  console.log("co người kết nối:" + socket.id)

  socket.on("tao-room-comment",function(data){
    socket.join(data);
    socket.room_comment = data;
  })
  socket.on("tao-room-chat",function(data){
    socket.join(data);
    socket.room_chat = data;
  })
  socket.on("user-comment",function(data){
    var idPost = data.idPost;
    var commentPost = data.commentPost;
    var idUcomment = data.idUser;
    var date = data.date;
    var time = data.time;
    console.log(idPost,commentPost)
    var comment = {idUserC:idUcomment,writeComment:commentPost,date:date,time:time}
    PostModel.updateOne({_id:idPost},{$push: {comment:comment}}).then(data=>{
        console.log(data)
    })
    console.log(data)
    io.sockets.in(socket.room_comment).emit("server-comment",data)
  })
  socket.on("user-chat",function(data){
    var idchat = data.id;
    var chat = data.chat;
    var idWriter = data.idUser;
    var date = data.date;
    var time = data.time;
    var write = {idWriter:idWriter,write:chat,date:date,time:time}
    ChatModel.updateOne({_id:idchat},{$push: {write:write}}).then(data=>{
      console.log(data)
  })
    console.log(data)
    io.sockets.in(socket.room_chat).emit("server-chat",data)
  })

})