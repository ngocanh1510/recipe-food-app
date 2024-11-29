const mongoose =require('mongoose')
const userModel=require('./User')
const categoriesModel = require('./Categories')

const recipeSchema=new mongoose.Schema({
    user:{type:mongoose.Types.ObjectId,ref:userModel},
    title:{type:String,required:true},
    description:{type:String,required:true},
    categogiesId:{type:mongoose.Types.ObjectId,ref:categoriesModel,required:true},
    ingredient:{type:String,required:true},
    image:{type:String,required:true}
    
},
{
    timestamps:true
})

const recipeModel=mongoose.model("recipess",recipeSchema)
module.exports=recipeModel


const example = new recipeModel(
    { 
        name:'Tiến Đạt',
        email:'bebot@gmail.com',
        avatar:'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-avatar-cute-15.jpg',
        gender:'Nam'
        }
);
example.save()
  .then(() => console.log("Lưu thành công!"))
  .catch((error) => console.error("Lỗi khi lưu tài liệu:", error));