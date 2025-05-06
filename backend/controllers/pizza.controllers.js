import Pizza from "../models/pizza.model.js"
import PizzaBase from "../models/pizzaBase.model.js";
import Sauce from "../models/sauce.model.js";
import Cheese from "../models/cheese.model.js";
import Veggie from "../models/veggies.model.js";
import Meat from "../models/meat.model.js";
import { lowStock } from "../nodemailer/nodemailer.js";

export const createPizza = async (req, res) => {
    try {
        const { pizzaBase, sauce, cheese, veggies, meat } = req.body;
        if (!pizzaBase || !sauce || !cheese || !veggies || veggies.length === 0) {
            return res.status(400).json({ message: "All fields are Required (meat optional)" });
        }

        const PIZZABASE = await PizzaBase.findById({ _id: pizzaBase });
        if (!PIZZABASE || PIZZABASE.stock <= 0) {
            return res.status(400).json({ message: "Stock is not available or not found" });
        }

        const SAUCE = await Sauce.findById({ _id: sauce });
        if (!SAUCE || SAUCE.stock <= 0) {
            return res.status(400).json({ message: "Stock is not available or not found" });
        }

        const CHEESE = await Cheese.findById({ _id: cheese });
        if (!CHEESE || CHEESE.stock <= 0) {
            return res.status(400).json({ message: "Stock is not available or not found" });
        }

        const VEGGIES = await Veggie.find({ _id: { $in: veggies } });
        if (VEGGIES.length !== veggies.length) {
            return res.status(400).json({ message: "Some veggies not found" });
        }

        const OutOfStockVeggies = VEGGIES.filter((v) => v.stock <= 0);
        if (OutOfStockVeggies.length > 0) {
            return res.status(400).json({ message: "One or more veggies are out of stock" });
        }

        let MEAT = null;
        if (meat) {
            MEAT = await Meat.findById({ _id: meat });
            if (!MEAT || MEAT.stock <= 0) {
                return res.status(400).json({ message: "Stock is not available or not found" });
            }
        }

        const lowStockItems = [];

        if (PIZZABASE.stock < 20) lowStockItems.push("Pizza Base");
        if (SAUCE.stock < 20) lowStockItems.push("Sauce");
        if (CHEESE.stock < 20) lowStockItems.push("Cheese");
        if (VEGGIES.some(v => v.stock < 20)) lowStockItems.push("Veggies");
        if (meat && MEAT.stock < 20) lowStockItems.push("Meat");

        if (lowStockItems.length > 0) {
            await lowStock(lowStockItems);
        }

        const pizzaPrice = PIZZABASE.price;
        const saucePrice = SAUCE.price;
        const cheesePrice = CHEESE.price;
        let veggiePrice = 0;
        for (const veg of VEGGIES) {
            veggiePrice += veg.price;
        }
        let meatPrice = null;
        if (meat) {
            meatPrice = MEAT.price;
        }

        const newPizza = new Pizza({
            pizzaBase: PIZZABASE._id,
            sauce: SAUCE._id,
            cheese: CHEESE._id,
            veggies: VEGGIES.map(v => v._id),
            meat: meat ? MEAT._id : null,
            user: req.user._id,
            isCustom: req.user.role === "user" ? true : false,
            totalPrice: pizzaPrice + saucePrice + cheesePrice + meatPrice + veggiePrice
        });

        await PizzaBase.findByIdAndUpdate(pizzaBase, { $inc: { stock: -1 } });
        await Sauce.findByIdAndUpdate(sauce, { $inc: { stock: -1 } });
        await Cheese.findByIdAndUpdate(cheese, { $inc: { stock: -1 } });

        for (const veg of VEGGIES) {
            await Veggie.findByIdAndUpdate(veg._id, { $inc: { stock: -1 } });
        }

        if (meat) {
            await Meat.findByIdAndUpdate(meat, { $inc: { stock: -1 } });
        }

        if (newPizza) {
            await newPizza.save();
            res.status(201).json({
                success: true,
                message: "Pizza Created Successfully",
                pizza: {
                    ...newPizza._doc
                }
            });
        }

        else {
            res.status(400).json({ message: "Something went Wrong in creating Pizza" });
        }

    } catch (error) {
        console.log("Error in createPizza Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getPizzas = async (req, res) => {
    try {
        const pizzas = await Pizza.find({ isCustom: false }).populate("pizzaBase sauce cheese veggies meat user");
        res.status(200).json({
            success: true,
            message: "Pizzzas Retrieved Successfully",
            pizzas
        });

    } catch (error) {
        console.log("Error in getPizzas Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getUserCustomPizzas = async (req, res) => {
    try {
        const pizzas = await Pizza.find({ user: req.user._id, isCustom: true }).populate("pizzaBase sauce cheese veggies meat user");
        res.status(200).json({
            success: true,
            message: "User Custom Pizzas Retrieved Successfully",
            pizzas
        });
    } catch (error) {
        console.log("Error in getUserCustomPizzas Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getPizzasById = async (req, res) => {
    try {
        const { id } = req.params;
        const pizza = await Pizza.findById({ _id: id, user: req.user._id }).populate("pizzaBase sauce cheese veggies meat");
        if (!pizza) {
            return res.status(400).json({ message: "Pizza not found" });
        }
        res.status(200).json({
            success: true,
            message: "Pizza Retrieved Successfully",
            pizza
        });
    } catch (error) {
        console.log("Error in getPizzaById Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteCustomPizza = async (req, res) => {
    try {
        const { id } = req.params;
        const pizza = await Pizza.findById({ _id: id }).populate("pizzaBase sauce cheese veggies meat");
        if (!pizza) {
            return res.status(404).json({ message: "Pizza not Found" })
        }

        await PizzaBase.findByIdAndUpdate(pizza.pizzaBase, { $inc: { stock: 1 } });
        await Sauce.findByIdAndUpdate(pizza.sauce, { $inc: { stock: 1 } });
        await Cheese.findByIdAndUpdate(pizza.cheese, { $inc: { stock: 1 } });
        for (const veg of pizza.veggies) {
            await Veggie.findByIdAndUpdate(veg, { $inc: { stock: 1 } });
        }
        if (pizza.meat) {
            await Meat.findByIdAndUpdate(pizza.meat, { $inc: { stock: 1 } });
        }

        await Pizza.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Custom Pizza Deleted Successfully"
        })
    } catch (error) {
        console.log("Error in deleteCustomPizza Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const adminCreatedPizza = async (req, res) => {
    try {
        const { id } = req.params;
        const pizza = await Pizza.findById({ _id: id }).populate("pizzaBase sauce cheese veggies meat");
        if (!pizza) {
            return res.status(404).json({ message: "Pizza not Found" })
        }
        await PizzaBase.findByIdAndUpdate(pizza.pizzaBase, { $inc: { stock: 1 } });
        await Sauce.findByIdAndUpdate(pizza.sauce, { $inc: { stock: 1 } });
        await Cheese.findByIdAndUpdate(pizza.cheese, { $inc: { stock: 1 } });
        for (const veg of pizza.veggies) {
            await Veggie.findByIdAndUpdate(veg, { $inc: { stock: 1 } });
        }
        if (pizza.meat) {
            await Meat.findByIdAndUpdate(pizza.meat, { $inc: { stock: 1 } });
        }
        await Pizza.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Pizza Deleted Successfully"
        })
    } catch (error) {
        console.log("Error in adminCreatedPizza Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateCustomPizzaStock = async (req, res) => {
    try {
        const { id } = req.params;
        const pizza = await Pizza.findById({ _id: id }).populate("pizzaBase sauce cheese veggies meat");
        if (!pizza) {
            return res.status(404).json({ message: "Pizza not Found" })
        }
        await PizzaBase.findByIdAndUpdate(pizza.pizzaBase, { $inc: { stock: -1 } });
        await Sauce.findByIdAndUpdate(pizza.sauce, { $inc: { stock: -1 } });
        await Cheese.findByIdAndUpdate(pizza.cheese, { $inc: { stock: -1 } });
        for (const veg of pizza.veggies) {
            await Veggie.findByIdAndUpdate(veg, { $inc: { stock: -1 } });
        }
        if (pizza.meat) {
            await Meat.findByIdAndUpdate(pizza.meat, { $inc: { stock: -1 } });
        }
        res.status(200).json({
            success: true,
            message: "Pizza Stock Updated Successfully"
        })

    } catch (error) {
        console.log("Error in updateCustomPizzaStock Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}