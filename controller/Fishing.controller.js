const AccountModel = require('../models/Account.model')
const TicketVipModel = require('../models/TicketVip.model')
const TicketModel = require('../models/Ticket.model')
const ChatModel = require('../models/Chat.model')
const MasterManageModel = require('../models/masterManage.model')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const multer = require('multer');
const saltRounds = 10;

let getpage = (req,res)=>{


        res.render("../views/fishing/allmaster.hbs")
        

}
let getdata = (req,res)=>{
    var text = req.body.text;

    if(text === undefined || text === ""){
        AccountModel.find({role:"master"},(err,data)=>{
            let token = req.cookies.token
            if(token === undefined){
                res.json({data:data,account:'0'})

            }else{
                var id = jwt.verify(token,'tuan')
            AccountModel.findOne({_id:id},(err,account)=>{
                res.json({data:data,account:account})
            })
            }
            
            

        })
    }else{
        AccountModel.find({role:"master",address: {$regex: text,$options : "i"}},(err,data)=>{
            let token = req.cookies.token
            var id = jwt.verify(token,'tuan')
            AccountModel.findOne({_id:id},(err,account)=>{
                res.json({data:data,account:account})
            })

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
        
    MasterManageModel.findOne({nameMaster:id}).populate('nameMaster')
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
        MasterManageModel.findOne({nameMaster:id}).populate('nameMaster')
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
                console.log(data1)
                console.log('có')
                res.json({message:'successfull'})
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