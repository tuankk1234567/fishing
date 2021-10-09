let AccountModel = require('../models/Account.model');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const saltRounds = 10;
let isEmail = async (req,res,next)=>{
    try {
        let email = req.body.email;
        await AccountModel.findOne({
            email:email
        }).then(email=>{
            if(!email){
                next();
            }else{
                var message= "Email already exists";
                res.json({message:message})
                
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "loi sever",
            error : true
        })

    }
}



let checkLogin = async (req,res,next)=>{
    try {
        let user = req.body.email;
        await AccountModel.findOne({
            email:user
        })
        .then(user=>{
            if(!user){
                var message= "Username or password is invalid"
                res.json({message:message}) 

            }else{
                req.user = user
            

                next();
            }
        }) 
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "loi sever",
            status: 500,
            error : true
        })
    }
}
let checkAdmin = (req,res,next)=>{
    let token = req.cookies.token
    var _id = jwt.verify(token,'tuan')
    AccountModel.findOne({_id : _id})
    .then(data=>{
        if (data.role === "admin"){
            next()
        }else{
            return res.status(400).json({
                message : "no permission",
                error : true,
            })
        }
    })
    
}
let checkMaster = (req,res,next)=>{
    let token = req.cookies.token
    var _id = jwt.verify(token,'tuan')  
    AccountModel.findOne({_id : _id})
    .then(data=>{
        if (data.role === "master"){
            next()
        }else{
            return res.status(400).json({
                message : "no permission",
                error : true,
            })
        }
    })
    
}

 let checkAuthentication = (req,res,next)=>{
    let token = req.cookies.token
    console.log(token)
    if(token === undefined){
        res.json({message:'You must login'})
    }else{
        var _id = jwt.verify(token,'tuan')
    AccountModel.findOne({_id : _id})
    .then(data=>{
        if(data){
            next();

        }else{
            console.log(data)
            res.json({message:'You must login'})
        }
    })

    }
    
 }








module.exports ={
    isEmail,
    checkLogin,
    checkAdmin,
    checkMaster,
    checkAuthentication
}