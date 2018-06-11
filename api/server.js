const http = require('http');
const server = http.createServer().listen(3000);
const getController = require('./controllers/get_controller.js');
const postController = require('./controllers/post_controller.js');
const requestValidator = require('./controllers/request_validator.js');

server.on('request', (req, res) => {
    filterRequest(req, res);
});

function filterRequest(req, res) {
    requestValidator.validate(req).then(() => {
            switch (req.method) {
                case "GET":
                    getController.handleRequest(req, res);
                    break;
                case "POST":
                    postController.handleRequest(req, res);
                    break;
            }
        })
        .catch(() => {
            res.writeHead(400, {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*"
            });
            res.write("Your request is bad baddity badytoo!");
            res.end();
            return;
        });

};