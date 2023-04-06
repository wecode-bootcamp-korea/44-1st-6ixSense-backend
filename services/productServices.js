const productDao = require('../models/productDao');

const productList = async (categoryId, sort, limit, offset) => {
  return await productDao.productList(categoryId, sort, limit, offset);
};

module.exports = {
  productList,
};
