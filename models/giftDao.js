const appDataSource = require('./appDataSource');

const giftProduct = async () => {
  `CASE
  WHEN products.discount_rate > 0 THEN products.price * (1 - products.discount_rate)
  ELSE products.price
  END AS discounted_price
  `,
    (module.exports = {
      giftProduct,
    });
};
