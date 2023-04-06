const appDataSource = require('./appDataSource');

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
    const error = new Error('dataSource_Error');
    error.statusCode = 400;
    throw error;
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
      phone_number,
      birthday,
      gender,
      point
      FROM users WHERE id = ?`,
      [userId]
    );
    return result;
  } catch (err) {
    const error = new Error('dataSource_Error');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = { getUserByAccount, getUserById };
