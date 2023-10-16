setInterval(() => {
  console.log('hello world');
}, 2000);
console.log('i will run first');

// this will run second
for (let i = 0; i < 10000000000; i++) {
  if (i >= 9999999999) {
    console.log(i);
  }
}
// process stays alive unless
// kill process ctrl + c
// unexpected error
