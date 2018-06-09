const http = require('http');
const server = http.createServer().listen(3000);
const db_comms = require ('./db_comms/db_comms.js');

server.on('request', (req, res) => {
    filterRequest(req, res);
});

function filterRequest(req, res) {
    switch (req.method) {
        case "GET":
            processGetRequest(req, res);
            break;
        case "POST":
            processPostRequest(req, res);
            break;
    }
};

function processGetRequest(req, res) {
    console.log('GET at url: ' + req.url);
    switch (req.url) {
        case "/api/reports":
            getReportsFromDB(res);
    }
}

function getReportsFromDB(res) {
    var reports = ["report1", "report2"];
    let getResponse = {
        "success": "true",
        "reports": reports
    }

    res.writeHead(200, {
        "Content-Type": "application/json"
    });
    res.write(JSON.stringify(getResponse));
    res.end();
}

function processPostRequest(req, res) {
    res.writeHead(200, {
        "Content-Type": "application/json"
    });
    res.write('primit get');
}