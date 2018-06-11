const db_comms = require('./../db_comms/db_comms.js');
const {
    getNowTime,
    createExpireTime
} = require('./../db_comms/db_utils.js');
const {
    Report
} = require('./../models/report.js');
const {Token} = require('../models/token');
const {
    Location
} = require('./../models/location.js');
var bodyParser = require('body-parser');
var tables = require('../models/tables');
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
            case "/authenticate":
                authenticate(req,res);
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
        getBodyFromRequest(req).then(function (body) {
            let report = new Report(body);
            report.report_date = getNowTime();
            report.id_user = 1;
            console.log(report);
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
                // let postResponse = {
                //     "success": false
                // }
    
                // res.write(JSON.stringify(postResponse));
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

    function authenticate (req,res) {
        console.log('Trying to authenticate :');
        getBodyFromRequest(req).then((body) => {
            console.log(body);
            db_comms.get(tables.user,{email:body.email,password:body.password}).then((result) => {
                console.log('User:' + result);
                if (result[0] != null)
                {
                    let token = new Token({id_user:result[0].id,expire:createExpireTime()});
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
                }
                else {
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