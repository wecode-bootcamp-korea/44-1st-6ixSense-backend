const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const cartRouter = require('./cartRouter');
const productRouter = require('./productRouter');
const likeRouter = require('./likeRouter');

router.use('/users', userRouter.router);
router.use('/products', productRouter.router);
router.use('/likes', likeRouter.router);
router.use('/carts', cartRouter.router);

module.exports = router;
