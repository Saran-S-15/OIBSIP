import express from "express";
import { adminCreatedPizza, createPizza, deleteCustomPizza, getPizzas, getPizzasById, getUserCustomPizzas, updateCustomPizzaStock } from "../controllers/pizza.controllers.js";
import protectRoute from "../middleware/protectedRoute.js";
import adminProtectedRoute from "../middleware/adminProtectedRoute.js"

const router = express.Router();

router.post("/", protectRoute, createPizza);

router.get("/", protectRoute, getPizzas);

router.get("/userCustomPizzas", protectRoute, getUserCustomPizzas);

router.get("/cartItems/:id", protectRoute, getPizzasById);

router.delete("/:id", protectRoute, deleteCustomPizza);

router.delete("/adminCreatedPizza/:id", adminProtectedRoute, adminCreatedPizza)

router.put("/updateStock/:id", protectRoute, updateCustomPizzaStock);

export default router;