import mongoose from "mongoose"
import UserModel from "./User.js"

const AccountSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId, required: true, ref: UserModel},
    password: {type: String, require: true},
});

const AccountModel = mongoose.model("accounts", AccountSchema);

export default AccountModel;