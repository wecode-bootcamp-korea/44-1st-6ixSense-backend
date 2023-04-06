const appDataSource = require('./appDataSource');

const productList = async (categoryId, sort, limit, offset) => {
  try {
    let whereCondition = '';

    if (categoryId) {
      whereCondition = `WHERE products.category_id IN (${categoryId})`;
    }
    const sortList = {
      priceInASC: 'products.price ASC',
      priceInDESC: 'products.price DESC',
    };
    const sortCondition = sortList[sort] || 'products.id';

    const productList = await appDataSource.query(
      `SELECT
        products.name as productName,
        products.price,
        products.description,
        products.discount_rate as discountRate, 
        products.category_id as categoryId,
        categories.name,
        categories.id,
        incenses.id,
        incenses.name,
        JSON_ARRAYAGG(
          product_images.image_url) as productImage,
          product_images.product_id as productId,
        CASE
          WHEN products.discount_rate > 0
          THEN products.price * (1 - products.discount_rate)
          ELSE products.price END AS discountedPrice
        FROM categories
        RIGHT JOIN products ON categories.id = products.category_id
        LEFT JOIN product_images ON products.id = product_images.product_id
        LEFT JOIN incenses ON products.incenses_id = incenses.id
        ${whereCondition}
        GROUP BY products.id
        ORDER BY ${sortCondition}
        LIMIT ? OFFSET ?
      `,
      [limit, offset]
    );
    console.log(productList);
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
