const appDataSource = require('./appDataSource');

const insertCart = async (userId, productId, quantity) => {
  try {
    return await appDataSource.query(
      `INSERT INTO carts (user_id, product_id, quantity)
      SELECT ?, ?, ?
      FROM products
      WHERE EXISTS 
      (SELECT products.id FROM products WHERE  products.id  = ? LIMIT 1)   ;`,
      [userId, productId, quantity, productId]
    );
  } catch (err) {
    const error = new Error('APPDATASOURCE_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = { insertCart };
