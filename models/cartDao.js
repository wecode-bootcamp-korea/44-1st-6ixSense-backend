const appDataSource = require('./appDataSource');

const getCartByUserId = async (userId) => {
  try {
    console.log(userId);
    const result = await appDataSource.query(
      `SELECT 
      carts.product_id as productId,
      products.name as productName,
      products.price as productPrice,
      products.discount_rate as procuctDiscountRate,
      carts.quantity as productQuantity,
         carts.user_id as userId,
      CASE
          WHEN products.discount_rate > 0
          THEN products.price * (1 - products.discount_rate)
          ELSE products.price END AS discountedPrice,
      images.productImages as productimages
  FROM carts
  JOIN products ON products.id = carts.product_id
  JOIN (
      SELECT 
          product_id,
          JSON_ARRAYAGG(image_url) as productImages
      FROM product_images
      GROUP BY product_id
  ) as images ON images.product_id = carts.product_id 
  WHERE carts.user_id = ?`,
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
