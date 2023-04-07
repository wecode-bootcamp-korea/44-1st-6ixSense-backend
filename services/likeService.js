const likeDao = require('../models/likeDao');
const productDao = require('../models/productDao');

const createLike = async (userId, productId) => {
  const product = await productDao.getProdcutById(productId);

  if (!product) {
    const error = new Error('Product_Does_Not_Exist');
    error.statusCode = 404;

    throw error;
  }
  return await likeDao.createLike(userId, productId);
};

const deleteLike = async (userId, productId) => {
  return await likeDao.deleteLike(userId, productId);
};

module.exports = {
  createLike,
  deleteLike,
};
