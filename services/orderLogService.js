const orderLogDao = require('../models/orderLogDao');

const orderLog = async (userId, orderNumber, statusId, totalPrice) => {
  return await orderLogDao.orderLog(userId, orderNumber, statusId, totalPrice);
};

module.exports = {
  orderLog,
};
