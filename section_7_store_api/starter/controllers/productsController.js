const ProductModel = require('../models/productModel');

const getAllProductsStatic = async (req, res) => {
  const products = await ProductModel.find({
    name: 'vase table',
  });
  res.status(200).json({ nbHits: products.length, data: products });
};

const getAllProducts = async (req, res) => {
  const querys = ['featured', 'name', 'company'];
  const { featured, name, company } = req.query;
  const queryObject = {};

  querys.map((query) => {
    if (req.query[query]) {
      if (query === 'name') {
        queryObject[query] = { $regex: req.query[query], $options: 'i' };
      } else {
        queryObject[query] = req.query[query];
      }
    }
  });

  // if (featured) {
  //   queryObject.featured = featured;
  // }
  // if (company) {
  //   queryObject.company = company;
  // }
  console.log(queryObject);
  const products = await ProductModel.find(queryObject);

  res.status(200).json({ nbHits: products.length, data: products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
