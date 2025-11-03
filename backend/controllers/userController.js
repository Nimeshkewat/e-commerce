import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';
import crypto from 'crypto'
import transporter from '../config/sendMail.js';
import {v2 as cloudinary} from 'cloudinary'

//* regiser
export const register = async (req, res) => {
    try {
        const {name, email, password, avatar} = req.body;

        //* validate
        if(!name || !email || !password){
            return res.json({success:false, message:'All fields are required'});
        }

        if(!validator.isEmail(email)){
            return res.json({success:false, message:'Invalid email'});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.json({success:false, message:'Email already taken'});
        }

         //*  Handle missing avatar (use default)
        let imageUrl = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // fallback

        //* user image
        if(avatar){
            const upload = await cloudinary.uploader.upload(avatar, {
                folder:'N-mart',
            })
            imageUrl = upload.secure_url;
        }

        //* hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        //* save user in db
        const user = await User.create({name, email, password:hashedPassword, avatar:imageUrl});
        await user.save();

        res.status(201).json({success:true, message:'User created successfully'})


    } catch (error) {
        return res.status(500).json({success:false, message:error.message});
    }        
}

//* login
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        //* validate
        if(!email || !password){
            return res.json({success:false, message:'All fields are required'});
        }

        if(!validator.isEmail(email)){
            return res.json({success:false, message:'Invalid email'});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.json({success:false, message:"user doesn't exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success:false, message:'Invalid email or password'});
        }

        const token = jwt.sign({
            id:user._id, name:user.name, email:user.email, role:user.role
        }, process.env.JWT_SECRET, {expiresIn:'7d'});

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3 * 24 * 60 * 60 * 1000
        });

        res.json({success:true, message:'Logged in successfully', token});
        

    } catch (error) {
        return res.status(500).json({success:false, message:error.message});
    }   
}

//* logout
export const logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'production',
         maxAge: 3 * 24 * 60 * 60 * 1000
    });
    
    res.json({success:true, message:'Logged out successfully'});
}


//* forgot password
export const forgotPassword = async (req, res) => {
    try {
        const {email} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpiresAt = Date.now() + 15 * 60 * 1000;
        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`

        // await sendEmail(user.email, "Password Reset", `Click here to reset: ${resetUrl}`);
        await transporter.sendMail({
            from: 'nimeshwork529@gmail.com',
            to: user.email,
            subject:  "Password Reset",
            text:`Click here to reset: ${resetUrl}`
        })

        res.status(200).json({ message: "Reset link sent to email" });
    } catch (error) {
        return res.status(500).json({success:false, message:error.message});
    }
}

//* reset password
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params; // from URL
        const { password } = req.body;

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        // Find user with valid token and expiry not passed
        const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpiresAt: { $gt: Date.now() }
        });

        if (!user)
        return res.status(400).json({ message: "Invalid or expired token" });

        // Update password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        // Clear reset fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
