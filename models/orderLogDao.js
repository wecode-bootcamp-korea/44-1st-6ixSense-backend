const appDataSource = require('./appDataSource');

const orderLog = async (userId, orderNumber, statusId, totalPrice) => {
  try {
    return await appDataSource.query(
      `INSERT INTO orders (
        user_id,
        order_number,
        status_id,
        total_price
        ) VALUES (?, ?, ?, ?)`,
      [userId, orderNumber, statusId, totalPrice]
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
