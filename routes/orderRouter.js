const express = require('express');
const router = express.Router();

const checkLogInToken = require('../middleware/auth');
const orderController = require('../controllers/orderController');

router.post('', checkLogInToken, orderController.createOrder);

module.exports = {
  router,
};
