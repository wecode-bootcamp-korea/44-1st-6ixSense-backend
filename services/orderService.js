const orderDao = require('../models/orderDao');

const createCart = async (userId, statusId, totalPrice, ...params) => {
  return await orderDao.createOrder(userId, statusId, totalPrice, ...params);
};

module.exports = { createCart };
