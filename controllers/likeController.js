const likeService = require('../services/likeService');
const { catchAsync, CustomError } = require('../utils/error');

const createLike = catchAsync(async (req, res) => {
  const { productId } = req.body;
  const userId = await req.user.id;

  if (!productId) throw new CustomError(400, 'KEY_ERROR');

  await likeService.createLike(userId, productId);

  return res.status(201).json({ message: 'Success Create' });
});

const deleteLike = catchAsync(async (req, res) => {
  const { productId } = req.query;
  const userId = await req.user.id;

  if (!productId) throw new CustomError(400, 'KEY_ERROR');

  await likeService.deleteLike(userId, productId);

  return res.status(200).json({ message: 'Success Delete' });
});

module.exports = {
  createLike,
  deleteLike,
};
