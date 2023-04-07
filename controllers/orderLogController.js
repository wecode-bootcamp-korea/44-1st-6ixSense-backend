const orderLogService = require('../services/orderLogService');
const { catchAsync } = require('../utils/error');

const orderLog = catchAsync(async (req, res) => {
  const { id, userId, orderNumber, statusId, totalPrice } = req.body;

  await orderLogService.orderLog(id, userId, orderNumber, statusId, totalPrice);

  return res.status(201).json({ message: '주문 완료!' });
});

module.exports = {
  orderLog,
};
