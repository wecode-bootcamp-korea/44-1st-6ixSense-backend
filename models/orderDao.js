const appDataSource = require('./appDataSource');

const createOrder = async (userId, statusId, totalPrice, productId, quantity) => {
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

    const createOrderItems = await appDataSource.query(
      `INSERT INTO order_items
          order_id,
          product_id,
          quantity`,
      [selectOrderInformationByUserId.orderId, productId, quantity]
    );

    const pointsDeduction = await appDataSource.query(
      `UPDATE users 
              SET 
              users.point = users.point - ${totalPrice}
              WHERE users.id = ${userId} AND users.point > ${totalPrice}`,
      [totalPrice, userId]
    );
    console.log(selectOrderInformationByUserId);
    return createOrderTable, selectOrderInformationByUserId, createOrderItems, pointsDeduction;
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
