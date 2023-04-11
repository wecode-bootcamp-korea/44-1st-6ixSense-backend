const orderDao = require('../models/orderDao');
const productDao = require('../models/productDao');

const createOrder = async (userId, statusId, totalPrice) => {
  return await orderDao.createOrder(userId, statusId, totalPrice);
};

module.exports = {
  createOrder,
};
