const likeDao = require('../models/likeDao');
const productDao = require('../models/productDao');
const { CustomError } = require('../utils/error');

const createLike = async (userId, productId) => {
  const product = await productDao.checkProductId(productId);

  if (!product) throw new CustomError(404, 'Product_Does_Not_Exist');

  return await likeDao.createLike(userId, productId);
};

const deleteLike = async (userId, productId) => {
  const product = await productDao.checkProductId(productId);

  if (!product) throw new CustomError(404, 'Product_Does_Not_Exist');

  return await likeDao.deleteLike(userId, productId);
};

module.exports = {
  createLike,
  deleteLike,
};
