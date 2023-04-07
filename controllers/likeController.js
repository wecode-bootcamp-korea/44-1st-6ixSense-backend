const likeService = require('../services/likeService');
const { catchAsync } = require('../utils/error');

const createLike = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const userId = await req.user.id;

  const likes = await likeService.createLike(userId, productId);
  return res.status(201).json({ message: 'Success Create' });
});

const deleteLike = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const userId = await req.user.id;
  await likeService.deleteLike(userId, productId);
  return res.status(200).json({ message: 'Success Delete' });
});

module.exports = {
  createLike,
  deleteLike,
};
