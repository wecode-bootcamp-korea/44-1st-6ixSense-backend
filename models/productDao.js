const appDataSource = require('./appDataSource');

const productListOther = async (first, last) => {
  try {
    const productListOther = await appDataSource.query(
      `SELECT
      products.name as productName,
      products.price,
      products.description,
      products.discount_rate as discountRate, 
      products.category_id as categoryId,
      categories.name,
      categories.id
      FROM categories
      JOIN products ON categories.id = products.category_id
      JOIN product_images ON products.id = product_images.product_id
      LIMIT ?, ?
      `,
      [first, last]
    );
    return productListOther;
  } catch (err) {
    console.log(err);
    const error = new Error('INVALID_DATA_SELECT');
    error.statusCode = 400;
    throw error;
  }
};

const productList = async (categoryId, first, last) => {
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
      JSON_ARRAYAGG(
      product_images.image_url) as productImage,
      product_images.product_id as productId,
      CASE
      WHEN products.discount_rate > 0
      THEN products.price * (1 - products.discount_rate)
      ELSE products.price END AS discountedPrice
      FROM categories
      JOIN products ON categories.id = products.category_id
      JOIN product_images ON products.id = product_images.product_id
      WHERE categories.id IN (?) 
      GROUP BY products.id
      LIMIT ?, ?
      `,
      [categoryId, first, last]
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
  productListOther,
};
