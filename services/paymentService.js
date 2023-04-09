const paymentDao = require('../models/paymentDao');
const productDao = require('../models/productDao');

const payment = async (userId, productId) => {
  const product = await productDao.checkProudctId(productId);

  if (!product) {
    const error = new Error('Product_Does_Not_Exist');
    error.statusCoded = 404;
    throw error;
  }
  return await paymentDao.payment(userId, productId);
};

module.exports = {
  payment,
};
