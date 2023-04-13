const appDataSource = require('./appDataSource');
const { CustomError } = require('../utils/error');

const getCartByUserId = async (userId) => {
  try {
    const result = await appDataSource.query(
      `SELECT 
      carts.id AS cartId,
      carts.product_id AS productId,
      products.name as productName,
      products.price as productPrice,
      products.discount_rate as productDiscount,
      carts.quantity as productQuantity,
      carts.user_id as userId,
      users.point as userPoint, 
      CASE
          WHEN products.discount_rate > 0
          THEN products.price * (1 - products.discount_rate)
          ELSE products.price END AS discountedPrice,
      images.productImages as productImage
  FROM carts
  JOIN products ON products.id = carts.product_id
   JOIN (
      SELECT 
          product_id,
          JSON_ARRAYAGG(image_url) as productImages
      FROM product_images
      GROUP BY product_id
  ) as images ON images.product_id = carts.product_id
  JOIN users ON carts.user_id = users.id 
  WHERE carts.user_id = ?`,
      [userId]
    );

    return result;
  } catch {
    throw new CustomError(400, 'dataSource_Error');
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
    throw new CustomError(400, 'dataSource_Error');
  }
};

const removeCart = async (userId, cartId) => {
  const queryRunner = appDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    await queryRunner.query(
      `DELETE FROM carts 
            WHERE user_id = ${userId} and id IN (${cartId})`
    );

    const result = await queryRunner.query(
      `SELECT 
      carts.id as cartId,
      carts.product_id as productId,
      products.name as productName,
      products.price as productPrice,
      products.discount_rate as productDiscountRate,
      carts.quantity as productQuantity,
      carts.user_id as userId,
      CASE
          WHEN products.discount_rate > 0
          THEN products.price * (1 - products.discount_rate)
          ELSE products.price END AS discountedPrice,
      images.productImages as productImage
  FROM carts
  JOIN products ON products.id = carts.product_id
   JOIN (
      SELECT 
          product_id,
          JSON_ARRAYAGG(image_url) as productImages
      FROM product_images
      GROUP BY product_id
  ) as images ON images.product_id = carts.product_id 
  WHERE carts.user_id = ${userId}`
    );

    await queryRunner.commitTransaction();

    return result;
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw new CustomError(400, 'dataSource_Error');
  } finally {
    await queryRunner.release();
  }
};

const modifyCart = async (userId, cartId, quantity) => {
  const queryRunner = appDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await queryRunner.query(
      `UPDATE carts  
          SET quantity = ${quantity}
          WHERE user_id = ${userId} and id  = ${cartId}`
    );

    const result = await queryRunner.query(
      `SELECT 
      carts.id as cartId,
      carts.product_id as productId,
      products.name as productName,
      products.price as productPrice,
      products.discount_rate as productDiscountRate,
      carts.quantity as productQuantity,
      carts.user_id as userId,
      CASE
          WHEN products.discount_rate > 0
          THEN products.price * (1 - products.discount_rate)
          ELSE products.price END AS discountedPrice,
      images.productImages as productImage
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

    await queryRunner.commitTransaction();

    return result;
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw new CustomError(400, 'dataSource_Error');
  } finally {
    await queryRunner.release();
  }
};

module.exports = {
  getCartByUserId,
  insertCart,
  removeCart,
  modifyCart,
};
