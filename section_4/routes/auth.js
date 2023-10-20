const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`<h1>welcome ${name}</h1>`);
  }
  res.status(401).send('error');
});

module.exports = router;
