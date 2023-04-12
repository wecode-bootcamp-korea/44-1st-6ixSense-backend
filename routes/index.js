const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const likeRouter = require('./likeRouter');
const userInformationRouter = require('./userInformationRouter');
const cartRouter = require('./cartRouter');
const orderRouter = require('./orderRouter');

router.use('/users', userRouter.router);
router.use('/products', productRouter.router);
router.use('/likes', likeRouter.router);
router.use('/userInfo', userInformationRouter.router);
router.use('/carts', cartRouter.router);
router.use('/order', orderRouter.router);

module.exports = router;
