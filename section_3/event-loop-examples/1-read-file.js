// section 3: lesson 37

const { readFile } = require('fs');

console.log('started first task');
// CHECK FILE PATH
readFile('../content/first.txt', 'utf-8', (err, results) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(results);
  console.log('completed first task');
});

console.log('starting next task');
