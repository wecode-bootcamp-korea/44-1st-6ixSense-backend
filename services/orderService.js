const orderDao = require('../models/orderDao');

const createCart = async (userId, statusId, totalPrice, productId, quantity) => {
  return await orderDao.createOrder(userId, statusId, totalPrice, productId, quantity);
};

module.exports = { createCart };
