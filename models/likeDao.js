const appDataSource = require('./appDataSource');

const createLike = async (userId, productId) => {
  try {
    const createLike = await appDataSource.query(
      `INSERT INTO likes(
            user_id,
            product_id
        )  VALUES`,
      [userId, productId]
    );
    return createLike;
  } catch (err) {
    const error = new Error('appDataSource_Error');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = { createLike };
