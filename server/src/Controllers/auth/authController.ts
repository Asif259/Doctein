import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { generateAccessToken, generateRefreshToken } from "../../Helpers/tokenHelper"; // Import correctly
const User = require("../../Models/userModel");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";
const SALT_ROUNDS = process.env.SALT_ROUNDS || "10";

// Register User
export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | void> => {
  const { email, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ data: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ data: "User already exists" });
    }

    const saltRounds = parseInt(SALT_ROUNDS, 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({ email, password: hashedPassword, role });
    await user.save();

    return res
      .status(201)
      .json({ data: "User registered successfully", user });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ data: "Error registering user", error });
  }
};

// Login User
export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ data: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ data: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    return res
      .status(200)
      .json({ data: "Login successful", accessToken, refreshToken, user });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ data: "Internal server error" });
  }
};
