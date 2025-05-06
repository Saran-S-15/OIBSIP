import generateTokenAndSetCookie from "../config/generateTokenAndSetCookie.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

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

        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        // const newUser =  User.insertOne({
        //     name: "Admin",
        //     email,
        //     password: hashedPassword,
        //     role: "admin",
        //     isVerified: true,
        // });

        // if(!newUser){
        //     return res.status(400).json({message:"Error creating data"});
        // }

        // res.status(200).json(newUser);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (user.role === "user") {
            return res.status(400).json({ message: "Unauthorized, Only Admin can access" });
        }

        await generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            success: true,
            message: "Admin Login Successfull",
            user: {
                ...user._doc,
                password: undefined
            }
        })


    } catch (error) {
        console.log("Error in Admin login controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}