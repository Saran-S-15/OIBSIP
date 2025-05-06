import express from "express";
import { addPizzaToCart, clearCart, deleteFromCart, getItemsFromCart } from "../controllers/cart.controllers.js";
import protectRoute from "../middleware/protectedRoute.js";

const router = express.Router();

router.post("/addToCart",protectRoute, addPizzaToCart);

router.get("/getItems", protectRoute, getItemsFromCart);

router.delete("/deletePizza/:id", protectRoute, deleteFromCart);

router.delete("/clearCart", protectRoute, clearCart);

export default router;