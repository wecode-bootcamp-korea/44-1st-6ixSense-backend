const appDataSource = require('./appDataSource');

const productList = async (categoryId, sort, limit, offset) => {
  try {
    let whereCondition = '';

    if (categoryId) {
      whereCondition = `WHERE products.id IN (${categoryId})`;
    }

    const sortList = {
      priceASC: 'products.price ASC',
      priceDESC: 'prodcuts.price DESC',
    };
    const sortCondition = sortList[sort] || 'products.id';

    const productList = await appDataSource.query(
      `SELECT
        products.name as productName,
        products.price,
        products.description,
        products.discount_rate as discountRate,
        products.category_id as categoryId,
        categories.name,
        categories.id,
        JSON_ARRAYAGG(
          product_images.image_url
        ) as productImage,
        product_images.product_id as productId,
        CASE
          WHEN products.discount_rate > 0
          THEN products.price * (1 - products.discount_rate)
          ELSE products.price END AS discountedPrice
        FROM categories
        JOIN products ON categories.id = products.category_id
        JOIN product_images ON products.id = product_images.product_id
        ?
        ORDER BY ${sortCondition} 
        GROUP BY products.id
        LIMIT ? OFFSET ? 
      `,
      [whereCondition, limit, offset]
    );
    //page당 9개
    //limit랑 offset
    //1page - limit:9 , offset:0
    //2page - limit:9 , offset:9
    //3page - limit:9 , offset:18
    //4page - limit:9 , offset:27

    //limit랑 page
    //offset = (page - 1) * limit
    //1page - limit:9 , offset:0
    //2page - limit:9 , offset:9
    //3page - limit:9 , offset:18
    //4page - limit:9 , offset:27

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
  productListOther,
};
