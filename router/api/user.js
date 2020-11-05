const express=require('express')
const mongoose=require('mongoose')
const profile=require('../../model/profile')
const multer = require('multer');
const path = require('path');
const bodyparser=require('body-parser')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const passport=require('passport')
const router=express.Router()
router.get('/add',passport.authenticate('jwt',{session:false},(req,res)=>{
    let pro={}
    console.log(req.body)
    console.log("我是edit")
    if(req.body.type)profileupdate.type=req.body.type
    if(req.body.desc)profileupdate.desc=req.body.desc
    if(req.body.incode)profileupdate.incode=req.body.incode
    if(req.body.expend)profileupdate.expend=req.body.expend
    if(req.body.cash)profileupdate.cash=req.body.cash
    if(req.body.remark)profileupdate.remark=req.body.remark
    new profile(pro).save().then((profile)=>{
        res.json(profile)
    })
}))
router.get('/',passport.authenticate("jwt",{session:false}),(req,res)=>{
    profile.find()
    .then(profile=>{
        if(!profile){
            return res.status(404).json("没有内容")
        }
        return res.json(profile)
    })
    .catch(err=>{
        return res.status(404).json(err)
    })

})
router.get('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    profile.findOne({_id:req.params.id})
    .then(profile=>{
        if(!profile){
            return res.status(404).json("没用内容")
        }
        return res.json(profile)
    })
    .catch(err=>{
        return res.status(404).json("服务器开小差")
    })
})
router.post('/edit/:id',passport.authenticate("jwt",{session:false}),(req,res)=>{
    let profileupdate={}
    console.log(req.body)
    console.log("我是edit")
    if(req.body.type)profileupdate.type=req.body.type
    if(req.body.desc)profileupdate.desc=req.body.desc
    if(req.body.incode)profileupdate.incode=req.body.incode
    if(req.body.expend)profileupdate.expend=req.body.expend
    if(req.body.cash)profileupdate.cash=req.body.cash
    if(req.body.remark)profileupdate.remark=req.body.remark
    profile.findOneAndUpdate({_id:req.params.id},{$set:profileupdate},{new:true})
    .then(profile=>{
        return res.json(profile)
    })
})
//get 请求 /delete:id
// 权限 有
// 数据表 profile
// 作用：删除数据
router.post('/delete/:id',passport.authenticate("jwt",{session:false}),(req,res)=>{
    profile.findOneAndRemove({_id:req.params.id})
    .then(profile=>{
        console.log(profile)
        // profile.save().then(profiles=>{
        //      res.json(profiles)
        // })
        res.json(profile)
    })
    .catch(err=>res.json("删除失败"))
})
module.exports=router