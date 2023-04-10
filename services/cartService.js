const cartDao = require('../models/cartDao');
const productDao = require('../models/productDao');

const insertCart = async (userId, productId, quantity) => {
  const checkProductId = await productDao.checkProductId(productId);

  if (!checkProductId) {
    const error = new Error('PRODUCT_NOT_VALUE');
    error.statusCode = 409;
    throw error;
  }

  return await cartDao.insertCart(userId, productId, quantity);
};

const getCartByUserId = async (userId) => {
  return await cartDao.getCartByUserId(userId);
};

module.exports = { getCartByUserId, insertCart };
