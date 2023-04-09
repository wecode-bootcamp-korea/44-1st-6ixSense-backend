const paymentService = require('../services/paymentService');
const { catchAsync } = require('../utils/error');

const payment = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.query;

  const paymentPage = await paymentService.payment(userId, productId);
  return res.status(200).json(paymentPage);
});

module.exports = {
  payment,
};
