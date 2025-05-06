import express from "express";
import { login } from "../controllers/admin.controllers.js";
import adminProtectedRoute from "../middleware/adminProtectedRoute.js"
import { createPizzaBase, deletePizzaBase, getPizzaBase, updatePizzaBase } from "../controllers/pizzaBase.controller.js";
import { createSauce, deleteSauce, getSauce, updateSauce } from "../controllers/sauce.controllers.js";
import { createCheese, deleteCheese, getCheese, updateCheese } from "../controllers/cheese.controllers.js";
import { createVeggies, deleteVeggies, getVeggies, updateVeggies } from "../controllers/veggies.controllers.js";
import { createMeat, deleteMeat, getMeat, updateMeat } from "../controllers/meat.controllers.js";
import protectRoute from "../middleware/protectedRoute.js";

const router = express.Router();

router.post("/", login);


// Pizza Base Routes
router.post("/pizzaBase", adminProtectedRoute, createPizzaBase);
router.get("/pizzaBase", protectRoute, getPizzaBase);
router.delete("/pizzaBase/:id", adminProtectedRoute, deletePizzaBase);
router.put("/pizzaBase/:id", adminProtectedRoute, updatePizzaBase);

// Sauce Routes
router.post("/sauce", adminProtectedRoute, createSauce);
router.get("/sauce", protectRoute, getSauce);
router.delete("/sauce/:id", adminProtectedRoute, deleteSauce);
router.put("/sauce/:id", adminProtectedRoute, updateSauce);

// Cheese Routes
router.post("/cheese", adminProtectedRoute, createCheese);
router.get("/cheese", protectRoute, getCheese);
router.delete("/cheese/:id", adminProtectedRoute, deleteCheese);
router.put("/cheese/:id", adminProtectedRoute, updateCheese);

// Veggies Routes
router.post("/veggies", adminProtectedRoute, createVeggies);
router.get("/veggies", protectRoute, getVeggies);
router.delete("/veggies/:id", adminProtectedRoute, deleteVeggies);
router.put("/veggies/:id", adminProtectedRoute, updateVeggies);

// Meat Routes
router.post("/meat", adminProtectedRoute, createMeat);
router.get("/meat", protectRoute, getMeat);
router.delete("/meat/:id", adminProtectedRoute, deleteMeat);
router.put("/meat/:id", adminProtectedRoute, updateMeat);

export default router;