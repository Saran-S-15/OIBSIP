import PizzaBase from "../models/pizzaBase.model.js";

export const createPizzaBase = async (req, res) => {
    try {
        const { name, price, stock } = req.body;

        if (!name || !price || !stock) {
            return res.status(400).json({ message: "All fields are Required" });
        }

        const existingPizzaBase = await PizzaBase.findOne({name});
        if(existingPizzaBase){
            return res.status(400).json({message:"Pizza Name is already taken"});
        }

        const newPizzaBase = new PizzaBase({
            name,
            price,
            stock
        });

        if (newPizzaBase) {
            await newPizzaBase.save();
            res.status(201).json({
                success: true,
                message: "Pizza Base created Successfully",
                pizzaBase: {
                    ...newPizzaBase._doc
                }
            });
        }

        else {
            res.status(400).json({ message: "Something went Wrong creating Pizza Base" });
        }
    } catch (error) {
        console.log("Error in createPizzaBase Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getPizzaBase = async (req, res) => {
    try {
        const pizzaBase = await PizzaBase.find();
        res.status(200).json({
            success: true,
            message: "Pizza Bases retrieved Successfully",
            pizzaBase
        });
    } catch (error) {
        console.log("Error in getPizzaBase Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deletePizzaBase = async (req, res) => {
    try {
        const { id } = req.params;

        const pizzaBase = await PizzaBase.findByIdAndDelete({ _id: id });
        if (!pizzaBase) {
            return res.status(400).json("Pizza Base is not available");
        }

        res.status(200).json({
            success: true,
            message: "Pizza Base Deleted Successfully"
        });
    } catch (error) {
        console.log("Error in deletePizzaBase Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updatePizzaBase = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, stock } = req.body;
        const pizzaBase = await PizzaBase.findByIdAndUpdate(id, { name, price, stock });
        if (!pizzaBase) {
            return res.status(400).json({ message: "Pizza Base is not available" })
        }
        res.status(200).json({
            success: true,
            message: "Pizza Base Updated Successfully",
            pizzaBase
        });
    } catch (error) {
        console.log("Error in updateizzaBase Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}