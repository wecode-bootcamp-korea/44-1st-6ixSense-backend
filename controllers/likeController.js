const likeService = require('../services/likeService');
const { catchAsync } = require('../utils/error');

const likes = catchAsync(async (req, res) => {
  const { userId, productId } = req.body;

  const likes = await likeService.likes(userId, productId);
  return res.status(201).json({ likes });
});

module.exports = {
  likes,
};
