const likeService = require('../services/likeService');
const { catchAsync } = require('../utils/error');

const likes = catchAsync(async (req, res) => {
  const { userId, productId } = req.body;

  const likes = await likeService.likes(userId, productId);
  return res.status(201).json({ message: 'Success Create' });
});

const likesCensel = catchAsync(async (req, res) => {
  const { userId } = req.params;

  await likeService.likesCensel(userId);
  return res.status(200).json({ message: 'Success Delete' });
});

module.exports = {
  likes,
  likesCensel,
};
