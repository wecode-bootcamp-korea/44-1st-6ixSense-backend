const productDao = require('../models/productDao');

const productList = async () => {
  return await productDao.productList();
};

module.exports = {
  productList,
};
