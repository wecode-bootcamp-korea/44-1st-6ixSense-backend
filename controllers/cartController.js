const cartService = require('../services/cartService');
const { catchAsync } = require('../utils/error');

const getCartByUserId = catchAsync(async (req, res) => {
  const userId = await req.user.id;

  const result = await cartService.getCartByUserId(userId);

  return res.status(201).json(result);
});

module.exports = {
  getCartByUserId,
};
