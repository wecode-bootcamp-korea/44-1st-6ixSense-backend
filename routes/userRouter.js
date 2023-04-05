const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const checkLogInToken = require('../middleware/auth');

router.post('/signin', userController.signIn);

module.exports = { router };
