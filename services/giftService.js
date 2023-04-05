const productDao = require('../models/productDao');

const giftProduct = async (products) => {
  return await productDao.productList(products);
};

module.exports = {
  giftProduct,
};
