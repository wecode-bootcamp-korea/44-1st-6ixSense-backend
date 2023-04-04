const appDataSource = require('./appDataSource');
const { baseError } = require('../utils/error');

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
    throw new baseError('appDataSource_Error', 400);
  }
};

module.exports = { createUser };
