const reviewDao = require('../models/reviewDao');

const reviews = async () => {
  return await reviewDao.reviews();
};

module.exports = {
  reviews,
};
