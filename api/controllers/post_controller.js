const db_comms = require('./../db_comms/db_comms.js');
var bodyParser = require('body-parser');

module.exports = (() => {
    function handleRequest(req, res) {
        console.log('POST at url: ' + req.url);
        switch (String(req.url).split('?')[0]) {
            case "/api/reports":
                saveReportToDB(req, res);
                break;
            case "/api/users":
                saveUserToDB(req, res);
                break;
        }
    }

    function saveReportToDB(req, res) {
        console.log (req.body);
        res.writeHead(200, {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*"
        });
        res.write("ok");
        res.end();
    }

    function saveUserToDB(req, res) {

    }

    return {
        handleRequest
    }
})();