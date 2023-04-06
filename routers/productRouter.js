const express = require('express');

const detailPageController = require('../controllers/detailPageController');
const router = express.Router();

router.get('/:productId', detailPageController.getProduct);

module.exports = {
  router,
};
