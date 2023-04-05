const express = require('express');
const router = express.Router();

const reviewRouter = require('./reviewRouter');

router.use('/reviews', reviewRouter.router);

module.exports = router;
