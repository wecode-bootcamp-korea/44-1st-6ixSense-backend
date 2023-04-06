const likeDao = require('../models/likeDao');

const likes = async (userId, productId) => {
  return await likeDao.likes(userId, productId);
};

const likesCensel = async (userId) => {
  return await likeDao.likesCensel(userId);
};

module.exports = {
  likes,
  likesCensel,
};
