const appDataSource = require('./appDataSource');

const payment = async (userId, productId) => {
  try {
    return await appDataSource.query(
      `SELECT 
              users.id,
              users.name,
              users.point,
              users.phone_number AS phoneNumber,
              JSON_ARRAYAGG(
                JSON_OBJECT(
                  "cartId", carts.product_id,
                  "quantity", carts.quantity,
                  "productId", products.id,
                  "productName", products.name,
                  "productImagesId", product_images.id,
                  "productImage", product_images.image_url,
                  "discountPrice",
                  CASE
                      WHEN products.discount_rate > 0 THEN products.price * (1 - products.discount_rate)
                      ELSE products.price
                  END
                )
              ) AS productInformation
       FROM product_images
       INNER JOIN products ON product_images.product_id = products.id
       INNER JOIN carts ON products.id = carts.product_id
       INNER JOIN users ON carts.user_id = users.id
       WHERE users.id = ? AND products.id = ?
       GROUP BY users.id
              `,
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
  payment,
};
