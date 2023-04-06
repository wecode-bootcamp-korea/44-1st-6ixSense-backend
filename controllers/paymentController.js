const paymentService = require('../services/paymentService');
const { catchAsync } = require('../utils/error');

const payment = catchAsync(async (req, res) => {
  const paymentPage = await paymentService.payment();
  return res.status(200).json({ paymentPage });
});

module.exports = {
  payment,
};
