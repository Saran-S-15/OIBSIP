import generateTokenAndSetCookie from "../config/generateTokenAndSetCookie.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { forgotPassword, resetPassword, verifyEmail, welcomeEmail } from "../nodemailer/nodemailer.js";


export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are Required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid Email" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const emailVerificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const emailVerificationTokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            emailVerificationToken,
            emailVerificationTokenExpiry
        });

        if (newUser) {
            const savedUser = await newUser.save();
            if (!savedUser) {
                return res.status(400).json({ message: "User not saved" });
            }
            generateTokenAndSetCookie(newUser._id, res);
            await verifyEmail(newUser.email, newUser.emailVerificationToken);
            res.status(201).json({
                success: true,
                message: "Signup Successful",
                user: {
                    ...newUser._doc,
                }
            })
        }

        else {
            res.status(400).json({ message: "User not created" });
        }

    } catch (error) {
        console.log(`Error in Signup Controller: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const verify_Email = async (req, res) => {
    try {
        const { code } = req.body;
        if (!code) {
            return res.status(400).json({ message: "Verification Code is Required" });
        }

        const user = await User.findOne({ emailVerificationToken: code, emailVerificationTokenExpiry: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ message: "Invalid Email Verification Code or Expired" });
        }

        user.isVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationTokenExpiry = undefined;

        await user.save();
        await welcomeEmail(user.email, user.name);
        res.status(200).json({
            success: true,
            message: "Verification Successfull",
            user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        console.log(`Error in verify_Email Controller: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are Required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid Email" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid Email or Password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: "Please verify your email before logging in." })
        }

        await generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            success: true,
            message: "Login Successfull",
            user: {
                ...user._doc,
                password: undefined,
                emailVerificationToken: undefined,
                emailVerificationTokenExpiry: undefined
            }
        });

    } catch (error) {
        console.log(`Error in login Controller: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });
        res.status(200).json({
            success: true,
            message: "Logout Successfull"
        });
    } catch (error) {
        console.log(`Error in logout Controller: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const forgot_Password = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is Required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid Email" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }

        const passwordResetToken = crypto.randomBytes(32).toString('hex');
        const passwordResetTokenExpiry = Date.now() + 60 * 60 * 1000;

        user.passwordResetToken = passwordResetToken;
        user.passwordResetTokenExpiry = passwordResetTokenExpiry;

        await user.save();

        await forgotPassword(user.email, `${process.env.FRONTEND_URL}/reset-password/${passwordResetToken}`);

        res.status(200).json({
            success: true,
            message: "Password Reset Email sent Successfully"
        });


    } catch (error) {
        console.log(`Error in forgotPassword Controller: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const reset_Password = async (req, res) => {
    try {
        const { token } = req.params;

        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Password is Required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const user = await User.findOne({ passwordResetToken: token, passwordResetTokenExpiry: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ message: "Invalid Reset Token or Expired" });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        user.passwordResetToken = undefined;
        user.passwordResetTokenExpiry = undefined;

        await user.save();
        await resetPassword(user.email);

        res.status(200).json({
            success: true,
            message: "Password Reset Successfull"
        })
    } catch (error) {
        console.log(`Error in reset_Password Controller: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json({
            success: true,
            message: "CheckAuth Successfull",
            user
        })
    } catch (error) {
        console.log(`Error in checkAuth Controller: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}