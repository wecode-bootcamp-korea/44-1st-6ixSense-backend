const productDao = require('../models/productDao');

const productList = async (categoryId, first, last) => {
  if (!categoryId) {
    return await productDao.productListOther(first, last);
  }

  return await productDao.productList(categoryId, first, last);
};

module.exports = {
  productList,
};
