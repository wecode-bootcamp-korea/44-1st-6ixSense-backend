const express = require('express');
const checkLogInToken = require('../middleware/auth');
const router = express.Router();

const likeController = require('../controllers/likeController');

router.post('/:productId', checkLogInToken, likeController.createLike);
router.delete('/:productId', checkLogInToken, likeController.deleteLike);

module.exports = {
  router,
};
