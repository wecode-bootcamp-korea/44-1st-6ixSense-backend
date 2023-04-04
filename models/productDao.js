const appDataSource = require('./appDataSource');

const productList = async (categoriesId) => {
  try {
    console.log(categoriesId);
    const productList = await appDataSource.query(
      `SELECT
      products.name as productName,
      products.price,
      products.description,
      products.discount_rate,
      products.category_id,
      categories.name,
      categories.id,
      product_images.image_url,
      product_images.product_id
      FROM categories
      JOIN products ON categories.id = products.category_id
      JOIN product_images ON products.id = product_images.product_id
      WHERE categories.id IN (?) 
      `,
      [categoriesId]
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
