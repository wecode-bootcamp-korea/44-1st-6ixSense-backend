const express = require('express');
const router = express.Router();

const likeController = require('../controllers/likeController');

router.post('', likeController.createLike);
router.delete('/:userId', likeController.deleteLike);

module.exports = {
  router,
};
