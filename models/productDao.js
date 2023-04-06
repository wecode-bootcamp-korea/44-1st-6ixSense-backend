const appDataSource = require('./appDataSource');

const getProduct = async (productId) => {
  try {
    return await appDataSource.query(
      `SELECT
            products.id, 
            products.name,
            products.price,
            products.description,
            products.stock,
            products.detail_image AS detailImage,
            products.discount_rate AS discountRate,
            
            CASE
                WHEN products.discount_rate > 0 THEN products.price * (1 - products.discount_rate)
                ELSE products.price
            END AS discountedPrice
      FROM products
      WHERE products.id = ?
              `,
      [productId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error('appDataSource error');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  getProduct,
};