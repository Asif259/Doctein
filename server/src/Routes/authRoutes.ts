import { Router } from "express";
import * as authController from "../Controllers/auth/authController";
import * as userController from "../Controllers/userController";
import * as forgetPassController from "../Controllers/auth/forgetPassword";
import authenticateToken from "../Middlewares/authenticate";

const router = Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/authenticate", authenticateToken, authController.isLoggedIn);
router.get("/logout", authenticateToken, authController.logoutUser);
router.post("/activate", authenticateToken, authController.activateUser);
router.get("/profile", authenticateToken, userController.getUserProfile); // Get user profile
router.get(
  "/dashboard/metrics",
  authenticateToken,
  userController.getDashboard,
); // Get user dashboard

// Password Reset Routes
router.post("/forgot-password/send-otp", forgetPassController.sendOtp); // Send OTP
router.post("/forgot-password/verify-otp", forgetPassController.verifyOtp); // Verify OTP
router.post(
  "/forgot-password/reset-password",
  forgetPassController.resetPassword,
); // Reset Password

export default router;
