const express = require('express');
const router = express.Router();

const productRouter = require('./productRouter');
const giftRouter = require('./giftRouter');

router.use('/products', productRouter.router);
router.use('/giftproducts', giftRouter.router);

module.exports = router;
