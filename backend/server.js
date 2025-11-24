import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";

import { connectDB } from "./lib/db.js";
import { testRedisConnection } from "./lib/redis.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
  testRedisConnection();
});
