const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('home page');
    return;
  }
  if (req.url === '/about') {
    // BLOCKING CODE
    for (let i = 0; i < 1000; i++) {
      for (let j = 0; j < 1000; j++) {
        console.log(`${i} ${j}`);
      }
    }
    res.end('about page');
    return;
  }
  res.end('error page');
});

server.listen(5000, () => {
  console.log('server listening port 5000');
});
