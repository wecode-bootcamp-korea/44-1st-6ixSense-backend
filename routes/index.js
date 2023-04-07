const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const orderLogRouter = require('./orderLogRouter');

router.use('/users', userRouter.router);
router.use('/detailpage', productRouter.router);
router.use('/orderlog', orderLogRouter.router);

module.exports = router;
