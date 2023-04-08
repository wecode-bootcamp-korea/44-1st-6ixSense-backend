const cartService = require('../services/cartService');
const { catchAsync } = require('../utils/error');

const insertCart = catchAsync(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = await req.user.id;

  if (!userId || !productId || !quantity) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const result = await cartService.insertCart(userId, productId, quantity);

  return res.status(201).json({ message: 'CREATE_CART_SUCCESS' });
});

module.exports = { insertCart };
