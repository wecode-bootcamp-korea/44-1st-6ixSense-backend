// products.productRouter

const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/productList', productController.productList);

module.exports = {
  router,
};
