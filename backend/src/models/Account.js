import mongoose from "mongoose"
import UserModel from "./User.js"

const AccountSchema = new mongoose.Schema({
    username: {type: mongoose.Types.ObjectId, required: true, ref: UserModel},
    password: {type: String, require: true},
});

export const AccountModel = mongoose.model("accounts", AccountSchema);