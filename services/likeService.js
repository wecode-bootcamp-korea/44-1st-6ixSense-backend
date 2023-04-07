const likeDao = require('../models/likeDao');

const createLike = async (userId, productId) => {
  return await likeDao.createLike(userId, productId);
};

const deleteLike = async (userId) => {
  return await likeDao.deleteLike(userId);
};

module.exports = {
  createLike,
  deleteLike,
};
