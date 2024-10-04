import express = require("express");
import cors = require("cors");
// import helmet = require("helmet");
import hpp = require("hpp");
import bodyParser = require("body-parser");
import mongoose = require("mongoose");
import dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
import router = require("./src/Routes/authRoutes"); // Ensure this path is correct

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
export = app;
