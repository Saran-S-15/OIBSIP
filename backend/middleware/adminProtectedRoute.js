import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const adminProtectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(400).json({ message: "Unauthorized, Token not Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(400).json({ message: "Unauthorized, Invalid Token" });
        }

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: "User is not Verified" });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access Denied. Admins Only" });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("Error in adminProtectedRoute Middleware", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export default adminProtectedRoute;