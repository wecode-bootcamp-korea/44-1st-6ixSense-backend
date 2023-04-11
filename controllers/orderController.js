const orderService = require('../services/orderService');
const { catchAsync } = require('../utils/error');

const createOrder = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { statusId, totalPrice } = req.body;

  if (!statusId || !totalPrice) {
    const error = new Error('Input Error!');
    error.statusCode = 400;
    throw error;
  }

  await orderService.createOrder(userId, statusId, totalPrice);

  return res.status(201).json({ message: '주문 완료!' });
});

module.exports = {
  createOrder,
};
