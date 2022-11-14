const http = require('http');
const fs = require('fs');
const path = require('path');


const server = http.createServer((req, res) => {
    console.log('Server request');
    console.log(req.url, req.method);

    res.setHeader('Conent-Type', 'text/plain');
    
    const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);

    let basePath = '';
    
    switch(req.url){
        case '/':
            basePath = createPath('index');
            res.statusCode = 200;
            break;
        case '/login':
            basePath = createPath('login');
            res.statusCode = 200;
            break;
        case '/login-old':
            res.statusCode = 301;
            res.setHeader('Location', '/login');
            res.end();
            break;
        default:
            basePath = createPath('error');
            res.statusCode = 404;
            break;
    }
    
    fs.readFile(basePath, (err, data) => {
        if (err) {
            console.log(err);
            res.statusCode = 500;
            res.end();
        }
        else {
            res.write(data);
            res.end();
        }
    })
    
});

server.listen(3000, 'localhost', (error) => {
    error ? console.log(error) : console.log('listening port 3000');
});