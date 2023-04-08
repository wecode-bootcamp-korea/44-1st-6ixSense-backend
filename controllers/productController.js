const productService = require('../services/productServices');
const { catchAsync } = require('../utils/error');

const productList = catchAsync(async (req, res) => {
  const { categoryId, sort, limit = 9, offset = 0 } = req.query;
  const products = await productService.productList(categoryId, sort, parseInt(limit), parseInt(offset));
  return res.status(200).json(products);
});

module.exports = {
  productList,
};
