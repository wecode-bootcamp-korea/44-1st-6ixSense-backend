const express = require('express');

const checkLogInToken = require('../middleware/auth');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('', checkLogInToken, cartController.insertCart);
router.get('', checkLogInToken, cartController.getCartByUserId);

module.exports = { router };
