import { Router } from "express";
import * as authController from "../Controllers/auth/authController";
import * as tokenController from "../Controllers/auth/tokenController";
import * as forgetPassController from "../Controllers/auth/forgetPassword";

const router = Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/refresh-token", tokenController.refreshAccessToken);
router.post("/logout", authController.logoutUser);
router.post('/activate', authController.activateUser);

// Password Reset Routes
router.post("/forgot-password/send-otp", forgetPassController.sendOtp); // Send OTP
router.post("/forgot-password/verify-otp", forgetPassController.verifyOtp); // Verify OTP
router.post(
  "/forgot-password/reset-password",
  forgetPassController.resetPassword,
); // Reset Password

export default router;
