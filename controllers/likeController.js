const likeService = require('../services/likeService');
const { catchAsync } = require('../utils/error');

const createLike = catchAsync(async (req, res) => {
  const { productId } = req.body;
  const userId = await req.user.id;

  if (!productId) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  await likeService.createLike(userId, productId);

  return res.status(201).json({ message: 'Success Create' });
});

const deleteLike = catchAsync(async (req, res) => {
  const { productId } = req.query;
  const userId = await req.user.id;

  await likeService.deleteLike(userId, productId);
  return res.status(200).json({ message: 'Success Delete' });
});

module.exports = {
  createLike,
  deleteLike,
};
