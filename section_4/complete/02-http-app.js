const http = require('http');
const { readFileSync } = require('fs');

// get all files
const homePage = readFileSync('./navbar-app/index.html');
const homeStyles = readFileSync('./navbar-app/styles.css');
const homeImg = readFileSync('./navbar-app/logo.svg');
const homeLogic = readFileSync('./navbar-app/browser-app.js');

const server = http.createServer((req, res) => {
  console.log(req.url);
  const url = req.url;
  // HOME PAGE
  if (url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(homePage);
    res.end();
  }
  // STYLES
  else if (url === '/styles.css') {
    res.writeHead(200, { 'content-type': 'text/css' });
    res.write(homeStyles);
    res.end();
  }
  // IMG
  else if (url === '/logo.svg') {
    res.writeHead(200, { 'content-type': 'image/svg+xml' });
    res.write(homeImg);
    res.end();
  }
  // LOGIC
  else if (url === '/browser-app.js') {
    res.writeHead(200, { 'content-type': 'text/javascript' });
    res.write(homeLogic);
    res.end();
  }
  // ABOUT PAGE
  else if (url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write('<h1>about page</h1>');
    res.end();
  }
  // 404 NOT FOUND
  else {
    res.writeHead(404, { 'content-type': 'text/html' });
    res.write('<h1>page not found</h1>');
    res.end();
  }
});

server.listen(5000);
