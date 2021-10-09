const AccountModel = require('../models/Account.model')
const ChatModel = require('../models/Chat.model')
const PostModel = require('../models/Post.model')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const multer = require('multer');
const saltRounds = 10;

let getAccount = (req,res)=>{
    var role = req.body.role;
    
    AccountModel.find({role:role})
    .then(data=>{
        res.json({mss:"thanh cong",data:data})
    })
}
let deleteAccount = (req,res)=>{

    AccountModel.deleteOne({_id:req.body._id},(err, accountData)=>{
        if(err){
            console.log(err)
        }else{
            console.log('xoa thanh cong')
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
    deletePost

}

