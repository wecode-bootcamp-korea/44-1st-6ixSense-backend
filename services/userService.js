const userDao = require('../models/userDao');
const { baseError } = require('../utils/error');
const bcrypt = require('bcrypt');

const signUp = async (name, account, password, phoneNumber, birthday, gender) => {
  const accountRegex = /^[a-z0-9]{4,12}$/;
  const passwordRegex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

  if (!accountRegex.test(account)) {
    throw new baseError('ACCOUNT_NOT_VALID', 409);
  }

  if (!passwordRegex.test(password)) {
    throw new baseError('PASSWORD_NOT_VALID', 409);
  }

  const saltRounds = 12;

  const makeHash = async (password, saltRounds) => {
    return await bcrypt.hash(password, saltRounds);
  };

  const hashedPassword = await makeHash(password, saltRounds);

  const createUser = await userDao.createUser(name, account, hashedPassword, phoneNumber, birthday, gender);

  return createUser;
};

module.exports = {
  signUp,
};
