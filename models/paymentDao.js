const appDataSource = require('./appDataSource');

const payment = async (userId) => {
  try {
    return await appDataSource.query(
      `SELECT
            id,
            name,
            phone_number as phoneNumber
            FROM users WHERE id = ${userId}`,
      [userId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  payment,
};
