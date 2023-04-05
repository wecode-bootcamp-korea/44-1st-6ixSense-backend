const detailPageDao = require('../models/detailPageDao');

const getProduct = async (productId) => {
  return await detailPageDao.getProduct(productId);
};

module.exports = {
  getProduct,
};
