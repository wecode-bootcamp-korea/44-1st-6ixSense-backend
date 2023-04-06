const productService = require('../services/productServices');
const { catchAsync } = require('../utils/error');

const productList = catchAsync(async (req, res) => {
  const { categoryId, sort, limit = 10, offset = 0 } = req.query;
  const products = await productService.productList(categoryId, sort, parseInt(limit), pareInt(offset));
  return res.status(200).json({ data: products });
});

module.exports = {
  productList,
};
