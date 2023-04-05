const reviewService = require('../services/reviewService');
const { catchAsync } = require('../utils/error');

const reviews = catchAsync(async (req, res) => {
  const review = await reviewService.reviews();
  return res.status(200).json({ review });
});

module.exports = {
  reviews,
};
