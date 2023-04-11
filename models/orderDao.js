const appDataSource = require('./appDataSource');

const createOrder = async (userId, statusId, totalPrice, ...params) => {
  try {
    const cartIds = params.map((item) => item.cartId);
    const minCartId = Math.min(...cartIds);
    const maxCartId = Math.max(...cartIds);

    const productIds = params.map((item) => item.productId);
    console.log(productIds);
    const createOrderTable = await appDataSource.query(
      `  INSERT INTO orders (
           user_id,
           status_id,
           total_price
           ) VALUES (${userId},${statusId},${totalPrice.totalPrice})
           `
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
    console.log(orderId);

    const createOrderItems = await appDataSource.query(
      `INSERT INTO order_items (order_id, product_id, quantity)
            SELECT
                (SELECT id FROM orders WHERE orders.id = ${orderId}),
                product_id,
                quantity
            FROM carts
            WHERE carts.id BETWEEN ${minCartId} AND ${maxCartId} and product_id in (${productIds}) `
    );

    console.log(createOrderItems);
    return createOrderItems;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = { createOrder };
