import express from "express";
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv";
import AccountRouter from "./routes/accounts.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.jlyvr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
)



app.listen(3001, () => console.log("SERVER STARTED!"));

app.use("/auth", AccountRouter);