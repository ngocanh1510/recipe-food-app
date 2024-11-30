import mongoose from "mongoose"

const CategorySchema=new mongoose.Schema({
    name:{type:String,required:true},
})

const CategoryModel=mongoose.model("users", CategorySchema);
export default CategoryModel