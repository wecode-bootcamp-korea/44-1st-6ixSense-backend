const express = require('express');

const checkLogInToken = require('../middleware/auth');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/list/remove', checkLogInToken, cartController.afterRemoveCartInfo);

module.exports = { router };
