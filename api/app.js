const http = require('http');
const server = http.createServer().listen(3000);

server.on('request', (req, res) => {
    filterRequest(req, res);
});

function filterRequest(req, res) {
    if (req.method == "GET") {
        processGetRequest(req, res);
    }
    if (req.method == "POST") {
        processPostRequest(req, res);
    }
};

function processGetRequest(req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write ('primit get');
}

function processPostRequest(req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write ('primit post');
}