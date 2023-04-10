const appDataSource = require('./appDataSource');

const getCartByUserId = async (userId) => {
  try {
    const result = await appDataSource.query(
      `SELECT 
      carts.id as cartId,
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

const insertCart = async (userId, productId, quantity) => {
  try {
    const createCart = await appDataSource.query(
      `INSERT INTO carts (
        user_id,
        product_id,
        quantity
        ) SELECT ${userId},${productId},${quantity} 
      WHERE NOT EXISTS
      (SELECT product_id FROM carts WHERE user_id = ${userId} AND product_id =${productId}) `
    );

    const createCartAffectedRows = createCart.affectedRows;

    if (!createCartAffectedRows) {
      const updateQuantity = await appDataSource.query(
        `UPDATE carts
        SET quantity =  ${quantity}
        WHERE user_id = ${userId} AND
        product_id =${productId} `
      );
      return updateQuantity;
    }

    return createCart;
  } catch (err) {
    const error = new Error('dataSource_Error');
    error.statusCode = 400;
    throw error;
  }
};

const removeCart = async (userId, productId) => {
  try {
    const removeCart = await appDataSource.query(
      `DELETE FROM carts 
            WHERE user_id = ${userId} and product_id IN (${productId})`
    );

    return removeCart;
  } catch (err) {
    const error = new Error('DataSource_Error');
    error.statusCode = 400;
    throw error;
  }
};

const modifyCart = async (userId, productId, quantity) => {
  try {
    const updateCart = await appDataSource.query(
      `UPDATE carts  
          SET quantity = ${quantity}
          WHERE user_id = ${userId} and product_id  = ${productId}`
    );
    return updateCart;
  } catch (err) {
    const error = new Error('DataSource_Error');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  getCartByUserId,
  insertCart,
  removeCart,
  modifyCart,
};
