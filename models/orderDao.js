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



    console.log(selectOrderInformationByUserId.orderId);

    return selectOrderInformationByUserId;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = { createOrder };
