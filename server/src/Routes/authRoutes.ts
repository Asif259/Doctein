const {Router} = require('express');

const authController = require("../Controllers/auth/authController");
const jwtController = require("../Controllers/auth/jwtController");
const authVerify = require("../Middlewares/authVerify")

const router = Router();

router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser, authVerify.setAuthCookies);

router.post('/refresh-token', jwtController.refreshToken);


export = router;
