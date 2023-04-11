const orderDao = require('../models/orderDao');
const productDao = require('../models/productDao');

const createOrder = async (userId, statusId, totalPrice, carts) => {
  const cartId = carts.map((carts) => carts.cartId);
  const productId = carts.map((carts) => carts.productId);
  const quantity = carts.map((carts) => carts.quantity);

  return await orderDao.createOrder(userId, statusId, totalPrice, cartId, productId, quantity);
};

module.exports = {
  createOrder,
};
