const cartService = require('../services/cartService');
const { catchAsync } = require('../utils/error');

const getCartByUserId = catchAsync(async (req, res) => {
  const userId = await req.userId;

  const result = await cartService.getCartByUserId(userId, productId, quantity);
  return res.status(201).json({ data: result });
});

module.exports = { getCartByUserId };
