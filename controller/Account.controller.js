const AccountModel = require('../models/Account.model')
const PostModel = require('../models/Post.model')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require("fs");
const saltRounds = 10;
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { response } = require('express');
const CLIENT_ID = '1062793672536-fgj917nter97kmoouqe88jru6gs13kt1.apps.googleusercontent.com';
const CLIENT_SECRET ='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';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04I2Xw44VyQT3CgYIARAAGAQSNwF-L9Ir7yo7RkLt5Fh2HyBc9drC06Dlynpg7L7klTQjeSgCBJHj95Y9wxm6a7MkB_Jci6V8OlY';
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN})

const drive = google.drive({
  version: 'v3',
  auth: oAuth2Client
})

let imageUrl;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {

            imageUrl = Date.now()+'.jpg'
      
        
        cb(null, imageUrl);
         
    }
  })
    var upload = multer({ storage: storage }).single("imageUrl");
 

var transporter =  nodemailer.createTransport({ 
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'fishing2479999@gmail.com', 
        pass: 'Tuan0301kk' 
    },
    tls: {
        rejectUnauthorized: false
    }
    });
   

let docreateFishing = async (req,res, next )=>{
    var password = req.body.password;
    var email = req.body.email;
    var role = req.body.role;
    var phone = req.body.phone;
    var address = req.body.address;
    var name = req.body.name;
    var bank = req.body.bank;
    var stk = req.body.stk;
    if(email && password){
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        AccountModel.create({
            email:email,
            password :hash, 
            role: role,
            phone:phone,
            address:address,
            name:name,
            bank:bank,
            stk:stk
        },(err,data)=>{
            var user = data;
            req.user = user;
            next();
        });
        
    }  
}

let indexMaster = (req, res)=>{
    

        res.render('../views/index/indexMaster.hbs')

}
let indexFishing = (req, res)=>{

        res.render('../views/index/indexFishing.hbs')

}
let loginController = function(req,res){
    bcrypt.compare(req.body.password, req.user.password, function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            
            let user = req.user 
            let token = jwt.sign({_id: user._id},'tuan');
            res.cookie("token",token,{maxAge: 60*60*10000});

            if(user.role === "admin"){
                res.json({mss:'admin'})

            }
            if(user.role === "master"){          
                res.json({mss:'master'})
            }
            if(user.role === "fishing"){
                res.json({mss:'fishing'}) 
            }                             
            }else{
                var message= "Username or password is invalid"
                res.json({message:message})
            }
        }
    )
}


let indexAdmin = (req, res)=>{
    
        res.render('../views/index/indexAdmin.hbs')
 
    
}
let getdata = (req,res)=>{
    let token = req.cookies.token
    if(token === undefined){
        res.json({account:'0'})
    }else{
        var _id = jwt.verify(token,'tuan')
        AccountModel.findOne({_id : _id},(err,data)=>{
            res.json({account:data})
        })
    }
    

}
let forgotpassword =(req,res)=>{
    var email = req.body.email;
    var password = req.body.password;
    AccountModel.findOne({email:email}).then(data=>{
        if(data){
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            AccountModel.update({email:email},{password:hash}).then(data=>{
                
            })
            var content = 'Mật khẩu mới của bạn là: ' + password;
                var mainOptions = { 
                    from: 'fishing2479999@gmail.com',
                    to: email,  
                    subject: 'Notification',
                    text: content 
                }
                transporter.sendMail(mainOptions, function(err, info){
                    if (err) {
                        console.log(err);
                    } 
                });
                res.json({mss:"Mật khẩu của bạn đã được gửi về mail"})


        }
        else{
            res.json({mss:"tai khoan khong ton tai"})
        }
    })
}
function getIdFromGoogleDrive(url) {
    var id = "";
    var parts = url.split(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/);
    if (url.indexOf('?id=') >= 0){
       id = (parts[6].split("=")[1]).replace("&usp","");
       return id;
     } else {
     id = parts[5].split("/");
     //Using sort to get the id as it is the longest element. 
     var sortArr = id.sort(function(a,b){return b.length - a.length});
     id = sortArr[0];
     return id;
     }
   }



let doupdate = (req,res)=>{
    

    upload(req,res,function(err) {
        if(err){
            console.log(err)
        }else{
            drive.files.create({
                requestBody: {
                  name: imageUrl, //This can be name of your choice
                  mimeType: 'image/jpg',
                },
                media: {
                  mimeType: 'image/jpg',
                  body: fs.createReadStream(req.file.path),
                },
              },(err,data)=>{
                  drive.permissions.create({
                      fileId:data.data.id,
                      requestBody:{
                          role: 'reader',
                          type: 'anyone'
                      }
                  })
                   drive.files.get({
                      fileId: data.data.id,
                      fields: 'webViewLink'
                  },(err,data2)=>{
                      var idGoogleGoogleDrive = getIdFromGoogleDrive(data2.data.webViewLink);
                      var link = 'https://drive.google.com/uc?export=view&id=';
                      var linkImage = link.concat(idGoogleGoogleDrive)
                     

                      
                      var phone = req.body.phone;
                      var address = req.body.address;
                      var name = req.body.name;
                      var bank = req.body.bank;
                      var stk = req.body.stk;
                      var token = req.cookies.token;
                      var _id = jwt.verify(token,'tuan')
                  
                  
                      	if(err) {
                      		console.log(err)
                      	}
                          if(imageUrl === undefined){
                              AccountModel.updateOne({_id:_id},{
                                  phone:phone,
                                  address:address,
                                  name:name,
                                  bank:bank,
                                  stk:stk}).then(data=>{
                     
                                  })
                             
                  
                  
                          }else{
                              AccountModel.updateOne({_id:_id},{
                                  phone:phone,
                                  address:address,
                                  name:name,
                                  bank:bank,
                                  stk:stk,
                                  imageUrl:linkImage}).then(data=>{
                           
                                  })
                                  
                          }
                          AccountModel.findOne({_id:_id},(err,data)=>{
                              res.json({account:data})
                          })
                  })

              });

        }
        
    //    
        

	});
    
    
    
  

}
let dochangepass = (req,res)=>{
    var pass = req.body.pass;
    var passnew1 = req.body.passnew1;
    var token = req.cookies.token;
    var _id = jwt.verify(token,'tuan')

    AccountModel.findOne({_id:_id})
    .then(data=>{
        bcrypt.compare(pass, data.password, function(err,result){
            if(err){
                console,log(err)
            }else if(result){
                const salt = bcrypt.genSaltSync(saltRounds);
                const hash = bcrypt.hashSync(passnew1, salt);
                AccountModel.updateOne({_id:_id},{password:hash},(err,data)=>{
                    res.json({mss:'Đổi mật khẩu thành công'})
                })

            }else{
                res.json({mss:"Mật khẩu không đúng"})
            }
        })
    })

}
 let profile = (req,res)=>{
     let _id = req.params._id;
     res.render('../views/index/profile.hbs',{_id:_id})
 }
 let getprofile = (req,res)=>{
    let _id = req.body._id;
        AccountModel.findOne({_id : _id},(err,data)=>{
            res.json({account:data})
        })
    

}
let getPostData = (req,res)=>{
    var token = req.cookies.token;
    if(token === undefined){
        var _id = req.body._id;
        PostModel.find({idUser:_id}).populate('idUser').populate('comment.idUserC').sort({_id: -1})
        .then(data=>{
            
            res.json({data:data,idUser:'0'})
        })

    }else{
        var idUser = jwt.verify(token,'tuan')
    var _id = req.body._id;
    PostModel.find({idUser:_id}).populate('idUser').populate('comment.idUserC').sort({_id: -1})
    .then(data=>{
        
        res.json({data:data,idUser:idUser})
    })
    }
    
}




module.exports ={
    docreateFishing,
    loginController,
    indexAdmin,
    indexFishing,
    indexMaster,
    forgotpassword,
    doupdate,
    getdata,
    dochangepass,
    profile,
    getprofile,
    getPostData

}