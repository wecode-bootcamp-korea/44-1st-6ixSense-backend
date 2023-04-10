const appDataSource = require('./appDataSource');

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

module.exports = { insertCart };
