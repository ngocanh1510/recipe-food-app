const mongoose=require('mongoose')
const userModel= require('./Model/User')
const recipeModel=require('./Model/Recipe')

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.jlyvr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => {
  console.log("Kết nối thành công tới MongoDB Atlas!");
})
.catch((error) => {
  console.error("Kết nối thất bại tới MongoDB Atlas:", error);
});
