const appDataSource = require('./appDataSource');
const { CustomError } = require('../utils/error');

const getProductList = async (categoryId, sort, limit, offset) => {
  try {
    let whereCondition = '';

    if (categoryId) {
      whereCondition = `WHERE products.category_id IN (${categoryId})`;
    }
    const sortList = {
      priceInASC: 'discountedPrice ASC',
      priceInDESC: 'discountedPrice DESC',
    };
    const sortCondition = sortList[sort] || 'products.id';

    const productList = await appDataSource.query(
      `SELECT
        products.id as productId,
        products.name as productName,
        products.price as productPrice,
        products.description as productDesc,
        products.discount_rate as productDiscountRate, 
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
    throw new CustomError(400, 'dataSource_Error');
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
          product_images.image_url
        ) AS productImage,
        products.discount_rate AS discountRate,
        CASE
          WHEN products.discount_rate > 0 THEN products.price * (1 - products.discount_rate)
          ELSE products.price
          END AS discountedPrice
        FROM products INNER JOIN product_images ON products.id = product_images.product_id
        WHERE products.id = ?
        GROUP BY products.id
        `,
      [productId]
    );
  } catch (err) {
    throw new CustomError(400, 'dataSource_Error');
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
    throw new CustomError(400, 'dataSource_Error');
  }
};

module.exports = {
  getProductList,
  getProduct,
  checkProductId,
};
