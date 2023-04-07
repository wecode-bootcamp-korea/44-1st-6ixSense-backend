const appDataSource = require('./appDataSource');

const insertCart = async (userId, productId, quantity) => {
  try {
    return await appDataSource.query(
      `INSERT INTO carts 
      ( user_id, 
        product_id, 
        quantity )
       VALUES (?, ?, ?);`,
      [userId, productId, quantity]
    );
  } catch (err) {
    const error = new Error('APPDATASOURCE_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = { insertCart };
