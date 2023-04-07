const appDataSource = require('./appDataSource');

const createLike = async (userId, productId) => {
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

const deleteLike = async (userId) => {
  try {
    return appDataSource.query(
      `DELETE FROM likes
      WHERE likes.user_id = ?`,
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
  createLike,
  deleteLike,
};
