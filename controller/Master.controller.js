const AccountModel = require('../models/Account.model')
const PostModel = require('../models/Post.model')
var jwt = require('jsonwebtoken');
const fs = require("fs");
const TicketVipModel = require('../models/TicketVip.model')
const TicketModel = require('../models/Ticket.model')
const ChatModel = require('../models/Chat.model')
const CalendarModel = require('../models/calendar.model')
const nodemailer = require("nodemailer");
const multer = require('multer');
let imageUrl ;

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


  




var storage = multer.diskStorage({
  
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      

         imageUrl = Date.now()+'.jpg'
      cb(null, imageUrl);
    }
  })

  var upload = multer({ storage: storage }).array('imageUrl',3);
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

    let uploadpost = (req, res) => {
  
        upload(req,res,function(err) {
            var image = [];
              if(err) {
                  console.log(err)
              }
              if(req.files.length === 0){
                var datenow = req.body.datenow;
                var timenow = req.body.timenow;
                var writePost = req.body.writePost
            
                let token = req.cookies.token
                var idUser = jwt.verify(token,'tuan')
                var k = {idUser:idUser,writePost:writePost, date:datenow,time:timenow};
                console.log(k)
                PostModel.create(k,(err,PostData)=>{
                  if(err){
                      console.log(err)
                  }else{
                      return res.json({mss:"đăng thành công"})
                      
                  }
              })

              }else{
                var count = req.files.length;
                for(var i = 0; i < req.files.length; i++){
                  drive.files.create({
                      requestBody: {
                        name: imageUrl, //This can be name of your choice
                        mimeType: 'image/jpg',
                      },
                      media: {
                        mimeType: 'image/jpg',
                        body: fs.createReadStream(req.files[i].path),
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
                            image.push(linkImage);
                            if(image.length === count){
            var datenow = req.body.datenow;
            var timenow = req.body.timenow;
            var writePost = req.body.writePost
        
            let token = req.cookies.token
            var idUser = jwt.verify(token,'tuan')
            var k = {idUser:idUser,imageUrl:image, writePost:writePost, date:datenow,time:timenow};
            console.log(k)
            PostModel.create(k,(err,PostData)=>{
              if(err){
                  console.log(err)
              }else{
                while(image.length > 0) {
                  image.pop();
                }
                  return res.json({mss:"đăng thành công"})
                  
              }
          })
                            }
                            
                          
                        })
      
                    });
                }

              }
              
              
        
        })
        
      
        
          
      
        }
let getPostData = (req,res)=>{
    var skip = Number(req.body.skip);
    var limit = Number(req.body.limit);
    PostModel.find().then(data1=>{
        if(data1.length - skip > limit){
            PostModel.find().populate('idUser').populate('comment.idUserC').skip(skip).limit(limit).sort({_id: -1})
            .then(data=>{
                if(skip === 0){
                    res.json({data:data,btn:'0'})
                }else{
                    res.json({data:data,btn:'1'})
                }
                
            })
        }else{
            limit = data1.length - skip;
            PostModel.find().populate('idUser').populate('comment.idUserC').skip(skip).limit(limit).sort({_id: -1})
            .then(data=>{
                res.json({data:data,btn:'2'})
            })
        }

    })

    
}
//  let addtable = (req,res)=>{
//     let token = req.cookies.token
//     var nameMaster = jwt.verify(token,'tuan')
//     var name1 = req.body.name
//     var price = req.body.price
//     var date = req.body.date
//     var time = req.body.time

//     var h = [];
//      for(var i = 1; i <= name1; i++){
         
         
//          var name = "Lều "+ i;

//           var k ={name:name,
//             nameMaster:nameMaster,
//             date:date,
//             name:name,
//             price:price,
//             time: time,
//             type:"unpaid"};
//          h.push(k)
      

//      };
//     TicketVipModel.insertMany(h).then(data=>{
//           console.log(data)
//       })
//       res.json({mss:"tạo thành công"})
 
   

//  }
//  let addticketvip = (req,res)=>{
//     let token = req.cookies.token
//     var nameMaster = jwt.verify(token,'tuan')
//     var name = req.body.name
//     var price = req.body.price
//     var date = req.body.date
//     var time = req.body.time

//           var object ={name:name,
//             nameMaster:nameMaster,
//             date:date,
//             name:name,
//             price:price,
//             time: '8 am to 12 am',
//             type:"no accept"};
      


//     TicketVipModel.insertMany(object).then(data=>{
//           console.log(data)
//       })
//       res.json({mss:"tạo thành công"})
 
   

//  }
 let addcomment = (req,res)=>{
    var idPost = req.body.idPost;
    var datenow = req.body.datenow;
    var timenow = req.body.timenow;
    var commentPost = req.body.commentPost;
    let token = req.cookies.token
    var idUcomment = jwt.verify(token,'tuan')

    var comment = {idUserC:idUcomment,writeComment:commentPost,date:datenow,time:timenow}
    PostModel.updateOne({_id:idPost},{$push: {comment:comment}}).then(data=>{
    })
    res.json({mss:"thanh cong"})
}

 let getticketvip = (req,res)=>{
    var date4 = req.body.date4;
    var timeFishing = req.body.timeFishing;
    let token = req.cookies.token
    var nameMaster = jwt.verify(token,'tuan')
    console.log(timeFishing,date4)
    TicketVipModel.find({nameMaster:nameMaster,date:date4,time:timeFishing}).populate('nameFishing')
    .then(data=>{
        res.json({data:data})
    })
 }

 let deleteticketvip =(req,res)=>{
    TicketVipModel.deleteOne({_id:req.body._id},(err, ticketVipData)=>{
        if(err){
            console.log(err)
        }else{
            console.log('xoa thanh cong')
            res.json({msg:'success',data:ticketVipData})
            
        }
    })
 }
 let paymentconfirmation =(req,res)=>{
    TicketVipModel.updateOne({_id:req.body._id},{type:'payment confirmation'},(err, ticketVipData)=>{
        if(err){
            console.log(err)
        }else{
            res.json({msg:'success'})
            
        }
    })
 }
 let addtoblacklist =(req,res)=>{
    let token = req.cookies.token
    var nameMaster = jwt.verify(token,'tuan')
    AccountModel.updateOne({_id:nameMaster},{$push: {blocklist:req.body.idUser}},(err, data)=>{
        if(err){
            console.log(err)
        }else{
            console.log('có')
            TicketVipModel.deleteOne({_id:req.body.idTicket},(err, ticketVipData)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log('xoa thanh cong')
                    res.json({msg:'success'})
                    
                }
            })
            
        }
    })
 }
//  let getticketviprequest = (req,res)=>{
//     let token = req.cookies.token
//     var nameMaster = jwt.verify(token,'tuan')
//     TicketVipModel.find({nameMaster:nameMaster,type:"da gui"}).populate("nameFishing")
//     .then(data=>{
//         res.json({data:data})
//     })
//  }

//  let acceptticketvip = (req,res)=>{
//     let token = req.cookies.token
//     var nameMaster = jwt.verify(token,'tuan')
//     var _id = req.body._id
//     console.log(nameMaster,_id)
//     TicketVipModel.update({nameMaster:nameMaster,_id:_id},{type:"accept"})
//     .then(data=>{


//         TicketVipModel.find({_id:_id}).populate("nameFishing").populate("nameMaster").then(ticket=>{

//             var content = 'bạn đã đặt vé vip thành công tại địa điểm: ' + ticket[0].nameMaster.address +' ngày:'+ ticket[0].date+' giờ:'+ticket[0].time;
//                 var mainOptions = { 
//                     from: 'fishing2479999@gmail.com',
//                     to: ticket[0].nameFishing.email,  
//                     subject: 'Notification',
//                     text: content 
//                 }
//                 transporter.sendMail(mainOptions, function(err, info){
//                     if (err) {
//                         console.log(err);
//                     } 
//                 });

//          })
        
//         res.json({data:data})
//     })
//  }

//  let noticketvip = (req,res)=>{
//     let token = req.cookies.token
//     var nameMaster = jwt.verify(token,'tuan')
//     var _id = req.body._id
//     console.log(nameMaster,_id)
//     TicketVipModel.update({nameMaster:nameMaster,_id:_id},{type:"no accept"})
//     .then(data=>{

//         res.json({data:data})
//     })
//  }

//  let getticketvipacept = (req,res)=>{
//     let token = req.cookies.token
//     var nameMaster = jwt.verify(token,'tuan')
//     TicketVipModel.find({nameMaster:nameMaster,type:"accept"}).populate("nameFishing")
//     .then(data=>{
//         res.json({data:data})
//     })
//  }

//  let doneticketvip = (req,res)=>{
//     let token = req.cookies.token
//     var nameMaster = jwt.verify(token,'tuan')
//     var _id = req.body._id
//     console.log(nameMaster,_id)
//     TicketVipModel.update({nameMaster:nameMaster,_id:_id},{type:"done"})
//     .then(data=>{

//         res.json({data:data})
//     })
//  }

    let getcomment = (req,res)=>{
        var idPost = req.body.idPost;
        PostModel.findOne({_id:idPost}).populate('comment.idUserC').sort({_id: -1})
        .then(data=>{
            res.json({data:data})
        })
    }
    let like = (req,res)=>{
        var idPost = req.body.idPost;
        let token = req.cookies.token
        var id = jwt.verify(token,'tuan')
        PostModel.updateOne({_id:idPost},{$push: {like:id}}).then(data1=>{
            if(data1){
                PostModel.findOne({_id:idPost}).then(data=>{
                    res.json({data:data});
                })
            }
            
    
            
            
        })
        

    }
    let notlike = (req,res)=>{
        var idPost = req.body.idPost;
        let token = req.cookies.token
        var id = jwt.verify(token,'tuan')
        console.log(idPost,id)
        PostModel.updateOne({_id:idPost},{$pull: {like:id._id}}).then(data1=>{
            if(data1){
                PostModel.findOne({_id:idPost}).then(data=>{
                    res.json({data:data});
                })
            }
            
    
            
            
        })
        

    }
    let getlist =(req,res)=>{
        let token = req.cookies.token;
        var id = jwt.verify(token,'tuan')
        var t = [];
        AccountModel.findOne({_id:id}).populate({path: 'chat',populate:{path:'idMaster'}})
        .then(data=>{

            res.json({data:data})
            
            
        })
    }
    let getdatachat = (req,res)=>{
        var id = req.body.id;
        console.log(id)
        ChatModel.findOne({_id:id}).populate('write.idWriter').then(data=>{
            console.log(data)
            res.json({data:data})
        })
    }
    let addchat = (req,res)=>{
        let token = req.cookies.token;
        var idWriter = jwt.verify(token,'tuan')
        var id = req.body.id;
        var chat = req.body.chat;
        var date = req.body.datenow;
        var time = req.body.timenow;
        var write = {idWriter:idWriter,write:chat,date:date,time:time}
        console.log(write)
        ChatModel.updateOne({_id:id},{$push: {write:write}}).then(data=>{
            console.log(data)
        })
    }
    let addticket = (req,res)=>{
        let token = req.cookies.token
        var nameMaster = jwt.verify(token,'tuan')
        var price = req.body.price
        var time = req.body.time
        var time3 = req.body.time3
        var object = {nameMaster:nameMaster,price:price,time:time,durationTime:time3}
        TicketModel.find({nameMaster:nameMaster}).then(data=>{
            if(data.length === 1){
                res.json({message:'đã có vé thường'})
            }else{
                TicketModel.create(object).then(data=>{
                    console.log(data)
                })
                res.json({mss:"tạo thành công"})
            }
        })
     }
     let getticket = (req,res)=>{
       let token = req.cookies.token
       var nameMaster = jwt.verify(token,'tuan')
       TicketModel.find({nameMaster:nameMaster})
       .then(data=>{
           res.json({data:data})
       })
    }
    let addcalendar = (req,res)=>{
        let token = req.cookies.token
        var nameMaster = jwt.verify(token,'tuan')
        var priceMorning = req.body.price1
        var priceAfternoon = req.body.price2
        var priceNight = req.body.price3
        var numberOfTent = req.body.numberOfTent
        console.log(priceAfternoon)
        CalendarModel.findOne({nameMaster:nameMaster})
        .then(data=>{
            if(data){
                res.json({message:'da co'})
            }else{
                CalendarModel.create({nameMaster:nameMaster,
                    priceMorning:priceMorning,
                    priceAfternoon:priceAfternoon,
                    priceNight:priceNight,
                    numberOfTent:numberOfTent},(err,data)=>{
                        console.log(data)
                        res.json({message:'thanh cong'})
                    })
            }
        })
        



    }
    let getdatacalendar = (req,res)=>{
        let token = req.cookies.token
        var nameMaster = jwt.verify(token,'tuan')
        CalendarModel.findOne({nameMaster:nameMaster})
        .then(data=>{
            console.log(data)
            res.json({data:data})
        })
    }
    let adddayoff = (req,res)=>{
        let token = req.cookies.token
        var nameMaster = jwt.verify(token,'tuan')
        CalendarModel.findOne({nameMaster:nameMaster})
        .then(data=>{
            if(data){
                if(data.dayOff.includes(req.body.dayoff)){
                    res.json({message:'already exist'})
                }else{
                    CalendarModel.updateOne({nameMaster:nameMaster},{$push: {dayOff:req.body.dayoff}})
                .then(data1=>{
                    console.log(data1)
                    res.json({message:'successfull'})
                })

                }
                

            }else{
                res.json({message:'You must create can calendar'})
            }
            
        })
    }
    let updatemanageticket =(req,res)=>{
        let token = req.cookies.token;
        var nameMaster = jwt.verify(token,'tuan');
        TicketModel.updateOne({nameMaster:nameMaster},{price:req.body.price,time:req.body.timeTicket,durationTime: req.body.durationTime})
        .then(data=>{
            console.log(data)
            CalendarModel.updateOne({nameMaster:nameMaster},{priceMorning:req.body.priceMorning,priceAfternoon:req.body.priceAfternoon,priceNight: req.body.priceNight,numberOfTent: req.body.numberOfTent})
        .then(data1=>{
            console.log(data1)
            res.json({message:'successful'})
        })
        })
        
        
    }
    let deletedayoff = (req,res)=>{
        var token = req.cookies.token;
        var nameMaster = jwt.verify(token,'tuan');
        CalendarModel.updateOne({nameMaster:nameMaster},{$pull: {dayOff: req.body.dayoff}})
        .then(data=>{
            console.log(data)
            res.json({message:'successful'})
        })
    }



module.exports ={
    getPostData,
    getticketvip,
    deleteticketvip,
    uploadpost,
    addcomment,
    getcomment,
    like,
    getlist,
    getdatachat,
    addchat,
    addticket,
    getticket,
    addcalendar,
    getdatacalendar,
    paymentconfirmation,
    addtoblacklist,
    adddayoff,
    updatemanageticket,
    deletedayoff,
    notlike

}