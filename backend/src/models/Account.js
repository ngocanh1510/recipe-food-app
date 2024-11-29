import mongoose from "mongoose"
import User from "./User.js"

const AccountSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId, required: true, ref: User},
    password: {type: String, require: true},
});

const Account = mongoose.model("accounts", AccountSchema);

export default Account;