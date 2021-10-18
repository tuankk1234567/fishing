const AccountModel = require('../models/Account.model')
const ChatModel = require('../models/Chat.model')
const PostModel = require('../models/Post.model')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const multer = require('multer');
const { count } = require('../models/Account.model');
const saltRounds = 10;
let getnumberaccount = (req,res)=>{
    var role = req.body.role;
    AccountModel.find({role:role})
    .then(data=>{
        var count = data.length
        res.json({count:count,message:'Successful'});
    })
}
let getAccount = (req,res)=>{
    var role = req.body.role;
    var text = req.body.text;
    var skip = Number(req.body.skip);
    var limit = Number(req.body.limit);
    var numberPage;
    
    if(text === undefined || text === ""){
        AccountModel.find({role:role})
        .then(data1=>{
        AccountModel.find({role:role})
            if( data1.length <= limit){
                numberPage = 1;
                
                
            }else if(data1.length/limit > Math.floor(data1.length/limit)){
                numberPage = Math.floor(data1.length/limit) + 1;
                
            }
            else{
                numberPage = Math.floor(data1.length/limit)
                
                
            }
            if(data1.length <= limit){
                AccountModel.find({role:role}).skip(skip).limit(limit)
                .then(data=>{
                    res.json({data:data,btn:'3'})
                    return;
                })
            }else{
                if(skip === 0){
                    console.log('>')
                    AccountModel.find({role:role}).skip(skip).limit(limit)
                    .then(data=>{
                        res.json({data:data,btn:'0',numberPage:numberPage})
                    })
                }
                else if(data1.length - skip <= limit){
                    console.log('<')
                    AccountModel.find({role:role}).skip(skip).limit(limit)
                    .then(data=>{
                        res.json({data:data,btn:'2',numberPage:numberPage})
                    })
                }else{
                    console.log('<>')
                    AccountModel.find({role:role}).skip(skip).limit(limit)
                    .then(data=>{
                        res.json({data:data,btn:'1',numberPage:numberPage})
                        return;
                    })
                }
                
            }
            
            
        })
        
    }else{
        AccountModel.find({role:role,$or:[{email: {$regex: text,$options : "i"}},{name: {$regex: text,$options : "i"}}]})
        .then(data1=>{
            if( data1.length <= limit){
                numberPage = 1;
                
                
            }else if(data1.length/limit > Math.floor(data1.length/limit)){
                numberPage = Math.floor(data1.length/limit) + 1;
                
            }
            else{
                numberPage = Math.floor(data1.length/limit)
                
                
            }
            if(data1.length <= limit){
                AccountModel.find({role:role,$or:[{email: {$regex: text,$options : "i"}},{name: {$regex: text,$options : "i"}}]}).skip(skip).limit(limit)
        .then(data=>{
            res.json({data:data,btn:'3',numberPage:numberPage})
            return;
        })
            }else{
                if(skip === 0){
                    AccountModel.find({role:role,$or:[{email: {$regex: text,$options : "i"}},{name: {$regex: text,$options : "i"}}]}).skip(skip).limit(limit)
        .then(data=>{
            res.json({data:data,btn:'0',numberPage:numberPage})
            return;
        })
                }
                else if(data1.length - skip <= limit){
                    AccountModel.find({role:role,$or:[{email: {$regex: text,$options : "i"}},{name: {$regex: text,$options : "i"}}]}).skip(skip).limit(limit)
        .then(data=>{
            res.json({data:data,btn:'2',numberPage:numberPage})
            return;
        })
                }else{
                    AccountModel.find({role:role,$or:[{email: {$regex: text,$options : "i"}},{name: {$regex: text,$options : "i"}}]}).skip(skip).limit(limit)
        .then(data=>{
            res.json({data:data,btn:'1',numberPage:numberPage})
            return;
        })
                }
                
            }

        })
        


    }
}
let deleteAccount = (req,res)=>{

    AccountModel.deleteOne({_id:req.body._id},(err, accountData)=>{
        if(err){
            console.log(err)
        }else{
            res.json({msg:'success',data:accountData})
            
        }
    })
    
}
let addMaster = (req,res)=>{
    var password = req.body.password;
    var email = req.body.email;
    var role = req.body.role;
    var phone = req.body.phone;
    var address = req.body.address;
    var name = req.body.name;
    var bank = req.body.bank;
    var stk = req.body.stk;

    AccountModel.findOne({email:email
    }).then(email=>{
        if(!email){
            var email = req.body.email;
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
                },(err,accountData)=>{
                    if(err){
                        console.log(err)
                    }else{
                        ChatModel.create({idMaster:accountData._id},(err,dataChat)=>{
                            AccountModel.updateOne({_id:accountData._id},{$push: {chat:dataChat._id}}).then(data=>{
                                res.json({mss:'thanh cong'})
                            })

                        })
                        

                        
                    
                    }
            });
        
        }

        }else{
            return res.json({
                message : "Email already exists",
            })
        }
    })
    
}
let deletePost = (req,res)=>{

    PostModel.deleteOne({_id:req.body.idPost},(err, accountData)=>{
        if(err){
            console.log(err)
        }else{
            console.log('xoa thanh cong')
            res.json({msg:'success'})
            
        }
    })
    
}

module.exports ={
    getAccount,
    deleteAccount,
    addMaster,
    deletePost,
    getnumberaccount

}

