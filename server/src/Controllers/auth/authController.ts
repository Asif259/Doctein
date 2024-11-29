import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { setAuthCookies } from "../../Helpers/authVerify"; // Import the middleware
import User, { IUser } from "../../Models/userModel";

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  console.log(password);
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // At least 6 characters, letters and numbers
  return passwordRegex.test(password);
};

// Register User
export const registerUser = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { email, password, confirmPassword, role } = req.body;

  if (!validateEmail(email)) {
    return res
      .status(400)
      .json({ success: false, data: "Invalid email format" });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({
      success: false,
      data: "Password must be at least 6 characters long and contain letters and numbers",
    });
  }

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ success: false, data: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (!existingUser.active) {
        return res.status(200).json({
          success: false,
          data: "User not active, resend OTP required",
          requireOtp: true,
        });
      }
      return res.status(400).json({
        success: false,
        data: "User already exists, Log in to your account",
      });
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS || "10");
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      email,
      password: hashedPassword,
      role,
      confirmPassword: hashedPassword,
    });
    await user.save();

    const response = {
      email: user.email,
      role: user.role,
      userId: user.userId,
      active: user.active,
    };
    return res.status(201).json({
      success: true,
      data: "User registered successfully",
      user: response,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error registering user", error });
  }
};

// Login User
export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  // Validate email
  if (!validateEmail(email)) {
    return res
      .status(400)
      .json({ success: false, data: "Invalid email format" });
  }

  // Validate password
  if (!validatePassword(password)) {
    return res.status(400).json({
      success: false,
      data: "Password must be at least 6 characters long and contain letters and numbers",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, data: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, data: "Invalid credentials" });
    }

    // Call the setAuthCookies function to handle token generation and cookie setting
    req.headers.user = JSON.parse(JSON.stringify(user)); // Pass the user data to the authenticateToken middleware

    setAuthCookies(req, res); // Set access and refresh tokens as cookies
  } catch (error) {
    console.error("Error logging in user:", error);
    return res
      .status(500)
      .json({ success: false, data: "Internal server error" });
  }
};

export const activateUser = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const user = req.headers.user as unknown as IUser;
  if (!user) {
    return res
      .status(401)
      .json({ success: false, data: "User not authenticated" });
  }
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id, email: user.email },
      { active: true },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, data: "User not found" });
    }

    const response = {
      email: updatedUser.email,
      role: updatedUser.role,
      userId: updatedUser.userId,
      active: updatedUser.active,
    };
    return res.status(200).json({
      success: true,
      data: "User activated successfully",
      user: response,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: "Something went wrong" });
  }
};

export const isLoggedIn = (req: Request, res: Response): any => {
  const user = req.headers.user as unknown as IUser;
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "User not logged in" });
  }
  const response = {
    email: user.email,
    role: user.role,
    userId: user.userId,
    active: user.active,
  };
  return res.json({ success: true, data: response });
};

// Logout User
export const logoutUser = (_req: Request, res: Response): any => {
  res.clearCookie("accessToken");
  res.json({ success: true, message: "Logged out successfully" });
};
