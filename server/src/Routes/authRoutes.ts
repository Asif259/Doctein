const {Router} = require('express');

const authController = require("../Controllers/auth/authController");
const tokenController = require("../Controllers/auth/tokenController");
const authVerify = require("../Middlewares/authVerify")
const tokenHelpers = require("../Helpers/tokenHelper")
const router = Router();

router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser, authVerify.setAuthCookies);
router.post('/refresh-token', tokenController.refreshAccessToken);

router.get('/protected', tokenHelpers.authenticateToken)
router.post('/logout', (req: any, res: any) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.json({ message: 'Logged out' });
});
export = router;
