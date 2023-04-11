const orderService = require('../services/orderService');
const { catchAsync } = require('../utils/error');

const createOrder = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { statusId = 2, totalPrice, carts } = req.body;

  if (!totalPrice || !carts) {
    const error = new Error('Input Error!');
    error.statusCode = 400;
    throw error;
  }

  await Promise.all(
    carts.map(async ({ cartId, productId, quantity }) => {
      await orderService.createOrder(userId, statusId, totalPrice, cartId, productId, quantity);
    })
  );
  return res.status(201).json({ message: '주문 완료!' });
});

module.exports = {
  createOrder,
};
