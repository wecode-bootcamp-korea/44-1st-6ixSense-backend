const express = require('express');
const router = express.Router();
const checkLogInToken = require('../middleware/auth');

const paymentController = require('../controllers/paymentController');

router.get('', checkLogInToken, paymentController.payment);

module.exports = {
  router,
};
