import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderId: String,
  paymentId: String,
  pizzas: [
    {
      pizzaBase: { type: mongoose.Schema.Types.ObjectId, ref: 'PizzaBase' },
      sauce: { type: mongoose.Schema.Types.ObjectId, ref: 'Sauce' },
      cheese: { type: mongoose.Schema.Types.ObjectId, ref: 'Cheese' },
      veggies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Veggie' }],
      meat: { type: mongoose.Schema.Types.ObjectId, ref: 'Meat', default: null },
      totalPrice: Number,
      quantity: Number,
    }
  ],
  orderStatus: {
    type: String,
    enum: ["confirmed", "in Kitchen", "sent to delivery"],
    default: "confirmed"
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
