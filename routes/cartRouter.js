const express = require('express');

const checkLogInToken = require('../middleware/auth');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/list', checkLogInToken, cartController.getCartByUserId);
router.post('', checkLogInToken, cartController.insertCart);

module.exports = { router };
