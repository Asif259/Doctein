const {Router} = require('express');

const authController = require("../Controllers/authController");
const jwtController = require("../Controllers/jwtController");

const router = Router();

router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser); 
// router.post('/login', jwtController.loginAndGenerateTokens);

router.post('/refresh-token', jwtController.refreshToken);

export = router;
