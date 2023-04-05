const productDao = require('../models/productDao');

const productList = async (categoryId) => {
  return await productDao.productList(categoryId);
};

module.exports = {
  productList,
};
