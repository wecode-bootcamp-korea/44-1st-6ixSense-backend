const productService = require('../services/productServices');
const { catchAsync } = require('../utils/error');

const productList = catchAsync(async (req, res) => {
  const { categoriesId } = req.query;
  const products = await productService.productList(categoriesId);
  return res.status(200).json({ data: products });
});

module.exports = {
  productList,
};
