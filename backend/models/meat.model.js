import mongoose from "mongoose";

const meatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Meat Name is Required"],
        unique: true,
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Price is Required"],
        min: [0, "Price cannot be negative"]
    },
    stock: {
        type: Number,
        required: [true, "Stock is Required"],
        min: [0, "Stock cannot be negative"]
    },
}, { timestamps: true });

const Meat = mongoose.model("Meat", meatSchema);

export default Meat;