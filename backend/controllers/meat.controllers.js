import Meat from "../models/meat.model.js";

export const createMeat = async (req, res) => {
    try {
        const { name, price, stock } = req.body;

        if (!name || !price || !stock) {
            return res.status(400).json({ message: "All fields are Required" });
        }

        const existingMeat = await Meat.findOne({ name });
        if (existingMeat) {
            return res.status(400).json({ message: "Meat Name is already taken" });
        }

        const newMeat = new Meat({
            name,
            price,
            stock
        });

        if (newMeat) {
            await newMeat.save();
            res.status(201).json({
                success: true,
                message: "Meat created Successfully",
                meat: {
                    ...newMeat._doc
                }
            });
        }

        else {
            res.status(400).json({ message: "Something went Wrong creating Meat" });
        }
    } catch (error) {
        console.log("Error in createMeat Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMeat = async (req, res) => {
    try {
        const meat = await Meat.find({});
        res.status(200).json({
            success: true,
            message: "Meat retrieved Successfully",
            meat
        });
    } catch (error) {
        console.log("Error in getMeat Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteMeat = async (req, res) => {
    try {
        const { id } = req.params;

        const meat = await Meat.findByIdAndDelete({ _id: id });
        if (!meat) {
            return res.status(400).json("Meat is not available");
        }

        res.status(200).json({
            success: true,
            message: "Meat Deleted Successfully"
        });
    } catch (error) {
        console.log("Error in deleteMeat Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateMeat = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, stock } = req.body;
        const meat = await Meat.findByIdAndUpdate(id, { name, price, stock });
        if (!meat) {
            return res.status(400).json({ message: "Meat is not available" })
        }
        res.status(200).json({
            success: true,
            message: "Meat Updated Successfully",
            meat
        });
    } catch (error) {
        console.log("Error in updateMeat Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}