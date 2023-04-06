const appDataSource = require('./appDataSource');

const getCartByUserId = async (userId) => {
  try {
    const result = await appDataSource.query(
      `SELECT 
            products.name as productName,
            products.price as productPrice,
            products.discount_rate  as discountRate,
        CASE
            WHEN products.discount_rate > 0
            THEN products.price * (1 - products.discount_rate)
            ELSE products.price END AS discountedPrice,
            product_images.image_url
        FROM carts 
        JOIN products  ON carts.product_id  = products.id
        JOIN product_images ON product_images.product_id = products.id
        WHERE carts.user_id  = ?`,
      [userId]
    );
    return result;
  } catch (err) {
    const error = new Error('INVALID_DATA_SELECT');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = { getCartByUserId };
