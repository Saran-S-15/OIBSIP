import Sauce from "../models/sauce.model.js";

export const createSauce = async (req, res) => {
    try {
        const { name, price, stock } = req.body;

        if (!name || !price || !stock) {
            return res.status(400).json({ message: "All fields are Required" });
        }

        const existingSauce = await Sauce.findOne({ name });
        if (existingSauce) {
            return res.status(400).json({ message: "Sauce Name is already taken" });
        }

        const newSauce = new Sauce({
            name,
            price,
            stock
        });

        if (newSauce) {
            await newSauce.save();
            res.status(201).json({
                success: true,
                message: "Sauce created Successfully",
                sauce: {
                    ...newSauce._doc
                }
            });
        }

        else {
            res.status(400).json({ message: "Something went Wrong creating Sauce" });
        }
    } catch (error) {
        console.log("Error in createSauce Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getSauce = async (req, res) => {
    try {
        const sauce = await Sauce.find({});
        res.status(200).json({
            success: true,
            message: "Sauce retrieved Successfully",
            sauce
        });
    } catch (error) {
        console.log("Error in getSauce Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteSauce = async (req, res) => {
    try {
        const { id } = req.params;

        const sauce = await Sauce.findByIdAndDelete({ _id: id });
        if (!sauce) {
            return res.status(400).json("Sauce is not available");
        }

        res.status(200).json({
            success: true,
            message: "Sauce Deleted Successfully"
        });
    } catch (error) {
        console.log("Error in deleteSauce Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateSauce = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, stock } = req.body;
        const sauce = await Sauce.findByIdAndUpdate(id, { name, price, stock });
        if (!sauce) {
            return res.status(400).json({ message: "Sauce is not available" })
        }
        res.status(200).json({
            success: true,
            message: "Sauce Updated Successfully",
            sauce
        });
    } catch (error) {
        console.log("Error in updateSauce Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}