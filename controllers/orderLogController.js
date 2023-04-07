const orderLogService = require('../services/orderLogService');
const { catchAsync } = require('../utils/error');

const orderLog = catchAsync(async (req, res) => {
  const { userId, orderNumber, statusId, totalPrice } = req.body;

  if (!userId || !orderNumber || !statusId || !totalPrice) {
    const error = new Error('Input Error!');
    error.statusCode = 400;
    throw error;
  }

  await orderLogService.orderLog(userId, orderNumber, statusId, totalPrice);

  return res.status(201).json({ message: '주문 완료!' });
});

module.exports = {
  orderLog,
};
