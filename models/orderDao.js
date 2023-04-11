const appDataSource = require('./appDataSource');

const createOrder = async (userId, statusId, totalPrice, cartId, productId, quantity) => {
  try {
    const createOrderTable = await appDataSource.query(
      `  INSERT INTO orders (
           user_id,
           status_id,
           total_price
           ) VALUES (?,?,?)
           `,
      [userId, statusId, totalPrice]
    );

    const [selectOrderInformationByUserId] = await appDataSource.query(
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

    const createOrderItems = await appDataSource.query(
      `INSERT INTO order_items (
          order_id,
          product_id,
          quantity)
          SELECT
                (SELECT id FROM orders WHERE orders.id = ${orderId}),
                product_id,
                quantity
          FROM carts
          WHERE carts.id IN (${cartId}) and product_id in (${productId})`
    );

    const pointsDeduction = await appDataSource.query(
      `UPDATE users 
              SET 
              users.point = users.point - ${totalPrice}
              WHERE users.id = ${userId} AND users.point > ${totalPrice}`,
      [totalPrice, userId]
    );

    const deleteCart = await appDataSource.query(`DELETE FROM carts WHERE user_id = ${userId}`, [userId]);

    return createOrderTable, selectOrderInformationByUserId, createOrderItems, pointsDeduction, deleteCart;
  } catch (err) {
    console.log(err);

    const error = new Error('appDataSource error');
    error.statusCode = 400;
    throw error;
  }
};
module.exports = {
  createOrder,
};
