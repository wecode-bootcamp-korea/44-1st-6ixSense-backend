const userService = require('../services/userService');
const { catchAsync, baseError } = require('../utils/error');

const signUp = catchAsync(async (req, res) => {
  const { name, account, password, phoneNumber, birthday, gender } = req.body;

  if (!name || !account || !password || !phoneNumber || !birthday || !gender) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const creteUser = await userService.signUp(name, account, password, phoneNumber, birthday, gender);

  return res.status(201).json({ message: 'ACCOUNT_SUCCESS' });
});

module.exports = {
  signUp,
};
