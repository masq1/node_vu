const mongoose=require('mongoose')
const Schema=mongoose.Schema
let profile=new Schema({
    type:{
        type:String
    },
    descripe:{
        type:String
    },
    incode:{
        type:String,
        required:true
    },
    expend:{
        type:String
    },
    cash:{
        type:String,
        required:true
    },
    remark:{
        type:String
    },
    date:{
        type:String,
        default:Date.now
    }
})
module.exports=profile=mongoose.model('profile',profile)