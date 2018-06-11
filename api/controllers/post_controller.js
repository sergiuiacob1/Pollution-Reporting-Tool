const db_comms = require('./../db_comms/db_comms.js');
const {
    getNowTime,
    createExpireTime
} = require('./../db_comms/db_utils.js');
const {
    Report
} = require('./../models/report.js');
const {
    Token
} = require('../models/token');
const {
    Location
} = require('./../models/location.js');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var path = require('path');
var tables = require('../models/tables');
var fs = require('fs');

module.exports = (() => {
    function handleRequest(req, res) {
        console.log('POST at url: ' + req.url);
        switch (String(req.url).split('?')[0]) {
            case "/api/reports":
                processPostReport(req, res);
                break;
            case "/api/users":
                saveUserToDB(req, res);
                break;
            case "/api/locations":
                saveLocationToDB(req, res);
                break;
            case "/authenticate":
                authenticate(req, res);
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

    function processPostReport(req, res) {
        let images = [];
        let info = new Object();

        new formidable.IncomingForm().parse(req)
            .on('file', (name, file) => {
                images.push(file);
            })
            .on('field', (name, field) => {
                info[name] = field;
            })
            .on('error', function (err) {
                next(err);
            })
            .on('end', () => {
                saveReportToDB(images, info).then(() => {
                        res.writeHead(200, {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        });
                        let postResponse = {
                            "success": true
                        }

                        res.write(JSON.stringify(postResponse));
                        res.end();
                    })
                    .catch((err) => {
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
            });
    }

    function saveReportToDB(images, info) {
        return new Promise((resolve, reject) => {
            let report = new Report(info);
            report.report_date = getNowTime();
            report.id_user = 1;

            report.save().then((newReport) => {
                    console.log(newReport);
                    saveReportImages(images, newReport).then(() => {
                            resolve(newReport);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }

    function saveReportImages(images, newReport) {
        let saveDir = './uploads/' + newReport.id;
        return new Promise((resolve, reject) => {
            for (let i = 0; i < images.length; ++i) {
                fs.createReadStream(images[i].path).pipe(fs.createWriteStream(saveDir + images[i].name));
            }
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

    function authenticate(req, res) {
        console.log('Trying to authenticate :');
        getBodyFromRequest(req).then((body) => {
            console.log(body);
            db_comms.get(tables.user, {
                email: body.email,
                password: body.password
            }).then((result) => {
                console.log('User:' + result);
                if (result[0] != null) {
                    let token = new Token({
                        id_user: result[0].id,
                        expire: createExpireTime()
                    });
                    token.save();
                    res.writeHead(200, {
                        "Content-Type": "text/plain",
                        "Access-Control-Allow-Origin": "*"
                    });
                    let postResponse = {
                        "success": true,
                        "token": token.token
                    }
                    res.write(JSON.stringify(postResponse));
                    res.end();
                } else {
                    res.writeHead(400, {
                        "Content-Type": "text/plain",
                        "Access-Control-Allow-Origin": "*"
                    });
                    let postResponse = {
                        "success": false,
                        "token": null
                    }
                    res.write(JSON.stringify(postResponse));
                    res.end();
                }
            })



        });

    }

    return {
        handleRequest
    }
})();