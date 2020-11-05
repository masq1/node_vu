const express=require('express')
const mongoose=require('mongoose')
const User=require('../../model/user')
const multer = require('multer');
const path = require('path');
const bodyparser=require('body-parser')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const passport=require('passport')
const router=express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('public/uploads'));
    },
    filename: function (req, file, cb) {
        console.log(req.body)
        console.log(file)
        const originalname=file.originalname.split(".")[0]
      cb(null,originalname+ path.extname(file.originalname));
    }
  });
  
const upload = multer({storage: storage});
router.post('/register',upload.single('avatar'),(req,res)=>{
    // console.log(path.basename(req.file.path))
    // console.log(req.body)
    User.findOne({
        email:req.body.email
    }).then((user)=>{
        if(user){
            return res.json({
                message:"邮箱已注册"
            })

        }else{
            
            const newuser=new User({
                name:req.body.name,
                email:req.body.email,
                avatar:'uploads/' + path.basename(req.file.path),
                password:req.body.password,
                identity:req.body.identity,
            })
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newuser.password, salt, function(err, hash) {
                    if(err) throw err;
                    console.log(hash)
                    newuser.password=hash;
                    newuser.save()
                    .then((user)=>{
                        return res.json(user)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                    
                });
            });
        }
    })
})
router.post('/login',(req,res)=>{
    var name=req.body.name
    var email=req.body.email;
    User.findOne({
        email:email
    })
    .then((user)=>{
        if(!user){
            return res.status(404).json("用户不存在")
        }
        bcrypt.compare(req.body.password,user.password)
        .then((ismatch)=>{
            if(!ismatch){
                return res.status(400).json("密码错误")
            }else{
             const username=user.name
             const rule={
                 id:user.id,
                 name:username,
                 identity:user.identity
             }
             jwt.sign(rule,'secret',{expiresIn: 60 * 60},(err,token)=>{
                 if(err) throw err;
                 res.json({
                     success:true,
                     //必须是“Bearer "
                     token:"Bearer "+token
                 })
             })
            }
        })
    })
})
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(req.body===null){
        return res.status(400).json("请登录!")
    }else{
        return res.json({
            success:true,
            message:req.body
        })
    }
})
module.exports=router