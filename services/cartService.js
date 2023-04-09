const cartDao = require('../models/cartDao');

const afterRemoveCartInfo = async (userId, productId) => {
  await cartDao.removeCart(userId, productId);
  const getCartByUserId = await cartDao.getCartByUserId(userId);

  return getCartByUserId;
};

module.exports = { afterRemoveCartInfo };
