const userDao = require('../models/userDao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUserByAccount = async (account) => {
  return await userDao.getUserByAccount(account);
};

const getUserById = async (userId) => {
  return await userDao.getUserById(userId);
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

const signUp = async (name, account, password, phoneNumber, birthday, gender) => {
  const accountRegex = /^[a-z0-9]{4,12}$/;
  const passwordRegex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

  if (!accountRegex.test(account)) {
    throw new baseError('ACCOUNT_NOT_VALID', 409);
  }

  if (!passwordRegex.test(password)) {
    const error = new Error('PASSWORD_NOT_VALID');
    error.statusCode = 400;
    throw error;
  }

  const saltRounds = 12;

  const makeHash = async (password, saltRounds) => {
    return await bcrypt.hash(password, saltRounds);
  };

  const hashedPassword = await makeHash(password, saltRounds);

  const createUser = await userDao.createUser(name, account, hashedPassword, phoneNumber, birthday, gender);

  return createUser;
};

module.exports = { getUserByAccount, getUserById, signIn, signUp };
