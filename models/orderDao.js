const appDataSource = require('./appDataSource');
const queryRunner = appDataSource.createQueryRunner();
const { CustomError } = require('../utils/error');

const createOrder = async (userId, statusId, totalPrice, cartId, cartItems) => {
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const createOrderTable = await queryRunner.query(
      `  INSERT INTO orders (
           user_id,
           status_id,
           total_price
           ) VALUES (?,?,?)
           `,
      [userId, statusId, totalPrice]
    );

    const orderId = createOrderTable.insertId;

    const orderItems = cartItems.map((cartItem) => [orderId, ...cartItem]);

    await queryRunner.query(
      `INSERT INTO order_items (
          order_id,
          product_id,
          quantity) VALUES ?`,
      [orderItems]
    );

    await queryRunner.query(
      `UPDATE users 
              SET 
              users.point = users.point - ${totalPrice}
              WHERE users.id = ${userId} AND users.point > ${totalPrice}`
    );

    await queryRunner.query(`DELETE 
              FROM carts  
              WHERE user_id = ${userId} AND id IN (${cartId})`);

    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw new CustomError(400, 'appDataSource error');
  } finally {
    await queryRunner.release();
  }
};
module.exports = {
  createOrder,
};
