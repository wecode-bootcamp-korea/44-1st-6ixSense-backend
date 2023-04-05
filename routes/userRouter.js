const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const checkLogInToken = require('../middleware/auth');

router.post('/signin', checkLogInToken, userController.signIn);

module.exports = { router };
