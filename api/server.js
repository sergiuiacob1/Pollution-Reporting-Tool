const http = require('http');
const server = http.createServer().listen(3000);
const getController = require('./controllers/get_controller.js');
const postController = require('./controllers/post_controller.js');
const requestValidator = require('./controllers/request_validator.js');

server.on('request', (req, res) => {
    filterRequest(req, res);
});

function filterRequest(req, res) {
    if (requestValidator.validate(req) === false) {
        res.writeHead(400, {
            "Content-Type": "text/plain"
        });
        res.write("Your request is bad baddity badytoo!");
        res.end();
    }
    switch (req.method) {
        case "GET":
            getController.handleRequest(req, res);
            break;
        case "POST":
            postController.handleRequest(req, res);
            break;
    }
};

function processGetRequest(req, res) {
    console.log('GET at url: ' + req.url);
    switch (req.url) {
        case "/api/reports":
            getReportsFromDB(res);
        case "/api/users":
            getUsersFromDB(res);
    }
}

function processPostRequest(req, res) {
    res.writeHead(200, {
        "Content-Type": "application/json"
    });
    res.write('primit post');
}