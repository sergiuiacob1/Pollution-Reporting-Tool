const http = require('http');
const server = http.createServer().listen(3000);
const db_comms = require ('./db_comms/db_comms.js');

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
    var users = db_comms.get_users();
    console.log(users);
    res.write ('got users');
}

function processPostRequest(req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write ('primit post');
}