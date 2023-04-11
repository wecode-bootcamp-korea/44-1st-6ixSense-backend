const paymentService = require('../services/paymentService');
const { catchAsync } = require('../utils/error');

const payment = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const paymentPage = await paymentService.payment(userId);
  return res.status(200).json({ paymentPage });
});

module.exports = {
  payment,
};
