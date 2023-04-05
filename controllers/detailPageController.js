const detailPageService = require('../services/detailPageService');
const { catchAsync } = require('../utils/error');

const getProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  console.log(productId);
  const detailProduct = await detailPageService.getProduct(productId);

  return res.status(200).json({ detailProduct });
});

module.exports = {
  getProduct,
};
