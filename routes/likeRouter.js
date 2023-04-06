const express = require('express');
const router = express.Router();

const likeController = require('../controllers/likeController');

router.post('', likeController.likes);
router.delete('/:userId', likeController.likesCensel);

module.exports = {
  router,
};
