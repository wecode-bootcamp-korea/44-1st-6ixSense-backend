const cartDao = require('../models/cartDao');

const insertCart = async (userId, productId, quantity) => {
  return await cartDao.insertCart(userId, productId, quantity);
};

module.exports = { insertCart };
