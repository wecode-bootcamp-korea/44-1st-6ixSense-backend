const express = require('express');
const router = express.Router();
const checkLogInToken = require('../middleware/auth');

const orderLogController = require('../controllers/orderLogController');

router.post('', checkLogInToken, orderLogController.orderLog);

module.exports = {
  router,
};
