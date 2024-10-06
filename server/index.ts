import { Request, Response } from "express";
import express = require("express");
import cors = require("cors");
// import helmet = require("helmet");
import hpp = require("hpp");
import bodyParser = require("body-parser");
import mongoose = require("mongoose");
import dotenv = require("dotenv");
import cookieParser from "cookie-parser";
import router from "./src/Routes/authRoutes";
import authenticateToken from "./src/Middlewares/authenticate";

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use(helmet);
app.use(hpp({ checkBody: true, checkQuery: true }));

const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION || "";
mongoose
  .connect(MONGODB_CONNECTION)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use API router
app.use("/api/v1", router);

// Dummy route to test middleware
app.get("/", authenticateToken, (_req: Request, res: Response) => {
  res.send("Hello World!");
});
export = app;
