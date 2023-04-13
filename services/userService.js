const userDao = require('../models/userDao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { CustomError } = require('../utils/error');

const getUserByAccount = async (account) => {
  return await userDao.getUserByAccount(account);
};

const getUserById = async (userId) => {
  return await userDao.getUserById(userId);
};

const signIn = async (account, password) => {
  const user = await userDao.getUserByAccount(account);

  if (!user) throw new CustomError(401, 'USER_NOT_VALID');

  const checkHash = await bcrypt.compare(password, user.password);

  if (!checkHash) throw new CustomError(401, 'USER_NOT_VALID');

  const payLoad = { id: user.id };
  const secretKey = process.env.SECRET_KEY;
  const accessToken = jwt.sign(payLoad, secretKey);

  return accessToken;
};

const signUp = async (name, account, password, phoneNumber, birthday, gender) => {
  const accountRegex = /^[a-z0-9]{4,12}$/;
  const passwordRegex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

  if (!accountRegex.test(account)) throw new CustomError(400, 'ACCOUNT_NOT_VALID');
  if (!passwordRegex.test(password)) throw new CustomError(400, 'PASSWORD_NOT_VALID');

  const saltRounds = 12;

  const makeHash = async (password, saltRounds) => {
    return await bcrypt.hash(password, saltRounds);
  };

  const hashedPassword = await makeHash(password, saltRounds);

  return await userDao.createUser(name, account, hashedPassword, phoneNumber, birthday, gender);
};

module.exports = { getUserByAccount, getUserById, signIn, signUp };
  