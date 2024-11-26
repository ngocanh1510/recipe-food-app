const mongoose=require('mongoose')
const userModel= require('./Model/User')
const recipeModel=require('./Model/Recipe')

mongoose.connect('mongodb+srv://22520073:15102004@cluster0.jlyvr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
  console.log("Kết nối thành công tới MongoDB Atlas!");
})
.catch((error) => {
  console.error("Kết nối thất bại tới MongoDB Atlas:", error);
});
