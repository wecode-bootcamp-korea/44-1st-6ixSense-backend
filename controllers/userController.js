const userService = require('../services/userService');
const { catchAsync, baseError } = require('../utils/error');

const signUp = catchAsync(async (req, res) => {
  const { name, account, password, phoneNumber, birthday, gender } = req.body;

  if (!name || !account || !password || !phoneNumber || !birthday || !gender) {
    throw new baseError('KEY_ERROR', 400);
  }

  const creteUser = await userService.signUp(name, account, password, phoneNumber, birthday, gender);

  return res.status(201).json({ message: 'ACCOUNT_SUCCESS' });
});

module.exports = {
  signUp,
};
