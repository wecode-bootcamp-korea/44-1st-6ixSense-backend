const cartDao = require('../models/cartDao');
const productDao = require('../models/productDao');
const { CustomError } = require('../utils/error');

const insertCart = async (userId, productId, quantity) => {
  const checkProductId = await productDao.checkProductId(productId);

  if (!checkProductId) throw new CustomError(400, 'PRODUCT_NOT_VALUE');

  return await cartDao.insertCart(userId, productId, quantity);
};

const getCartByUserId = async (userId) => {
  return await cartDao.getCartByUserId(userId);
};

const afterRemoveCartInfo = async (userId, cartId) => {
  const removeCart = await cartDao.removeCart(userId, cartId);

  return removeCart;
};

const modifyCart = async (userId, cartId, quantity) => {
  return await cartDao.modifyCart(userId, cartId, quantity);
};

module.exports = { getCartByUserId, insertCart, afterRemoveCartInfo, modifyCart };
