const cartDao = require('../models/cartDao');

const getCartByUserId = async (userId, productId, quantity) => {
  return await cartDao.getCartByUserId(userId, productId, quantity);
};

module.exports = { getCartByUserId };
