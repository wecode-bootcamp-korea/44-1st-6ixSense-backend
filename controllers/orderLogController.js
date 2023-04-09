const orderLogService = require('../services/orderLogService');
const { catchAsync } = require('../utils/error');

const orderLog = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { statusId, totalPrice } = req.body;

  if (!statusId || !totalPrice) {
    const error = new Error('Input Error!');
    error.statusCode = 400;
    throw error;
  }

  await orderLogService.orderLog(userId, statusId, totalPrice);

  return res.status(201).json({ message: '주문 완료!' });
});

module.exports = {
  orderLog,
};
