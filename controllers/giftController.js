const productService = require('../services/productServices');
const { catchAsync } = require('../utils/error');

const giftProduct = catchAsync(async (req, res) => {
  const { categoryId } = req.query;
  const gift = await productService.productList(categoryId);
  return res.status(200).json({ data: gift });
});

module.exports = {
  giftProduct,
};
