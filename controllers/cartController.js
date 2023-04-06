const cartService = require('../services/cartService');
const { catchAsync } = require('../utils/error');

const getCartByUserId = catchAsync(async (req, res) => {
  const userId = await req.userId;

  const result = await cartService.getCartByUserId(userId, productId, quantity);
  return res.status(201).json({ data: result });
});

const insertCart = catchAsync(async (req, res) => {
  const { productId, quantity } = req.body;

  const userId = await req.userId;

  if (!userId || !productId || !quantity) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  await cartService.insertCart(userId, productId, quantity);
  return res.status(201).json({ message: 'CART_SAVE_SUCCESS' });
});

module.exports = { insertCart, getCartByUserId };