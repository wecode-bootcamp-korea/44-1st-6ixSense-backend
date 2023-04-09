const orderLogDao = require('../models/orderLogDao');
const productDao = require('../models/productDao');

const orderLog = async (userId, statusId, totalPrice) => {
  return await orderLogDao.orderLog(userId, statusId, totalPrice);
};

module.exports = {
  orderLog,
};
