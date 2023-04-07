const likeService = require('../services/likeService');
const { catchAsync } = require('../utils/error');
const appDataSource = require('../models/appDataSource');

const createLike = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const userId = await req.user.id;

  const presence = await appDataSource.query(`SELECT products.id FROM products`);
  const aa = presence[0].id;
  const string = String(aa);

  if (productId === string) {
    await likeService.createLike(userId, productId);
    return res.status(201).json({ message: 'Success Create' });
  } else {
    return res.status(404).json({ message: '존재하지 않는 상품 입니다!' });
  }
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
