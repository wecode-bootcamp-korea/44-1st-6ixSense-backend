const userService = require('../services/userService');
const { catchAsync, CustomError } = require('../utils/error');

const signUp = catchAsync(async (req, res) => {
  const { name, account, password, phoneNumber, birthday, gender } = req.body;

  if (!name || !account || !password || !phoneNumber || !birthday || !gender) throw new CustomError(400, 'KEY_ERROR');

  await userService.signUp(name, account, password, phoneNumber, birthday, gender);

  return res.status(201).json({ message: 'ACCOUNT_SUCCESS' });
});

const signIn = catchAsync(async (req, res) => {
  const { account, password } = req.body;

  if (!account || !password) throw new CustomError(400, 'KEY_ERROR');

  const accessToken = await userService.signIn(account, password);

  return res.status(200).json({ token: accessToken });
});

const getUserById = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const userInfo = await userService.getUserById(userId);
  return res.status(200).json(userInfo);
});

module.exports = {
  signIn,
  signUp,
  getUserById,
};
