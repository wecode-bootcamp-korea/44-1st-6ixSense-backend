const appDataSource = require('./appDataSource');

const insertCart = async (userId, productId, quantity) => {
  try {
    const createCart = await appDataSource.query(
      `INSERT INTO carts (
        user_id,
        product_id,
        quantity
        ) SELECT ?,?,? 
      WHERE NOT EXISTS
      (SELECT product_id FROM carts WHERE product_id =${productId}) `,
      [userId, productId, quantity]
    );

    const createCartAffectedRows = createCart.affectedRows;

    if (!createCartAffectedRows) {
      const updateQuantity = await appDataSource.query(
        `UPDATE carts
        SET quantity = quantity + ${quantity}
        WHERE user_id = ${userId} AND
        product_id =${productId} `
      );
      return updateQuantity;
    }

    return createCart;
  } catch (err) {
    console.log(err);
    const error = new Error('APPDATASOURCE_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = { insertCart };
