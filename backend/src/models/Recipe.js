import mongoose from 'mongoose';
import User from './User';
import Category from './Categories'
const RecipeSchema = new mongoose.Schema({
    userOwner: {type: mongoose.Types.ObjectId, ref: User},
    title:{type:String,required:true},
    description:{type:String,required:true},
    categogiesId:{type:mongoose.Types.ObjectId,ref:Category,required:true},
    ingredient:{type:String,required:true},
    image:{type:String,required:true}
    
},
{
    timestamps:true
})

const Recipe=mongoose.model("recipesses", RecipeSchema)
export default Recipe



