const appDataSource = require('./appDataSource');

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
    const error = new Error('appDataSource_Error');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = { createUser };
