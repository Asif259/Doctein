import { Request, Response } from "express";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { generateOtp, verifyOtp } from "../Helpers/otpHelpers"; // You can create helper functions for OTP
import User from "../Models/userModel";

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// Send OTP
export const sendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ data: "User not found" });
    }

    const otp = generateOtp(); 

    // Set OTP in user record (with expiration time, attempts, etc.)
    user.reset.otp = otp;
    user.reset.attempt = 0; 
    user.reset.lastReset = new Date();
    await user.save();

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Password Reset OTP",
      text: `Your OTP for password reset is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ data: "OTP sent successfully" });

  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ data: "Error sending OTP" });
  }
};

// Verify OTP
export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ data: "User not found" });
    }

    // Check if OTP matches and is within expiration window
    const isValidOtp = verifyOtp(user, otp);
    if (!isValidOtp) {
      return res.status(400).json({ data: "Invalid or expired OTP" });
    }

    return res.status(200).json({ data: "OTP verified successfully" });

  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ data: "Error verifying OTP" });
  }
};

// Reset Password
export const resetPassword = async (req: Request, res: Response) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ data: "Passwords do not match" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ data: "User not found" });
    }

    // Hash the new password
    const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password
    user.password = hashedPassword;
    user.reset.otp = null; // Clear OTP after successful password reset
    await user.save();

    return res.status(200).json({ data: "Password reset successfully" });

  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ data: "Error resetting password" });
  }
};
