const orderService = require('../services/orderService');
const { catchAsync } = require('../utils/error');

const createCart = catchAsync(async (req, res) => {
  const [totalPrice, ...params] = req.body;

  const statusId = 2;

  const userId = await req.user.id;

  const result = await orderService.createCart(userId, statusId, totalPrice, ...params);
  return res.status(201).json(result);
});

module.exports = { createCart };
