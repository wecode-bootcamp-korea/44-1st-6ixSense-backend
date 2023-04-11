const orderService = require('../services/orderService');
const { catchAsync } = require('../utils/error');

const createCart = catchAsync(async (req, res) => {
  const { statusId = 2, totalPrice, productId, quantity } = req.body;
  const userId = await req.user.id;

  console.log(req.body);
  if (!statusId || !totalPrice || !productId || !quantity) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const result = await orderService.createCart(userId, statusId, totalPrice, productId, quantity);
  console.log(result);
  return res.status(201).json(result);
});

module.exports = { createCart };
