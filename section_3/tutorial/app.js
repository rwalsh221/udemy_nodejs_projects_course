// section 3: lesson 24
const http = require('http');

const server = http.createServer((req, res) => {
  //   console.log(req);
  if (req.url === '/') {
    res.write('<h1>');
    res.write('HELLO FROM THE SERVER');
    res.write('</h1>');
    res.end();
  } else if (req.url === '/about') {
    res.write('<h1>');
    res.write('HELLO FROM THE ABOUT ROUTE');
    res.write('</h1>');
    res.end();
  } else {
    res.write('<h1>');
    res.write(`Ooops`);
    res.write('</h1>');
    res.write('<p>');
    res.write('page not found');
    res.write('</p>');
    res.write('<a href="/">');
    res.write('back home');
    res.write('</a>');
    res.end();
  }
});

server.listen(5000);
