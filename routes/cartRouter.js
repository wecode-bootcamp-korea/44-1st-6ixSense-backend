const express = require('express');

const checkLogInToken = require('../middleware/auth');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/list', checkLogInToken, cartController.getCartByUserId);

module.exports = { router };
