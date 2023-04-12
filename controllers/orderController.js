const orderService = require('../services/orderService');
const { catchAsync } = require('../utils/error');

const createOrder = catchAsync(async (req, res) => {
  const user = req.user;
  const { totalPrice, carts } = req.body;

  //[{},{}]
  if (!totalPrice || !carts) {
    const error = new Error('Input Error!');
    error.statusCode = 400;
    throw error;
  }

  await orderService.createOrder(user, totalPrice, carts);
  return res.status(201).json({ message: 'Success Create Order' });
});

module.exports = {
  createOrder,
};
