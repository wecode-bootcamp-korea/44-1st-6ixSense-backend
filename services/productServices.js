const productDao = require('../models/productDao');

const productList = async (categoriesId) => {
  return await productDao.productList(categoriesId);
};

module.exports = {
  productList,
};
