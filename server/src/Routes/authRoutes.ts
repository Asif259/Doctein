const { Router } = require('express');
const authController = require("../Controllers/auth/authController");
const tokenController = require("../Controllers/auth/tokenController");
const { authenticateToken } = require("../Helpers/tokenHelper"); // Import the middleware

const router = Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/refresh-token', tokenController.refreshAccessToken);

router.get('/protected', authenticateToken, (req: any, res: any) => {
  return res.json({ data: "Access granted to protected route" });
});

router.post('/logout', authController.logoutUser);

module.exports = router;
