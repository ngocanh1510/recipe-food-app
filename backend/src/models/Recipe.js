const mongoose =require('mongoose')
const userModel=require('./User')
const categoriesModel = require('./Categories')

const RecipeSchema = new mongoose.Schema({
    userOwner: {type: mongoose.Types.ObjectId, ref: userModel},
    title:{type:String,required:true},
    description:{type:String,required:true},
    categogiesId:{type:mongoose.Types.ObjectId,ref:categoriesModel,required:true},
    ingredient:{type:String,required:true},
    image:{type:String,required:true}
    
},
{
    timestamps:true
})

const RecipeModel=mongoose.model("recipesses", RecipeSchema)



