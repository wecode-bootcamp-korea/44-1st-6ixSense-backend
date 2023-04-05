const userDao = require('../models/userDao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUserByAccount = async (account) => {
  return await userDao.getUserByAccount(account);
};

const signIn = async (account, password) => {
  const user = await userDao.getUserByAccount(account);

  if (!user) {
    const error = new Error('USER_NOT_VALID');
    error.statusCode = 401;
    throw error;
  }

  const checkHash = await bcrypt.compare(password, user.password);

  if (!checkHash) {
    const error = new Error('USER_NOT_VALID');
    error.statusCode = 401;
    throw error;
  }
  const payLoad = { id: user.id };
  const secretKey = process.env.SECRET_KEY;
  const accessToken = jwt.sign(payLoad, secretKey);
  return accessToken;
};

module.exports = { getUserByAccount, signIn };
