import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema({
    pizzaBase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PizzaBase",
    },
    sauce: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sauce",
    },
    cheese: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cheese",
    },
    veggies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Veggie",
        }
    ],
    meat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meat",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isCustom: {
        type: Boolean,
        default: false
    },
    totalPrice: {
        type: Number,
        required: [true, "Price is Required"],
        min: [0, "Price cannot be negative"]
    },
    quantity: {
        type: Number,
        default: 1
    }
}, { timestamps: true });

const Pizza = mongoose.model("Pizza", pizzaSchema);

export default Pizza;