import Cheese from "../models/cheese.model.js";

export const createCheese = async (req, res) => {
    try {
        const { name, price, stock } = req.body;

        if (!name || !price || !stock) {
            return res.status(400).json({ message: "All fields are Required" });
        }

        const existingCheese = await Cheese.findOne({ name });
        if (existingCheese) {
            return res.status(400).json({ message: "Cheese Name is already taken" });
        }

        const newCheese = new Cheese({
            name,
            price,
            stock
        });

        if (newCheese) {
            await newCheese.save();
            res.status(201).json({
                success: true,
                message: "Cheese created Successfully",
                cheese: {
                    ...newCheese._doc
                }
            });
        }

        else {
            res.status(400).json({ message: "Something went Wrong creating Cheese" });
        }
    } catch (error) {
        console.log("Error in createCheese Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getCheese = async (req, res) => {
    try {
        const cheese = await Cheese.find({});
        res.status(200).json({
            success: true,
            message: "Cheese retrieved Successfully",
            cheese
        });
    } catch (error) {
        console.log("Error in getCheese Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteCheese = async (req, res) => {
    try {
        const { id } = req.params;

        const cheese = await Cheese.findByIdAndDelete({ _id: id });
        if (!cheese) {
            return res.status(400).json("Cheese is not available");
        }

        res.status(200).json({
            success: true,
            message: "Cheese Deleted Successfully"
        });
    } catch (error) {
        console.log("Error in deleteCheese Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateCheese = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, stock } = req.body;
        const cheese = await Cheese.findByIdAndUpdate(id, { name, price, stock });
        if (!cheese) {
            return res.status(400).json({ message: "Cheese is not available" })
        }
        res.status(200).json({
            success: true,
            message: "Cheese Updated Successfully",
            cheese
        });
    } catch (error) {
        console.log("Error in updateCheese Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}