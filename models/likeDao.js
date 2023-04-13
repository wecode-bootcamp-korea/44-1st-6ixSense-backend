const appDataSource = require('./appDataSource');
const { CustomError } = require('../utils/error');

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
    throw new CustomError(400, 'dataSource_Error');
  }
};

const deleteLike = async (userId, productId) => {
  try {
    return appDataSource.query(
      `DELETE FROM likes
      WHERE likes.user_id = ? AND likes.product_id = ?`,
      [userId, productId]
    );
  } catch (err) {
    throw new CustomError(400, 'dataSource_Error');
  }
};

module.exports = {
  createLike,
  deleteLike,
};
