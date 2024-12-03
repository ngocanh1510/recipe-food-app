import express from "express";
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv";
import AccountRouter from "./routes/accounts.js";
import RecipeRouter from "./routes/recipe-router.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cors({ origin: 'http://localhost:8081' }));  // Cho phép FE từ localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));  // Cho phép FE từ localhost:3000


mongoose.connect(
    `mongodb+srv://22520073:15102004@cluster0.jlyvr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
)
.then(() => {
    console.log("Kết nối thành công tới MongoDB Atlas!");
  })
  .catch((error) => {
    console.error("Kết nối thất bại tới MongoDB Atlas:", error);
  });
  
app.listen(3001, () => console.log("SERVER STARTED!"));

app.use("/auth", AccountRouter);
app.use("/recipe", RecipeRouter);