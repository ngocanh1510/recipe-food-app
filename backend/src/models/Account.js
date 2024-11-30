import mongoose from "mongoose"
import User from "./User.js"

const AccountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, 
        unique: true,
        trim: true
    },
    password: {type: String, require: true},
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "member", 
        required: true 
    },
});

const Account = mongoose.model("accounts", AccountSchema);

export default Account;