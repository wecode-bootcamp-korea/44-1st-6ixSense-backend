const productDao = require('../models/productDao');

const getProductList = async (categoryId, sort, limit, offset) => {
  return await productDao.getProductList(categoryId, sort, limit, offset);
};

const getProduct = async (productId) => {
  return await productDao.getProduct(productId);
};

module.exports = {
  getProduct,
  getProductList,
};
