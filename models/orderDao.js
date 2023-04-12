const appDataSource = require('./appDataSource');
const queryRunner = appDataSource.createQueryRunner();

const createOrder = async (userId, statusId, totalPrice, cartIds, cartItems) => {
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

    const orderId = createOrderTable.insertedId;
    const orderItems = cartItems.map((cartItem) => cartItem.unshift(orderId));

    await queryRunner.query(
      `INSERT INTO order_items (
          order_id,
          product_id,
          quantity
        ) VALUES ? 
      `,
      [orderItems]
    ); //[[46,1,5],[46,2,3]]

    await queryRunner.query(
      `UPDATE users 
       SET 
          users.point = users.point - ${totalPrice}
       WHERE users.id = ${userId} AND users.point > ${totalPrice}`
    );

    await queryRunner.query(`DELETE FROM carts WHERE user_id = ${userId} AND id IN (${cartIds})`);

    await queryRunner.commitTransaction();
  } catch (err) {
    console.log(err);
    await queryRunner.rollbackTransaction();
    const error = new Error('appDataSource error');
    error.statusCode = 400;
    throw error;
  } finally {
    await queryRunner.release();
  }
};
module.exports = {
  createOrder,
};
