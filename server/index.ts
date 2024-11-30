import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import rateLimit from "express-rate-limit";

import authRouter from "./src/Routes/authRoutes";
import userRouter from "./src/Routes/userRoutes";
import prescriptionRouter from "./src/Routes/prescription";
import appointmentRoutes from "./src/Routes/appointmentRoutes";
import authenticate from "./src/Middlewares/authenticate";

dotenv.config();

const app = express();

// Middleware
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
      status: 429,
      message: "Too many requests, please try again later.",
    },
  }),
);
app.use(bodyParser.json());
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "content-type",
      "authorization",
      "access-control-allow-origin",
    ],
    origin: [
      "http://localhost:3000",
      "http://frontend:3000",
      "http://20.6.131.175:3000",
    ],
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
