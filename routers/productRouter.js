const express = require('express');

const productController = require('../controllers/productController');
const router = express.Router();

router.get('/:productId', productController.getProduct);

module.exports = {
  router,
};
