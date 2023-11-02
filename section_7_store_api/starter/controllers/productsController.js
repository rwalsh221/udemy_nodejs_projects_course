const ProductModel = require('../models/productModel');

const getAllProductsStatic = async (req, res) => {
  const products = await ProductModel.find({ price: { $gt: 100 } })
    .sort('price')
    .select('name price')
    .limit(10)
    .skip(0);
  res.status(200).json({ nbHits: products.length, data: products });
};

const getAllProducts = async (req, res) => {
  const querys = ['featured', 'name', 'company'];
  const { sort, fields, numericFilters } = req.query;
  const queryObject = {};

  // QUERYS
  querys.map((query) => {
    if (req.query[query]) {
      if (query === 'name') {
        queryObject[query] = { $regex: req.query[query], $options: 'i' };
      } else {
        queryObject[query] = req.query[query];
      }
    }
  });
  // console.log(req.query);
  if (numericFilters) {
    console.log(numericFilters);
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    console.log(filters);
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
      console.log(queryObject);
    });
  }

  // if (featured) {
  //   queryObject.featured = featured;
  // }
  // if (company) {
  //   queryObject.company = company;
  // }

  let result = ProductModel.find(queryObject);
  // console.log(result);
  // SORT
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result.sort('createdAt');
  }

  // SELECT
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ nbHits: products.length, data: products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
