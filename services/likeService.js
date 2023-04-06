const userDao = require('../models/likeDao');

const createLike = async (userId, productId) => {
  return await userDao.createLike(userId, productId);
};

module.exports = { createLike };
