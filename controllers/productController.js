const productService = require('../services/productService');
const { catchAsync } = require('../utils/error');

const getProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const productDetail = await productService.getProduct(productId);

  return res.status(200).json({ productDetail });
});

module.exports = {
  getProduct,
};
//
