const appDataSource = require('./appDataSource');

const productList = async (categoryId) => {
  try {
    const productList = await appDataSource.query(
      `SELECT
      products.name as productName,
      products.price,
      products.description,
      products.discount_rate as discountRate, 
      products.category_id as categoryId,
      categories.name,
      categories.id,
      product_images.image_url as imageUrl,
      product_images.product_id as productId,
      CASE
      WHEN products.discount_rate > 0
      THEN products.price * (1 - products.discount_rate)
      ELSE products.price END AS discountedPrice
      FROM categories
      JOIN products ON categories.id = products.category_id
      JOIN product_images ON products.id = product_images.product_id
      WHERE categories.id IN (?) 
      `,
      [categoryId]
    );
    return productList;
  } catch (err) {
    console.log(err);
    const error = new Error('INVALID_DATA_SELECT');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  productList,
};
