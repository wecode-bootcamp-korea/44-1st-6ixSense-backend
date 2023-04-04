const appDataSource = require('./appDataSource');

const productList = async () => {
  try {
    const productList = await appDataSource.query(
      `SELECT
      products.name,
      products.price

    
      
      
      `
    );
    return productList;
  } catch (err) {
    console.log(err);
    const error = new Error('INVALID_DATA_SELECT');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  productList,
};
