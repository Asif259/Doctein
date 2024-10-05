import { Request, Response } from "express";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
const User = require("../../Models/userModel");

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Helper function to generate OTP (6-digit)
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit random number
};

const verifyOtp = (user: any, otp: string) => {
  const otpExpiryTime = 15 * 60 * 1000; // OTP expiration time (15 minutes)
  const isOtpValid = user.reset.otp === otp;
  const isOtpExpired = new Date().getTime() - new Date(user.reset.lastReset).getTime() > otpExpiryTime;
  
  if (isOtpValid && !isOtpExpired) {
    return true;
  }
  return false;
};

// Send OTP
 const sendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ data: "User not found" });
    }

    const otp = generateOtp();

    user.reset.otp = otp;
    user.reset.attempt = 0; 
    user.reset.lastReset = new Date(); 
    await user.save();

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Password Reset OTP",
      text: `Your OTP for password reset is ${otp}. It is valid for 15 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ data: "OTP sent successfully" });

  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ data: "Error sending OTP" });
  }
};

// Verify OTP
 const verifyOtpHandler = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ data: "User not found" });
    }

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
 const resetPassword = async (req: Request, res: Response) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ data: "Passwords do not match" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ data: "User not found" });
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    user.password = hashedPassword;
    user.reset.otp = null; 
    user.reset.lastReset = null;
    await user.save();

    return res.status(200).json({ data: "Password reset successfully" });

  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ data: "Error resetting password" });
  }
};

module.exports = {
  sendOtp,
  verifyOtpHandler,
  resetPassword
};