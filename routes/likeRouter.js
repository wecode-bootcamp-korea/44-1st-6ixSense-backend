const express = require('express');
const checkLogInToken = require('../middleware/auth');
const router = express.Router();

const likeController = require('../controllers/likeController');

router.post('', checkLogInToken, likeController.createLike);
router.delete('', checkLogInToken, likeController.deleteLike);

module.exports = {
  router,
};
