const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const cartRouter = require('./cartRoutes');

router.use('/users', userRouter.router);
router.use('/carts', cartRouter.router);

module.exports = router;
