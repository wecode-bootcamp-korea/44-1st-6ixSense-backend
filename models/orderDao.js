const appDataSource = require('./appDataSource');
const queryRunner = appDataSource.createQueryRunner();

const createOrder = async (userId, statusId, totalPrice, cartId, productId, quantity) => {
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

    const [selectOrderInformationByUserId] = await queryRunner.query(
      `select 
      id as orderId,
      user_id as userId,
      order_number as orderNumber,
      status_id as statusId,
      total_price as totalPrice,
      created_at as createdTime
        from orders o
        where  o.user_id = ${userId}
        order by created_at desc
        limit 1`
    );

    const orderId = selectOrderInformationByUserId.orderId;

    const createOrderItems = await queryRunner.query(
      `INSERT INTO order_items (
          order_id,
          product_id,
          quantity)
          SELECT
                (SELECT id FROM orders WHERE orders.id = ${orderId}),
                product_id,
                quantity
          FROM carts
          WHERE carts.id IN (${cartId}) AND product_id IN (${productId}) `
    );

    const pointDeduction = await queryRunner.query(
      `UPDATE users 
              SET 
              users.point = users.point - ${totalPrice}
              WHERE users.id = ${userId} AND users.point > ${totalPrice}`
    );

    if (!pointDeduction.affectedRows) {
      const error = new Error('Not Enough Point');
      error.statusCode = 400;
      throw error;
    }

    const deleteCart = await queryRunner.query(`DELETE FROM carts WHERE user_id = ${userId} AND id IN (${cartId})`);

    await queryRunner.commitTransaction();

    return { createOrderTable, selectOrderInformationByUserId, createOrderItems, pointDeduction, deleteCart };
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
