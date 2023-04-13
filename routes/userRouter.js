const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const checkLogInToken = require('../middleware/auth');

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('', checkLogInToken, userController.getUserById);
module.exports = { router };
