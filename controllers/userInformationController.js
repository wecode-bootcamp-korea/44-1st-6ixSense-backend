const userInformationService = require('../services/userService');
const { catchAsync } = require('../utils/error');

const userInformation = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const userInfo = await userInformationService.getUserById(userId);
  return res.status(200).json(userInfo);
});

module.exports = {
  userInformation,
};
