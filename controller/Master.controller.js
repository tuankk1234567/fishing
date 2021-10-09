const AccountModel = require('../models/Account.model')
const PostModel = require('../models/Post.model')
var jwt = require('jsonwebtoken');
const TicketVipModel = require('../models/TicketVip.model')
const TicketModel = require('../models/Ticket.model')
const ChatModel = require('../models/Chat.model')
const MasterManageModel = require('../models/masterManage.model')
const nodemailer = require("nodemailer");
const multer = require('multer');
let imageUrl ;
var image = [];


  




var storage = multer.diskStorage({
  
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      

         imageUrl = Date.now()+'.jpg'
         image.push(imageUrl)
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
let getPostData = (req,res)=>{
    PostModel.find().populate('idUser').populate('comment.idUserC').sort({_id: -1})
    .then(data=>{
        
        res.json({data:data})
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
 let uploadpost = (req, res) => {
  
    upload(req,res,function(err) {
          if(err) {
              console.log(err)
          }
      var writePost = req.body.writePost
      var datenow = req.body.datenow;
      var timenow = req.body.timenow;
  
      let token = req.cookies.token
      var idUser = jwt.verify(token,'tuan')
      var k = {idUser:idUser,imageUrl:image, writePost:writePost, date:datenow,time:timenow};
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
    })
    
  
    
      
  
    }
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
        var object = {nameMaster:nameMaster,price:price,time:time,sentenceTime:time3}
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
        MasterManageModel.findOne({nameMaster:nameMaster})
        .then(data=>{
            if(data){
                res.json({message:'da co'})
            }else{
                MasterManageModel.create({nameMaster:nameMaster,
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
        MasterManageModel.findOne({nameMaster:nameMaster})
        .then(data=>{
            console.log(data)
            res.json({data:data})
        })
    }
    let adddayoff = (req,res)=>{
        let token = req.cookies.token
        var nameMaster = jwt.verify(token,'tuan')
        MasterManageModel.findOne({nameMaster:nameMaster})
        .then(data=>{
            if(data){
                if(data.dayOff.includes(req.body.dayoff)){
                    res.json({message:'already exist'})
                }else{
                    MasterManageModel.updateOne({nameMaster:nameMaster},{$push: {dayOff:req.body.dayoff}})
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
        TicketModel.updateOne({nameMaster:nameMaster},{price:req.body.price,time:req.body.timeTicket,sentenceTime: req.body.sentenceTime})
        .then(data=>{
            console.log(data)
            MasterManageModel.updateOne({nameMaster:nameMaster},{priceMorning:req.body.priceMorning,priceAfternoon:req.body.priceAfternoon,priceNight: req.body.priceNight,numberOfTent: req.body.numberOfTent})
        .then(data1=>{
            console.log(data1)
            res.json({message:'successful'})
        })
        })
        
        
    }
    let deletedayoff = (req,res)=>{
        var token = req.cookies.token;
        var nameMaster = jwt.verify(token,'tuan');
        MasterManageModel.updateOne({nameMaster:nameMaster},{$pull: {dayOff: req.body.dayoff}})
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