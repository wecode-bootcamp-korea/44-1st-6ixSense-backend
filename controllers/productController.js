const productService = require('../services/productServices');
const { catchAsync } = require('../utils/error');

const productList = catchAsync(async (req, res) => {
  const { categoryId, first, last } = req.query;
  const products = await productService.productList(categoryId, Number(first), Number(last));
  return res.status(200).json({ data: products });
});

module.exports = {
  productList,
};
