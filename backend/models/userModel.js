import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required:true},
    email: {type: String, required:true, unique: true},
    password: {type: String, required:true},
    avatar: {type: String},
    role: {type:String, default:'user'},
    resetPasswordToken: {type:String},
    resetPasswordExpiresAt: {type:Date},
    createdAt: {type: Date, default: Date.now}
}, {timestamps: true})

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;