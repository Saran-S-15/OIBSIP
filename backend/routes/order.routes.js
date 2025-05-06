import express from "express";
import Razorpay from "razorpay"
import dotenv from "dotenv";
dotenv.config();

import protectedRoute from "../middleware/protectedRoute.js";
import adminProtectedRoute from "../middleware/adminProtectedRoute.js";

import Order from "../models/order.model.js";


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const router = express.Router();

router.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ error: 'Amount is required' });
  }

  try {
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      orderId: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
});

router.post('/verify-order', protectedRoute, async (req, res) => {
  const { orderId, paymentId, pizzas } = req.body;
  try {
    const newOrder = new Order({
      user: req.user._id,
      orderId,
      paymentId,
      pizzas,
      status: 'paid',
    });

    await newOrder.save();
    res.status(200).json({ message: "Order saved successfully" });
  } catch (err) {
    console.error("Order save failed", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/allOrders", adminProtectedRoute, async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('pizzas.pizzaBase')
      .populate('pizzas.sauce')
      .populate('pizzas.cheese')
      .populate('pizzas.veggies')
      .populate('pizzas.meat')
      .sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({ orders });
  } catch (err) {
    console.error("Error in allOrders Route", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/myOrders", protectedRoute, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('pizzas.pizzaBase')
      .populate('pizzas.sauce')
      .populate('pizzas.cheese')
      .populate('pizzas.veggies')
      .populate('pizzas.meat')
      .sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({ orders });
  } catch (err) {
    console.error("Error in myOrders Route", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/updateOrder/:id", protectedRoute, async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const order = await Order.findByIdAndUpdate(id, { orderStatus: status }, { new: true });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order updated successfully" });
  } catch (err) {
    console.error("Error in updateOrder Route", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
