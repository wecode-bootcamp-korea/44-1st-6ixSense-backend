const appDataSource = require('./appDataSource');

const getProductList = async (categoryId, sort, limit, offset) => {
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
        products.id as productId,
        products.name as productName,
        products.price as productPrice,
        products.description as productDesc,
        products.discount_rate as procuctDiscountRate, 
        products.category_id as productCategoryId,
        categories.name as categoryName,
        categories.id as categoryId,
        incenses.id as incenseId,
        incenses.name as incenseName,
        JSON_ARRAYAGG(
          product_images.image_url) as productImage,
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
    return productList;
  } catch (err) {
    const error = new Error('INVALID_DATA_SELECT');
    error.statusCode = 400;
    throw error;
  }
};

const getProduct = async (productId) => {
  try {
    return await appDataSource.query(
      `SELECT
        products.id, 
        products.name,
        products.price,
        products.description,
        products.stock,
        JSON_ARRAYAGG(
          products.detail_image
        ) AS detailImage,
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
    const error = new Error('appDataSource error');
    error.statusCode = 400;
    throw error;
  }
};

const checkProductId = async (productId) => {
  try {
    const [result] = await appDataSource.query(
      `SELECT EXISTS
      (SELECT
              id
              FROM products
              WHERE id = ?) as isProduct`,
      [productId]
    );
    return !!parseInt(result.isProduct);
  } catch (err) {
    const error = new Error('appDataSource error');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  getProductList,
  getProduct,
  checkProductId,
};
