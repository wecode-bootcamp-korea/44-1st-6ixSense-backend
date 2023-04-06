const paymentDao = require('../models/paymentDao');

const payment = async () => {
  return await paymentDao.payment();
};

module.exports = {
  payment,
};
