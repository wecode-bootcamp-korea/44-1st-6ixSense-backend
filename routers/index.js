const express = require('express');
const router = express.Router();

const detailPageRouter = require('./detailPageRouter');

router.use('/detailpage', detailPageRouter.router);

module.exports = router;
