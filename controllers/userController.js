const userService = require('../services/userService');
const { catchAsync } = require('../utils/error');

const signIn = catchAsync(async (req, res) => {
  const { account, password } = req.body;

  if (!account || !password) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const accessToken = await userService.signIn(account, password);

  return res.status(200).json({ accessToken: accessToken });
});

module.exports = {
  signIn,
};
