const express = require('express');
const router = express.Router();

const detailPageRouter = require('./detailPageRouter');
const likes = require('./likes');

router.use('/detailpage', detailPageRouter.router);
router.use('/likes', likes.router);

module.exports = router;
