const appDataSource = require('./appDataSource');

const likes = async (userId, productId) => {
  try {
    return appDataSource.query(
      `INSERT INTO likes (
        user_id,
        product_id
      ) VALUES(?,?)`,
      [userId, productId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  likes,
};
