const express = require('express');
const router = express.Router();
const checkLogInToken = require('../middleware/auth');

const userInformationController = require('../controllers/userInformationController');

router.get('', checkLogInToken, userInformationController.userInformation);

module.exports = {
  router,
};
