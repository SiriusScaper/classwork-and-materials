const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet');


const server = http.createServer((req, res) => {

  // Function routes to html pages
  const readWrite = (file, contentType) => {
    fs.readFile(file, function(err, data) {
      res.writeHead(200, {'Content-Type': contentType});
      res.write(data);
      res.end();
  });
}


  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

  switch (page) {
    case '/':   
      readWrite('index.html', 'text/html');
      break;
    case '/otherpage':
      readWrite('otherpage.html', 'text/html');
      break;
    case '/otherotherpage':
      readWrite('otherotherpage.html', 'text/html');
      break;
    case '/api':
      let personName = 'unknown';
      let personOccupation = 'unknown'; 
      let personStatus = 'unknown';

      if(params['student']== 'leon'){
        personName = 'leon'
        personOccupation = 'Boss Man'
        personStatus = 'Baller'
      } 
      res.writeHead(200, {'Content-Type': 'application/json'});
          let  objToJson = {
            name: personName,
            status: personStatus, 
            currentOccupation: personOccupation
        }
        res.end(JSON.stringify(objToJson));
      break;
      case '/api2':
        let flipResult = Math.ceil(Math.random()*2) <= 1 ? "Heads" : "Tails"
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(flipResult)
          res.end();
        break;
    case '/css/style.css':
        fs.readFile('css/style.css', function(err, data) {
          res.write(data);
          res.end();
        });
      break;
    case '/js/main.js':
      readWrite('js/main.js', 'text/javascript')
      break;
      default: 
      figlet('404!!', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        res.write(data);
        res.end();
      });
      break;
  }
 });

server.listen(8000);
