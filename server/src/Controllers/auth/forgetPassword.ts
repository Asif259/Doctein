import { Request, Response } from "express";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import User from "../../Models/userModel";

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ashrafulasif260@gmail.com",
    pass: "ucii ijkj xvsg ivzn",
  },
});

// Helper function to generate OTP (6-digit)
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit random number
};

// Verify OTP
const verifyOtpHelper = (user: any, otp: string) => {
  const otpExpiryTime = 5 * 60 * 1000; // OTP expiration time (5 minutes)
  const isOtpValid = user.reset.otp === otp;
  const isOtpExpired =
    new Date().getTime() - new Date(user.reset.lastReset).getTime() >
    otpExpiryTime;

  return isOtpValid && !isOtpExpired;
};

// Send OTP
const sendOtp = async (req: Request, res: Response): Promise<any> => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, data: "User not found" });
    }

    // Check if user has exceeded maximum attempts and is locked out for 1 day
    const lockoutDuration = 24 * 60 * 60 * 1000;
    const isLockedOut =
      user.reset.attempt >= 5 &&
      new Date().getTime() -
        new Date((user.reset.lastReset as Date)?.toString()).getTime() <
        lockoutDuration;

    if (isLockedOut) {
      return res.status(403).json({
        success: false,
        data: "Too many attempts. Please try again after 24 hours.",
      });
    }

    // Check if the user can send another OTP (2 minutes interval)
    const otpSendInterval = 2 * 60 * 1000;
    const timeSinceLastOtp =
      new Date().getTime() -
      new Date((user.reset.lastReset as Date)?.toString()).getTime();

      if (timeSinceLastOtp < otpSendInterval) {
        const remainingTime = otpSendInterval - timeSinceLastOtp; // Remaining time in milliseconds
        return res.status(403).json({
          success: false,
          data: `Please wait ${Math.ceil(remainingTime / 1000)} seconds before requesting a new OTP.`,
          remainingTime, 
        });
      }

    const otp = generateOtp();
    user.reset.otp = otp;
    user.reset.attempt += 1;
    user.reset.lastReset = new Date();
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "DocHub verification OTP",
      html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
    <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
      <h2 style="text-align: center; color: #24ae7c;">Welcome to Doctain!</h2>
      <p style="font-size: 16px; color: #333333; text-align: center;">This is the verification code for registering or restting password. Please use the following OTP to verify your email address and complete the registration process.</p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="font-size: 24px; font-weight: bold; padding: 10px 20px; background-color: #24ae7c; color: #ffffff; border-radius: 5px; display: inline-block;">${otp}</span>
      </div>
      <p style="font-size: 14px; color: #333333; text-align: center;">This OTP is valid for <strong>5 minutes</strong>. If you did not request this, please ignore this email.</p>
      <hr style="margin: 20px 0;">
      <p style="font-size: 12px; color: #888888; text-align: center;">Doctain Team</p>
    </div>
  </div>
  `,
    };

    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .json({ success: true, data: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ success: false, data: "Error sending OTP" });
  }
};

// Verify OTP
const verifyOtp = async (req: Request, res: Response): Promise<any> => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, data: "User not found" });
    }

    const isValidOtp = verifyOtpHelper(user, otp);
    if (!isValidOtp) {
      return res
        .status(400)
        .json({ success: false, data: "Invalid or expired OTP" });
    }

    return res
      .status(200)
      .json({ success: true, data: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ success: true, data: "Error verifying OTP" });
  }
};

// Reset Password
const resetPassword = async (req: Request, res: Response): Promise<any> => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, data: "User not found" });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({ success: false, data: "New password must be different from the current password" });
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);
    user.password = await bcrypt.hash(newPassword, saltRounds);
    user.reset.otp = null;
    user.reset.lastReset = null;
    user.reset.attempt = 0;
    await user.save();

    return res
      .status(200)
      .json({ success: true, data: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error resetting password" });
  }
};

export { sendOtp, verifyOtp, resetPassword };
