const orderDao = require('../models/orderDao');
const { CustomError } = require('../utils/error');

const orderStatus = {
  pending: 1,
  confirm: 2,
};
Object.freeze(orderStatus);

const createOrder = async (user, totalPrice, carts) => {
  const userPoint = user.point;

  if (userPoint < totalPrice) throw new CustomError(409, 'Not Enough Point');

  const cartIds = carts.map((carts) => carts.cartId);

  const cartItems = carts.map((cart) => {
    return [cart.productId, cart.quantity];
  });

  const statusId = orderStatus.confirm;

  return await orderDao.createOrder(user.id, statusId, totalPrice, cartIds, cartItems);
};

module.exports = {
  createOrder,
};
