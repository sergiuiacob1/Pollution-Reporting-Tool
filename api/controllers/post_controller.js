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
var formidable = require('formidable');
var path = require('path');


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
        getBodyFromRequest(req).then(function (body) {
            let location = new Location(body);
            location.save().then(function (newLocation) {
                res.writeHead(200, {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                });

                let postResponse = {
                    "success": true,
                    "id": newLocation.id,
                    "lat_coord": newLocation.lat_coord,
                    "long_coord": newLocation.long_coord
                }

                res.write(JSON.stringify(postResponse));
                res.end();
            }).catch(function (err) {
                console.log(err);

                res.writeHead(500, {
                    "Content-Type": "text/plain",
                    "Access-Control-Allow-Origin": "*"
                });
                let postResponse = {
                    "success": false
                }
                res.write(JSON.stringify(postResponse));
                res.end();
                return;
            });
        });
    }

    function saveReportToDB(req, res) {
        console.log('saving report');
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            console.log (fields);
            console.log (files);
            res.end();
          });

        // // specify that we want to allow the user to upload multiple files in a single request
        // form.multiples = true;

        // // store all uploads in the /uploads directory
        // form.uploadDir = path.join(__dirname, '/uploads');

        // // every time a file has been uploaded successfully,
        // // rename it to it's orignal name
        // form.on('file', function (field, file) {
        //     console.log('file');
        //     console.log(file);
        //     fs.rename(file.path, path.join(form.uploadDir, file.name));
        // });

        // form.on('data', function (chunk){
        //     console.log (chunk.toString());
        // });

        // // log any errors that occur
        // form.on('error', function (err) {
        //     console.log('An error has occured: \n' + err);
        // });

        // // once all the files have been uploaded, send a response to the client
        // form.on('end', function () {
        //     console.log('gata');
        //     res.end('success');
        // });

        // // parse the incoming request containing the form data
        // form.parse(req);

        return;



        getBodyFromRequest(req).then(function (body) {
            let report = new Report(body);
            report.report_date = getNowTime();
            report.id_user = 1;
            console.log(report.images);
            report.save().then(newReport => {
                res.writeHead(200, {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                });
                let postResponse = {
                    "success": true
                }

                res.write(JSON.stringify(postResponse));
                res.end();
            }).catch(err => {
                console.log(err);
                res.writeHead(400, {
                    "Content-Type": "text/plain",
                    "Access-Control-Allow-Origin": "*"
                });
                let postResponse = {
                    "success": false
                }

                res.write(JSON.stringify(postResponse));
                res.end();
            });
        }).catch(function (err) {
            console.log(err);
            res.writeHead(500, {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*"
            });
            let postResponse = {
                "success": false
            }

            res.write(JSON.stringify(postResponse));
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