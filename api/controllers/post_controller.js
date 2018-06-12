const db_comms = require('./../db_comms/db_comms.js');
const {
    getNowTime,
    createExpireTime
} = require('./../db_comms/db_utils.js');
const {
    Report
} = require('./../models/report.js');
const {
    ReportPic
} = require('./../models/reportpic.js');

const {
    User
} = require('./../models/user');
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
const url = require('url');

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
            case "/register":
                register(req, res);
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
        let url_parts = url.parse(req.url, true);
        let query = url_parts.query;

        console.log('token: ' + query.token);

        console.log('processing: ' + req.url);

        db_comms.get(tables.token, {
                token: query.token,
            }).then((rows) => {
                info['id_user'] = String(rows[0].id_user);
                new formidable.IncomingForm().parse(req)
                    .on('file', (name, file) => {
                        images.push(file);
                    })
                    .on('field', (name, field) => {
                        info[name] = field;
                    })
                    .on('error', (err) => {
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
            })
            .catch(() => {
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

    function saveReportToDB(images, info) {
        return new Promise((resolve, reject) => {
            let report = new Report(info);
            report.report_date = getNowTime();

            report.save().then((newReport) => {
                    console.log(newReport);
                    saveReportImages(images, newReport).then(() => {
                            resolve(newReport);
                        })
                        .catch((err) => {
                            console.log(err);
                            reject(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                    reject();
                });
        });
    }

    function saveReportImages(images, newReport) {
        console.log(images.length + ' poze');
        let saveDir = './uploads/' + newReport.id + '/';
        if (!fs.existsSync(saveDir)) {
            fs.mkdirSync(saveDir);
        }

        console.log(saveDir);
        return new Promise((resolve, reject) => {
            if (images.length === 0)
                resolve();

            let solved = 0;

            images.forEach((image, index, array) => {
                let rd = fs.createReadStream(image.path);
                let wr = fs.createWriteStream(saveDir + index + '_' + image.name);
                rd.on('error', () => {
                    //TREBUIE sterse imaginile
                    console.log('error');
                    reject();
                });
                wr.on('error', () => {
                    console.log('err wr');
                    reject();
                });
                rd.pipe(wr);

                let picInfo = {
                    "id_report": newReport.id,
                    "pic_link": saveDir + index + '_' + image.name
                };
                let bdImage = new ReportPic(picInfo);
                bdImage.save().then((newImage) => {
                    console.log(bdImage);
                });

                // rd.destroy();
                // wr.end();

                solved++;
                if (solved == array.length)
                    resolve();
            });
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
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    });
                    let postResponse = {
                        "success": true,
                        "token": token.token,
                        "self": result[0]
                    };
                    res.write(JSON.stringify(postResponse));
                    res.end();
                } else {
                    res.writeHead(400, {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    });
                    let postResponse = {
                        "success": false,
                        "token": null
                    };
                    res.write(JSON.stringify(postResponse));
                    res.end();
                }
            })



        });

    }

    function register(req, res) {
        getBodyFromRequest(req).then((body) => {
            console.log(body);

            let user = new User(body);

            user.update({
                join_date: getNowTime(),
                avatar_link: ""
            });
            user.save().then((result) => {
                    console.log('User added: ');
                    console.log(result);

                    if (result) {
                        let token = new Token({
                            id_user: result.id,
                            expire: createExpireTime()
                        });
                        token.save();
                        res.writeHead(200, {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        });
                        let postResponse = {
                            "success": true,
                            "token": token.token,
                            "self": user
                        };
                        res.write(JSON.stringify(postResponse));
                        res.end();
                    } else {
                        res.writeHead(400, {
                            "Content-Type": "application/json",
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
                .catch(() => {
                    res.writeHead(400, {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    });
                    let postResponse = {
                        "success": false,
                        "token": null
                    }
                    res.write(JSON.stringify(postResponse));
                    res.end();
                });
        });
    }

    return {
        handleRequest
    }
})();