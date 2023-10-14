const os = require('os');

// info about current user
const user = os.userInfo();
// console.log(user);

// method returns the system uptime in seconds
console.log(`the system uptime is ${os.uptime} seconds`);

// methods for operating system info
const currentOS = {
  name: os.type(),
  release: os.release(),
  totelMem: os.totalmem(),
  freeMem: os.freemem(),
};

console.log(currentOS);
