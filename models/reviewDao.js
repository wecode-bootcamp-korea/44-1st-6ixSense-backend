const appDataSource = require('./appDataSource');

const reviews = async () => {
  try {
    return appDataSource.query(
      `SELECT
              reviews.id,
              reviews.title,
              reviews.content,
              reviews.user_id AS userId,
              reviews.product_id AS productId,
              reviews.score
        FROM reviews`
    );
  } catch (err) {
    console.log(err);
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    return res.status(error.statusCode).json({ message: error.message });
  }
};

module.exports = {
  reviews,
};
