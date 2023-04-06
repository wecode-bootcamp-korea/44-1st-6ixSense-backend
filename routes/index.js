const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const paymentRouter = require('./paymentRouter');

router.use('/users', userRouter.router);
router.use('/detailpage', productRouter.router);
router.use('/payment', paymentRouter.router);

module.exports = router;
