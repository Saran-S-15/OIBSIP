import Veggie from "../models/veggies.model.js";

export const createVeggies = async (req, res) => {
    try {
        const { name, price, stock } = req.body;

        if (!name || !price || !stock) {
            return res.status(400).json({ message: "All fields are Required" });
        }

        const existingVeggie = await Veggie.findOne({ name });
        if (existingVeggie) {
            return res.status(400).json({ message: "Veggie Name is already taken" });
        }

        const newVeggie = new Veggie({
            name,
            price,
            stock
        });

        if (newVeggie) {
            await newVeggie.save();
            res.status(201).json({
                success: true,
                message: "Veggie created Successfully",
                veggie: {
                    ...newVeggie._doc
                }
            });
        }

        else {
            res.status(400).json({ message: "Something went Wrong creating Veggie" });
        }
    } catch (error) {
        console.log("Error in createVeggies Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getVeggies = async (req, res) => {
    try {
        const veggie = await Veggie.find({});
        res.status(200).json({
            success: true,
            message: "Veggie retrieved Successfully",
            veggie
        });
    } catch (error) {
        console.log("Error in getVeggies Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteVeggies = async (req, res) => {
    try {
        const { id } = req.params;

        const veggie = await Veggie.findByIdAndDelete({ _id: id });
        if (!veggie) {
            return res.status(400).json("Veggie is not available");
        }

        res.status(200).json({
            success: true,
            message: "Veggie Deleted Successfully"
        });
    } catch (error) {
        console.log("Error in deleteVeggies Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateVeggies = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, stock } = req.body;
        const veggie = await Veggie.findByIdAndUpdate(id, { name, price, stock });
        if (!veggie) {
            return res.status(400).json({ message: "Veggie is not available" })
        }
        res.status(200).json({
            success: true,
            message: "Veggie Updated Successfully",
            veggie
        });
    } catch (error) {
        console.log("Error in updateVeggie Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}