const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/reviewController');

router.get('', reviewController.reviews);

module.exports = {
  router,
};
