const likeDao = require('../models/likeDao');

const likes = async (userId, productId) => {
  return await likeDao.likes(userId, productId);
};

module.exports = {
  likes,
};
