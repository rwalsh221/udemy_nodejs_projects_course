// section 3: lesson 47 - 48
const { createReadStream } = require('fs');
const { result } = require('lodash');
const { start } = require('repl');

const stream = createReadStream('../content/big.txt');

// stream.on('data', (result) => {
//   console.log(result);
// });

// default 64kb
// last buffer - remainder
// highWaterMark - control size
// const stream = createReadStream('./content/big.txt', {highWaterMArk:9000})
// const stream = createReadStream('./content/big.txt', {encoding: 'utf8'})

const stream2 = createReadStream('../content/big.txt', {
  highWaterMark: 90000,
  encoding: 'utf8',
});

console.log('stream2');

stream2.on('data', (result) => {
  console.log(result);
});

stream.on('error', (err) => {
  console.log(err);
});
