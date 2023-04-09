const appDataSource = require('./appDataSource');

const orderLog = async (userId, statusId, totalPrice) => {
  try {
    return await appDataSource.query(
      `INSERT INTO orders (
        user_id,
        status_id,
        total_price
        ) VALUES (?, ?, ?)`,
      [userId, statusId, totalPrice]
    );
  } catch (err) {
    console.log(err);
    const error = new Error('Invalid Input Error');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  orderLog,
};
