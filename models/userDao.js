const appDataSource = require('./appDataSource');
const { baseError } = require('../utils/error');

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
    const error = new Error('dataSource Error');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = { getUserByAccount };
