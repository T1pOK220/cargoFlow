import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import cargoRoutes from "./routes/cargosRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import multer from "multer";
import path from "path";
dotenv.config();
const app = express();
app.use(express.json());
const corsOptions = {
  origin: (origin, callback) => {
    if (
      !origin ||
      /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin) ||
      origin === 'https://cargo-flow-three.vercel.app'
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads"));

app.use(userRoutes);
app.use(cargoRoutes);
app.use(vehicleRoutes);
app.use(paymentRoutes);
app.use((req, res, next) => {
   console.log(`${new Date().toISOString()} ${req.method} ${req.url}`)
  next();
});
app.use((req, res) => {
  res.status(400).json({ error: "Маршрут не знайдено" });
});
app.use((err, req, res, next) => {
  console.error("Глобальна помилка:", err);
  res.status(500).json({ error: "Внутрішня помилка сервера" });
});
export default app;
