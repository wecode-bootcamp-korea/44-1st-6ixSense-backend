const productService = require('../services/productService');
const { catchAsync } = require('../utils/error');

const getProductList = catchAsync(async (req, res) => {
  const { categoryId, sort, limit = 9, offset = 0 } = req.query;

  const products = await productService.getProductList(categoryId, sort, parseInt(limit), parseInt(offset));

  return res.status(200).json(products);
});

const getProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const [productDetail] = await productService.getProduct(productId);

  return res.status(200).json(productDetail);
});

module.exports = {
  getProductList,
  getProduct,
};
