const express = require('express');
const app = express();
const { products } = require('./data');

app.get('/', (req, res) => {
  // console.log(res.json());
  res.json(products);
});

app.listen(5000, () => {
  console.log('server is lsitening on port 5000');
});
