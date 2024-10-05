const { Router } = require('express');
const authController = require("../Controllers/auth/authController");
const tokenController = require("../Controllers/auth/tokenController");
const forgetPassController = require("../Controllers/auth/forgetPassword"); 

const router = Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/refresh-token', tokenController.refreshAccessToken);
router.post('/logout', authController.logoutUser);

// Password Reset Routes
router.post('/forgot-password/send-otp', forgetPassController.sendOtp); // Send OTP
router.post('/forgot-password/verify-otp', forgetPassController.verifyOtp); // Verify OTP
router.post('/forgot-password/reset-password', forgetPassController.resetPassword); // Reset Password

module.exports = router;
     