const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/giftproduct', productController.giftproduct);

module.exports = {
  router,
};
