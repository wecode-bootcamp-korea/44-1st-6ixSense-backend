const productDao = require('../models/productDao');

const getProduct = async (productId) => {
  return await productDao.getProduct(productId);
};

module.exports = {
  getProduct,
};
