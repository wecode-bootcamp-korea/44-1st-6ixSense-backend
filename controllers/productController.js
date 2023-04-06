const detailPageService = require('../services/detailPageService');
const { catchAsync } = require('../utils/error');

const getProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const productDetail = await detailPageService.getProduct(productId);

  return res.status(200).json({ productDetail });
});

module.exports = {
  getProduct,
};
//
