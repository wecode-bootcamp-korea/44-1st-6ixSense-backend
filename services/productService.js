const productDao = require('../models/productDao');

const productList = async (categoryId, sort, limit, offset) => {
  return await productDao.productList(categoryId, sort, limit, offset);
};

const getProduct = async (productId) => {
  return await productDao.getProduct(productId);
};

module.exports = {
  getProduct,
  productList,
};
