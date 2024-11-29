const mongoose=require('mongoose')
const userModel = require('./Recipe')

const accountSchema=new mongoose.Schema({
    email:{type:mongoose.Types.ObjectId,required:true,ref:userModel},
    password:{type:String,required:true}
})

const accountModel=mongoose.model("account",accountSchema)
module.exports=accountModel