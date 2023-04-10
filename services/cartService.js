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

const afterRemoveCartInfo = async (userId, productId) => {
  await cartDao.removeCart(userId, productId);

  const getCartByUserId = await cartDao.getCartByUserId(userId);

  return getCartByUserId;
};

const modifyCart = async (userId, productId, quantity) => {
  await cartDao.modifyCart(userId, productId, quantity);

  const getCartByUserId = await cartDao.getCartByUserId(userId);

  return getCartByUserId;
};

module.exports = { getCartByUserId, insertCart, afterRemoveCartInfo, modifyCart };
