import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB.js"

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

import authRoutes from "./routes/auth.routes.js"
import adminRoutes from "./routes/admin.routes.js";
import pizzaRoutes from "./routes/pizza.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/pizza", pizzaRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

app.get("/", (req, res) => {
    res.send("Pizza Backend is running 🍕");
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is Running on PORT : ${PORT}`);
});

