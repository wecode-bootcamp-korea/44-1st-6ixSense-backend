const cartService = require('../services/cartService');
const { catchAsync } = require('../utils/error');

const afterRemoveCartInfo = catchAsync(async (req, res) => {
  const { productId } = req.query;
  const userId = req.user.id;

  const result = cartService.afterRemoveCartInfo(userId, productId);

  return res.status(200).json(result);
});

module.exports = { afterRemoveCartInfo };
