const userDao = require('../models/userDao');
const { baseError } = require('../utils/error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUserByAccount = async (account) => {
  return await userDao.getUserByAccount(account);
};

const signIn = async (account, password) => {
  const user = await userDao.getUserByAccount(account);
  if (!user) {
    throw new baseError('USER_NOT_VALID');
  }

  const checkHash = await bcrypt.compare(password, user.password);

  if (!checkHash) {
    throw new baseError('PASSWORD_NOT_MATCH', 401);
  }
  const payLoad = { account: account, id: user.id };
  const secretKey = process.env.SECRET_KEY;
  const accessToken = jwt.sign(payLoad, secretKey);
  return accessToken;
};

module.exports = { getUserByAccount, signIn };
