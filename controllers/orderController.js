const orderService = require('../services/orderService');
const { catchAsync, CustomError } = require('../utils/error');

const createOrder = catchAsync(async (req, res) => {
  const user = req.user;
  const { totalPrice, carts } = req.body;

  if (!totalPrice || !carts) throw new CustomError(400, 'KEY_ERROR');

  await orderService.createOrder(user, totalPrice, carts);

  return res.status(201).json({ message: 'Success Create Order!' });
});

module.exports = {
  createOrder,
};

