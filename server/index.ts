import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import authRouter from "./src/Routes/authRoutes";
import userRouter from "./src/Routes/userRoutes";
import prescriptionRouter from "./src/Routes/prescription";
import appointmentRoutes from "./src/Routes/appointmentRoutes";
import authenticate from "./src/Middlewares/authenticate";

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "content-type",
      "authorization",
      "access-control-allow-origin",
    ],
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION || "";
mongoose
  .connect(MONGODB_CONNECTION)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use API router
app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", authenticate, appointmentRoutes);
app.use("/api/v1", authenticate, prescriptionRouter);

// Dummy route to test middleware
app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
