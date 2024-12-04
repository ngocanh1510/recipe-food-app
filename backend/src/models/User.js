import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email:{ type: String, required: true, unique: true},
    avatar:{ type: String, required: false},
    gender:{ type: String, required: true},
    savedRecipes: [{ type: mongoose.Types.ObjectId, ref: "recipesses" }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
})

const UserModel = mongoose.model("users", UserSchema)

export default UserModel;
