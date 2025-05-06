import express from "express";
import {
    checkAuth,
    forgot_Password,
    login,
    logout,
    reset_Password,
    signup,
    verify_Email
}
    from "../controllers/auth.controllers.js";
import protectRoute from "../middleware/protectedRoute.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/verify-email", verify_Email);

router.post("/login", login);

router.post("/logout", logout);

router.post("/forgot-password", forgot_Password);

router.post("/reset-password/:token", reset_Password);

router.get("/checkAuth", protectRoute, checkAuth);

export default router;