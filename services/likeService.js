const likeDao = require('../models/likeDao');

const createLike = async (userId, productId) => {
  return await likeDao.createLike(userId, productId);
};

const deleteLike = async (userId, productId) => {
  return await likeDao.deleteLike(userId, productId);
};

module.exports = {
  createLike,
  deleteLike,
};
