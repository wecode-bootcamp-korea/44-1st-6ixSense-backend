const userInformationDao = require('../models/userInformationDao');

const userInformation = async (userId) => {
  return await userInformationDao.userInformation(userId);
};

module.exports = {
  userInformation,
};
