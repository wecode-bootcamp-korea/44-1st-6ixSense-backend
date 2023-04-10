const cartDao = require('../models/cartDao');

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

module.exports = { afterRemoveCartInfo, modifyCart };
