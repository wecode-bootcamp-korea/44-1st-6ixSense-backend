const cartService = require('../services/cartService');
const { catchAsync, CustomError } = require('../utils/error');

const getCartByUserId = catchAsync(async (req, res) => {
  const userId = await req.user.id;

  const result = await cartService.getCartByUserId(userId);

  return res.status(200).json(result);
});

const insertCart = catchAsync(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = await req.user.id;

  if (!productId || !quantity) throw new CustomError(400, 'dataSource_Error');

  await cartService.insertCart(userId, productId, quantity);

  return res.status(201).json({ message: 'CREATE_CART_SUCCESS' });
});

const removeCart = catchAsync(async (req, res) => {
  const { cartId } = req.query;
  const userId = req.user.id;

  if (!cartId) throw new CustomError(400, 'KEY_ERROR');

  const result = await cartService.afterRemoveCartInfo(userId, cartId);

  return res.status(200).json(result);
});

const modifyCart = catchAsync(async (req, res) => {
  const { cartId, quantity } = req.body;
  const userId = await req.user.id;

  if (!cartId || !quantity) throw new CustomError(400, 'KEY_ERROR');

  const result = await cartService.modifyCart(userId, cartId, quantity);

  return res.status(200).json(result);
});

module.exports = {
  insertCart,
  getCartByUserId,
  removeCart,
  modifyCart,
};
