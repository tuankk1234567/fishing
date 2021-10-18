const AccountModel = require('../models/Account.model')
const TicketVipModel = require('../models/TicketVip.model')
const TicketModel = require('../models/Ticket.model')
const ChatModel = require('../models/Chat.model')
const CalendarModel = require('../models/calendar.model')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const multer = require('multer');
const nodemailer = require("nodemailer");
const saltRounds = 10;
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

let getpage = (req,res)=>{


        res.render("../views/fishing/allmaster.hbs")
        

}
let getdata = (req,res)=>{
    var text = req.body.text;
    var skip = Number(req.body.skip);
    var limit = Number(req.body.limit);
    if(text === undefined || text === ""){
        AccountModel.find({role:'master'})
        .then(data1=>{
            if( data1.length <= limit){
                numberPage = 1;
                
                
            }else if(data1.length/limit > Math.floor(data1.length/limit)){
                numberPage = Math.floor(data1.length/limit) + 1;
                
            }
            else{
                numberPage = Math.floor(data1.length/limit)
                
                
            }
            let token = req.cookies.token
            if(token === undefined){
                if(data1.length <= limit){
                    AccountModel.find({role:'master'}).skip(skip).limit(limit)
                    .then(data=>{
                        res.json({data:data,btn:'3',account:'0',numberPage:numberPage})
                        return;
                    })
                }else{
                    if(skip === 0){
                        AccountModel.find({role:'master'}).skip(skip).limit(limit)
                        .then(data=>{
                            res.json({data:data,btn:'0',account:'0',numberPage:numberPage})
                            return;
                        })
                    }
                    else if(data1.length - skip <= limit){
                        console.log('<')
                        AccountModel.find({role:'master'}).skip(skip).limit(limit)
                        .then(data=>{
                            res.json({data:data,btn:'2',account:'0',numberPage:numberPage})
                            return;
                        })
                    }else{
                        console.log('<>')
                        AccountModel.find({role:'master'}).skip(skip).limit(limit)
                        .then(data=>{
                            res.json({data:data,btn:'1',account:'0',numberPage:numberPage})
                            return;
                        })
                    }
                    
                }
            }else{
                var id = jwt.verify(token,'tuan')
                if( data1.length <= limit){
                    numberPage = 1;
                    
                    
                }else if(data1.length/limit > Math.floor(data1.length/limit)){
                    numberPage = Math.floor(data1.length/limit) + 1;
                    
                }
                else{
                    numberPage = Math.floor(data1.length/limit)
                    
                    
                }
            AccountModel.findOne({_id:id},(err,account)=>{
                if(data1.length <= limit){
                    AccountModel.find({role:'master'}).skip(skip).limit(limit)
                    .then(data=>{
                        res.json({data:data,btn:'3',account:account,numberPage:numberPage})
                        return;
                    })
                }else{
                    if(skip === 0){
                        AccountModel.find({role:'master'}).skip(skip).limit(limit)
                        .then(data=>{
                            res.json({data:data,btn:'0',account:account,numberPage:numberPage})
                            return;
                        })
                    }
                    else if(data1.length - skip <= limit){
                        console.log('<')
                        AccountModel.find({role:'master'}).skip(skip).limit(limit)
                        .then(data=>{
                            res.json({data:data,btn:'2',account:account,numberPage:numberPage})
                            return;
                        })
                    }else{
                        console.log('<>')
                        AccountModel.find({role:'master'}).skip(skip).limit(limit)
                        .then(data=>{
                            res.json({data:data,btn:'1',account:account,numberPage:numberPage})
                            return;
                        })
                    }
                    
                }


            })
                

            }
            
            
            
        })
        
    }else{
        AccountModel.find({role:'master',$or:[{address: {$regex: text,$options : "i"}},{name: {$regex: text,$options : "i"}}]})
        .then(data1=>{
            if( data1.length <= limit){
                numberPage = 1;
                
                
            }else if(data1.length/limit > Math.floor(data1.length/limit)){
                numberPage = Math.floor(data1.length/limit) + 1;
                
            }
            else{
                numberPage = Math.floor(data1.length/limit)
                
                
            }
            let token = req.cookies.token
            if(token === undefined){
                if(data1.length <= limit){
                    console.log('3')
                    AccountModel.find({role:'master',$or:[{address: {$regex: text,$options : "i"}},{name: {$regex: text,$options : "i"}}]}).skip(skip).limit(limit)
                    .then(data=>{
                        res.json({data:data,btn:'3',account:'0',numberPage:numberPage})
                        return;
                    })
                }else{
                    if(skip === 0){
                        AccountModel.find({role:'master',$or:[{address: {$regex: text,$options : "i"}},{name: {$regex: text,$options : "i"}}]}).skip(skip).limit(limit)
                        .then(data=>{
                            res.json({data:data,btn:'0',account:'0',numberPage:numberPage})
                            return;
                        })
                    }
                    else if(data1.length - skip <= limit){
                        console.log('<')
                        AccountModel.find({role:'master',$or:[{address: {$regex: text,$options : "i"}},{name: {$regex: text,$options : "i"}}]}).skip(skip).limit(limit)
                        .then(data=>{
                            res.json({data:data,btn:'2',account:'0',numberPage:numberPage})
                            return;
                        })
                    }else{
                        console.log('<>')
                        AccountModel.find({role:'master',$or:[{address: {$regex: text,$options : "i"}},{name: {$regex: text,$options : "i"}}]}).skip(skip).limit(limit)
                        .then(data=>{
                            res.json({data:data,btn:'1',account:'0',numberPage:numberPage})
                            return;
                        })
                    }
                    
                }
            }else{
                var id = jwt.verify(token,'tuan')
                if( data1.length <= limit){
                    numberPage = 1;
                    
                    
                }else if(data1.length/limit > Math.floor(data1.length/limit)){
                    numberPage = Math.floor(data1.length/limit) + 1;
                    
                }
                else{
                    numberPage = Math.floor(data1.length/limit)
                    
                    
                }
            AccountModel.findOne({_id:id},(err,account)=>{
                if(data1.length <= limit){
                    console.log('3')
                    AccountModel.find({role:'master',$or:[{address: {$regex: text,$options : "i"}},{name: {$regex: text,$options : "i"}}]}).skip(skip).limit(limit)
                    .then(data=>{
                        res.json({data:data,btn:'3',account:account,numberPage:numberPage})
                        return;
                    })
                }else{
                    if(skip === 0){
                        AccountModel.find({role:'master',$or:[{address: {$regex: text,$options : "i"}},{name: {$regex: text,$options : "i"}}]}).skip(skip).limit(limit)
                        .then(data=>{
                            res.json({data:data,btn:'0',account:account,numberPage:numberPage})
                            return;
                        })
                    }
                    else if(data1.length - skip <= limit){
                        console.log('<')
                        AccountModel.find({role:'master',$or:[{address: {$regex: text,$options : "i"}},{name: {$regex: text,$options : "i"}}]}).skip(skip).limit(limit)
                        .then(data=>{
                            res.json({data:data,btn:'2',account:account,numberPage:numberPage})
                            return;
                        })
                    }else{
                        console.log('<>')
                        AccountModel.find({role:'master',$or:[{address: {$regex: text,$options : "i"}},{name: {$regex: text,$options : "i"}}]}).skip(skip).limit(limit)
                        .then(data=>{
                            res.json({data:data,btn:'1',account:account,numberPage:numberPage})
                            return;
                        })
                    }
                    
                }


            })
                

            }
            
            
            
        })

        


    }

        


}
let getbooking1 = (req,res)=>{
     let _id = req.params._id
    // TicketVipModel.find({nameMaster:_id,type:"no accept"})
    // .then(data=>{

    res.render("../views/index/booking.hbs",{id:_id})
    // })
}
let getbooking2 = (req,res)=>{
    let _id = req.params._id
   // TicketVipModel.find({nameMaster:_id,type:"no accept"})
   // .then(data=>{

   res.render("../views/fishing/booking.hbs",{id:_id})
   // })
}
let getticketVip = (req,res)=>{
    let id = req.body.id;
    let date4 = req.body.date4;
    var timeFishing = req.body.timeFishing;
    console.log(id,timeFishing)
    let token = req.cookies.token

    if(token === undefined){
        
    CalendarModel.findOne({nameMaster:id}).populate('nameMaster')
    .then(data1=>{
        if(data1){
            TicketVipModel.find({nameMaster:id,date:date4,time:timeFishing})
    .then(data=>{
        console.log(data)
        res.json({data:data,data1:data1,idUser:'0'});
    })
        }

    })

    }else{
        var idUser = jwt.verify(token,'tuan')
        CalendarModel.findOne({nameMaster:id}).populate('nameMaster')
    .then(data1=>{
        if(data1){
            TicketVipModel.find({nameMaster:id,date:date4,time:timeFishing})
    .then(data=>{
        console.log(data)
        res.json({data:data,data1:data1,idUser:idUser});
    })
        }

    })

    }
    
        
 

}
let bookingticket =(req,res)=>{
    var _id = req.body._id
    let token = req.cookies.token
    var id = jwt.verify(token,'tuan')
    var name = req.body.name;
    var time = req.body.time;
    var date = req.body.date;
    var price = req.body.price;
    console.log(_id,id,name,date,time,price)
    TicketVipModel.findOne({name:name,price:price,date:date,time:time,nameMaster:_id})
    .then(data=>{
        console.log(data)
        
        if(data){
            console.log('co')
            res.json({message:'Tickets have been booked'})
            

        }else{
            
            TicketVipModel.create({name:name,price:price,date:date,time:time,nameFishing:id,nameMaster:_id,type:'unpaid'},(err,data1)=>{
                
                TicketVipModel.findOne({_id:data1._id}).populate('nameMaster').populate('nameFishing')
                .then(data2=>{
                    console.log(data2)
                    var content = 'you have successfully placed: ' + data2.name + ' ,time:' + data2.date + ': ' +data2.time + ' Address: '+data2.nameMaster.address+'.You can pay online:'+' Bank name:'+ data2.nameMaster.bank+' STK:'+ data2.nameMaster.stk +' Price: ' + data2.price +' VND';
                    var mainOptions = { 
                        from: 'fishing2479999@gmail.com',
                        to: data2.nameFishing.email,  
                        subject: 'Notification',
                        text: content 
                    }
                    transporter.sendMail(mainOptions, function(err, info){
                        if (err) {
                            console.log(err);
                        }
                        res.json({message:'successfull'}) 
                    });
                })
                
            })
        }
    })
   



}
let warehouse = (req,res)=>{                 
    res.render("../views/fishing/warehouse.hbs")  
}
let getwarehouse = (req,res)=>{
    let token = req.cookies.token
    var id = jwt.verify(token,'tuan')
    TicketVipModel.find({nameFishing:id}).populate('nameMaster')
    .then(data=>{
        if(data){
            res.json({data:data})
        }

    })

   





    
    
}
let addtomessage = (req,res)=>{
    var idMaster = req.body.idMaster;
    let token = req.cookies.token;
    var id = jwt.verify(token,'tuan');
    console.log(id)
    ChatModel.findOne({idMaster:idMaster}).then(dataChat=>{
        AccountModel.updateOne({_id:id},{$push: {chat:dataChat._id}}).then(data=>{
            console.log(data)
            res.json({mss:'thanh cong'})
    })

    })

    
}
let getticket = (req,res)=>{
    let id = req.body.id
    TicketModel.find({nameMaster:id})
    .then(data=>{
        res.json({data:data})
    })
 }



module.exports ={
    getpage,
    getdata,
    getbooking1,
    getbooking2,
    bookingticket,
    warehouse,
    getwarehouse,
    getticketVip,
    addtomessage,
    getticket
    

}