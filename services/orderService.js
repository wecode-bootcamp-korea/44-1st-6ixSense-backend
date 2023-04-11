const orderDao = require('../models/orderDao');
const productDao = require('../models/productDao');

const createOrder = async (userId, statusId, totalPrice, cartId, productId, quantity) => {
  return await orderDao.createOrder(userId, statusId, totalPrice, cartId, productId, quantity);
};

module.exports = {
  createOrder,
};
