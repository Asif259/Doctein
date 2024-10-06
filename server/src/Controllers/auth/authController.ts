import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { setAuthCookies } from "../../Middlewares/authVerify"; // Import the middleware
import User from "../../Models/userModel";

dotenv.config();

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, letters and numbers
  return passwordRegex.test(password);
};

// Register User
export const registerUser = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { email, password, confirmPassword, role } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ data: "Invalid email format" });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({
      data: "Password must be at least 8 characters long and contain letters and numbers",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ data: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ data: "User already exists" });
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({ email, password: hashedPassword, role });
    await user.save();

    return res.status(201).json({ data: "User registered successfully", user });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ data: "Error registering user", error });
  }
};

// Login User
export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  // Validate email
  if (!validateEmail(email)) {
    return res.status(400).json({ data: "Invalid email format" });
  }

  // Validate password
  if (!validatePassword(password)) {
    return res.status(400).json({
      data: "Password must be at least 8 characters long and contain letters and numbers",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ data: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ data: "Invalid credentials" });
    }

    // Call the setAuthCookies function to handle token generation and cookie setting
    req.body.user = user; // Pass the user data to the setAuthCookies middleware

    setAuthCookies(req, res); // Set access and refresh tokens as cookies
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ data: "Internal server error" });
  }
};

// Logout User
export const logoutUser = (_req: any, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
};
