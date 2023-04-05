const userService = require('../services/userService');
const { catchAsync, baseError } = require('../utils/error');

const signIn = catchAsync(async (req, res) => {
  const { account, password } = req.body;

  if (!account || !password) {
    throw new baseError('KEY_ERROR', 400);
  }

  const accessToken = await userService.signIn(account, password);

  return res.status(200).json({ accessToken: accessToken });
});

module.exports = {
  signIn,
};
