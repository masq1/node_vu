const express=require('express')
const mongoose=require('mongoose')
const user=require('./model/user')
const bodyparser=require('body-parser')
const path=require('path')
const bcrypt=require('bcryptjs')
const routeruser=require('./router/api/apiuser')
const routerprofile=require('./router/api/user')
const passport=require('passport')
const db=require('./config/mongodb').mongodburl
require('./config/passport')
mongoose.connect(db,{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    console.log("连接成功")
}).catch(()=>{
    console.log("连接失败")
})
const app=express()
app.engine('html', require('express-art-template'))
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(passport.initialize());
app.use(express.static('./public'));
app.use('/api/user',routeruser)
app.use('/api/profile',routerprofile)
app.get('/',(req,res)=>{
   res.render('index.html')
})
app.listen(3000,()=>{
    console.log('running')
})
