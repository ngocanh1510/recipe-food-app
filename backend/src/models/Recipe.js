import mongoose from 'mongoose';
import User from './User.js';
import Category from './Categories.js'

const RecipeSchema = new mongoose.Schema({
    userOwner: {type: mongoose.Types.ObjectId, ref: User},
    title:{type:String,required:true},
    description:{type:String,required:true},
    categogiesId:{type:mongoose.Types.ObjectId,ref:Category,required:true},
    ingredients:[{
        name: { type: String, required: true },
        quantity: { type: String, required: true },
      }],
    steps:{type:[String],required:true},
    image:{type:String,required:true}
    
},
{
    timestamps:true
})

const RecipeModel=mongoose.model("recipesses", RecipeSchema)
export default RecipeModel



