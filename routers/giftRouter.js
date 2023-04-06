const express = require('express');
const giftController = require('../controllers/giftController');

const router = express.Router();

router.get('/giftproduct', giftController.giftProduct);

module.exports = {
  router,
};
