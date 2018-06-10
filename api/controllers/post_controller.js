const db_comms = require('./../db_comms/db_comms.js');
const {
    getNowTime
} = require('./../db_comms/db_utils.js');
const {
    Report
} = require('./../models/report.js');
const {
    Location
} = require('./../models/location.js');
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
            case "/api/locations":
                saveLocationToDB(req, res);
                break;
        }
    }

    function saveLocationToDB(req, res) {
        console.log ('saving location');
        getBodyFromRequest(req).then(function (body) {
            console.log (body);
            let location = new Location(body);
            location.save().then(function (newLocation) {
                res.writeHead(200, {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                });

                let postResponse = {
                    "id": newLocation.id,
                    "lat_coord": newLocation.lat_coord,
                    "long_coord": newLocation.long_coord
                }

                console.log(postResponse);

                res.write(JSON.stringify(postResponse));
                res.end();
            }).catch(function (err) {
                console.log(err);

                res.writeHead(500, {
                    "Content-Type": "text/plain]",
                    "Access-Control-Allow-Origin": "*"
                });
                res.write('Nu s-a putut adauga locatia');
                res.end();
                return;
            });
        });
    }

    function saveReportToDB(req, res) {
        getBodyFromRequest(req).then(function (body) {
            let report = new Report(body);
            console.log(report);
            report.report_date = getNowTime();
            report.id_user = 1;
            report.save();

            res.writeHead(200, {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*"
            });
            res.write("ok");
            res.end();
        }).catch(function (err) {
            console.log(err);

            res.writeHead(500, {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*"
            });
            res.write("something went wrong");
            res.end();
        });
    }

    function getBodyFromRequest(req) {
        return new Promise((resolve, reject) => {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // convert Buffer to string
            });

            req.on('end', () => {
                resolve(JSON.parse(body));
            });

            req.on('error', (err) => {
                reject(err)
            });
        });
    }

    function saveUserToDB(req, res) {

    }

    return {
        handleRequest
    }
})();