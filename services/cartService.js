const cartDao = require('../models/cartDao');

const getCartByUserId = async (userId, productId, quantity) => {
  return await cartDao.getCartByUserId(userId, productId, quantity);
};

const insertCart = async (userId, productId, quantity) => {
  return await cartDao.insertCart(userId, productId, quantity);
};

module.exports = { insertCart, getCartByUserId };
