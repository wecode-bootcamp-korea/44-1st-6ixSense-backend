const appDataSource = require('./appDataSource');
const { CustomError } = require('../utils/error');

const getUserByAccount = async (account) => {
  try {
    const [result] = await appDataSource.query(
      `SELECT 
      id,
      name,
      account,
      password,
      phone_number,
      birthday,
      gender,
      point
      FROM users WHERE account = ?`,
      [account]
    );
    return result;
  } catch (err) {
    throw new CustomError(400, 'dataSource_Error');
  }
};

const getUserById = async (userId) => {
  try {
    const [result] = await appDataSource.query(
      `SELECT 
      id,
      name,
      account,
      password,
      phone_number as phoneNumber,
      birthday,
      gender,
      point as userPoint
      FROM users WHERE id = ?`,
      [userId]
    );
    return result;
  } catch (err) {
    throw new CustomError(400, 'dataSource_Error');
  }
};

const createUser = async (name, account, hashedPassword, phoneNumber, birthday, gender) => {
  try {
    return await appDataSource.query(
      `INSERT INTO users(
            name,
            account,
            password,
            phone_number, 
            birthday,
            gender
        ) VALUES (?,?,?,?,?,?)`,
      [name, account, hashedPassword, phoneNumber, birthday, gender]
    );
  } catch (err) {
    throw new CustomError(400, 'dataSource_Error');
  }
};

module.exports = { getUserByAccount, getUserById, createUser };
