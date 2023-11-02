const ProductModel = require('../models/productModel');

const getAllProductsStatic = async (req, res) => {
  const products = await ProductModel.find({}).sort('-name price');
  res.status(200).json({ nbHits: products.length, data: products });
};

const getAllProducts = async (req, res) => {
  const querys = ['featured', 'name', 'company'];
  const { featured, name, company, sort } = req.query;
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

  let result = ProductModel.find(queryObject);
  console.log(result);
  // let products;
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result.sort('createdAt');
  }
  const products = await result;
  res.status(200).json({ nbHits: products.length, data: products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
