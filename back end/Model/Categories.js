const mongoose =require('mongoose')

const categoriesSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    avatar:{type:String,required:false},
    gender:{type:String,required:true}
})

const categoriesModel=mongoose.model("users",categoriesSchema)
module.exports=categoriesModel