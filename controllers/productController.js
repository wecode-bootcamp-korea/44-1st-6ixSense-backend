const productService = require('../services/productServices');

const productList = async (req, res) => {
  try {
    const get = await productService.productList();
    return res.status(200).json({ get });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = {
  productList,
};
