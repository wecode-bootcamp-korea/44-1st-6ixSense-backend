const express = require('express');
const router = express.Router();

const orderLogController = require('../controllers/orderLogController');

router.post('', orderLogController.orderLog);

module.exports = {
  router,
};
