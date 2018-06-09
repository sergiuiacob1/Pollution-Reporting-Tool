const http = require('http');
const server = http.createServer().listen(3000);
const getController = require('./controllers/get_controller.js');
const postController = require('./controllers/post_controller.js');
const requestValidator = require('./controllers/request_validator.js');

server.on('request', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
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