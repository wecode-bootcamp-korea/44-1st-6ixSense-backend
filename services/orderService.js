const orderDao = require('../models/orderDao');
const productDao = require('../models/productDao');

const orderStatus = {
  pending: 1,
  confirm: 2,
};
Object.freeze(orderStatus);

const createOrder = async (user, totalPrice, carts) => {
  const userPoint = user.point;

  if (userPoint < totalPrice) throw new Error();

  const cartIds = carts.map((carts) => carts.cartId); // cartIds: [1,2,3]
  const cartItems = carts.map((cart) => {
    return [cart.productId, cart.quantity];
  }); // [[1,5], [2,3]]
  let statusId = orderStatus.confirm;

  return await orderDao.createOrder(user.id, statusId, totalPrice, cartIds, cartItems);
};

module.exports = {
  createOrder,
};
