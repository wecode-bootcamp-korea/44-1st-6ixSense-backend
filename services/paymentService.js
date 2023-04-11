const paymentDao = require('../models/paymentDao');
const productDao = require('../models/productDao');

const payment = async (userId) => {
  return await paymentDao.payment(userId);
};

module.exports = {
  payment,
};
