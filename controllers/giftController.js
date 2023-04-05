const productService = require('../services/productService');

const giftProduct = catchAsync(async (req, res) => {
  const { gift } = req.query;
  const giftProuduct = await productService.giftProduct(gift);
  return res.status(200).json({ data: giftProuduct });
});

module.exports = {
  giftProduct,
};
