const productService = require('../services/productServices');
const { catchAsync } = require('../utils/error');

const productList = catchAsync(async (req, res) => {
  const { categoryId } = req.query;
  const products = await productService.productList(categoryId);
  return res.status(200).json({ data: products });
});

module.exports = {
  productList,
};
