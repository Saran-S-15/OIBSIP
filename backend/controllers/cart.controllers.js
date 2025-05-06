import Cart from "../models/cart.model.js"
import Pizza from "../models/pizza.model.js";

export const addPizzaToCart = async (req, res) => {
    try {
        const { id } = req.body;
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [id] })
        } else {
            cart.items.push(id);
        }

        await cart.save();
        res.status(200).json({ success: true, message: "Pizza added to cart", cart });
    } catch (error) {
        console.log("Error in addPizzaToCart: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getItemsFromCart = async (req, res) => {
    try {
        const cart = await Cart.find({ user: req.user._id })
            .populate({
                path: "items",
                populate: [
                    { path: "pizzaBase" },
                    { path: "sauce" },
                    { path: "cheese" },
                    { path: "veggies" },
                    { path: "meat" },
                    { path: "user", select: "name email" } // Optional: limit user fields
                ]
            })
            .populate({
                path: "user",
                select: "name email" // Optional
            });

        if (!cart) {
            return res.status(200).json({
                success: true,
                message: "No items in cart",
                cart: []
            });
        }

        res.status(200).json({
            success: true,
            message: "Items in cart",
            cart
        });
    } catch (error) {
        console.error("Error in getItemsFromCart:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const userCart = await Cart.findOne({ user: userId });
        if (!userCart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        userCart.items = userCart.items.filter(item => item._id.toString() !== id);
        await userCart.save();

        res.status(200).json({ success: true, message: "Item removed from cart", cart: userCart });
    } catch (error) {
        console.error("Delete from cart error:", error);
        res.status(500).json({ message: "Something went wrong while removing the item." });
    }
};

export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json({ success: true, message: "Cart cleared successfully" });

    } catch (error) {
        console.error("Error in clearCart:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
