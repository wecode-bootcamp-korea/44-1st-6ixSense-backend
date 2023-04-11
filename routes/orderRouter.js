const express = require('express');

const checkLogInToken = require('../middleware/auth');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('', checkLogInToken, orderController.createCart);

module.exports = { router };
