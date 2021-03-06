const db_comms = require('./../db_comms/db_comms.js');
const tables = require('../models/tables');
var csvWriter = require('csv-write-stream');
const jsreport = require('jsreport');
const {
    ReportPic
} = require('./../models/reportpic.js');
const fs = require('fs');
const url = require('url');

module.exports = (() => {

    function handleRequest(req, res) {
        console.log('GET at url: ' + req.url);
        switch (String(req.url).split('?')[0]) {
            case "/api/reports":
                getReportsFromDB(res);
                break;
            case "/api/users":
                getUsersFromDB(res);
                break;
            case "/api/image":
                getImageFromDB(req, res);
                break;
            case "/api/csvreports":
                getCSVReports(req, res);
                break;
            case "/api/pdfreports":
                getPDFReports(req,res);

        }
    }

    function getImageFromDB(req, res) {
        console.log('IMAGE: ' + req.url);
        let imgPath = "";
        let url_parts = url.parse(req.url, true);
        let query = url_parts.query;

        db_comms.get(tables.reportpics, query).then((rows) => {
            if (rows.length > 0) {
                imgPath = rows[0].pic_link;
                let img = fs.readFileSync(imgPath);
                res.writeHead(200, {
                    "Content-Type": "image/jpeg",
                    "Access-Control-Allow-Origin": "*"
                });
                res.write(new Buffer(img, 'binary').toString('base64'));
                res.end();
            } else {
                res.writeHead(404, {
                    "Content-Type": "text/plain",
                    "Access-Control-Allow-Origin": "*"
                });
                res.write('image does not exist');
                res.end();
            }
        });
    }

    function getReportsFromDB(res) {
        db_comms.get(tables.report).then(rows => {
                buildReportsResponse(rows).then((reports) => {
                    let getResponse = new Object();
                    getResponse.success = "true";
                    getResponse.reports = reports;

                    res.writeHead(200, {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    });
                    res.write(JSON.stringify(getResponse));
                    res.end();
                    console.log('ended res at GET reports');
                });
            })
            .catch((err) => {
                console.log(err);
                res.writeHead(500, {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                });
                res.write(err);
                res.end();
            });
    }

    function buildReportsResponse(rows) {
        let reports = [];
        return new Promise((resolve, reject) => {
            if (rows.length === 0 || (typeof rows === "undefined"))
                resolve();

            for (let i = 0; i < rows.length; ++i) {
                reports.push(rows[i]);
                db_comms.get(tables.location, {
                    "id": rows[i].id_location
                }).then((location) => {
                    reports[i].location = new Object();
                    reports[i].location.lat_coord = location[0].lat_coord;
                    reports[i].location.long_coord = location[0].long_coord;

                    db_comms.get(tables.reportpics, {
                        id_report: reports[i].id
                    }).then((pics) => {
                        reports[i].images = [];
                        for (let j = 0; j < pics.length; ++j) {
                            reports[i].images.push(pics[j].id);
                        }

                        if (i == rows.length - 1)
                            resolve(reports);
                    });
                });
            }
        }).catch((err) => {
            reject(err)
        });
    }

    function getUsersFromDB(res) {
        var users = db_comms.get(tables.user, {
            id: 1
        }).then(rows => {
                res.writeHead(200, {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                });
                res.write(JSON.stringify(rows));
                res.end();
            },
            err => {
                console.log(err);
            });
    }

    function getCSVReports(req, res) {
        var writer = csvWriter({headers: ["title","description","id_user","id_location","report_type","report_date","id"]})
        writer.pipe(fs.createWriteStream('report.csv'))

        db_comms.get(tables.report).then((reports) => {
            res.writeHead(200, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            });
            console.log('Got for csv: ' + reports);

            let i=0;
            for(i=0;i<reports.length;i++)
            {
                writer.write(reports[i]);
            }
            writer.end();

            let retVal = {success:true};
            res.write(JSON.stringify(retVal));
            res.end();

        });
    }

    function getPDFReports (req,res) {


            db_comms.get(tables.report).then((reports) => {

                let object = "";
                for(let i=0;i<reports.length;i++){
                    let item = "<h1>" + reports[i].title + "</h1>";
                    item += "<h2>" + reports[i].report_date + "</h2>";
                    item += "<p>" + reports[i].description + "</p>";
                    item += "<hr><br>"
                    object += item;``
                }
                console.log(object);

                jsreport.render({
                    template: {
                        //content: '<h1>GreenIO Reports</h1>',
                        content: object,
                        engine: 'handlebars',
                        recipe: 'chrome-pdf'
                    },
                    data: {
                        name: "jsreport"
                    }
                }).then((resp) => {
                    // prints pdf with headline Hello world
                    console.log('Report generated PDF');
                    resp.stream.pipe(fs.createWriteStream('report.pdf'));

                        res.writeHead(200, {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        });
                        let retVal = {success:true};
                        res.write(JSON.stringify(retVal));
                        res.end();


                });
        }).catch((e) => {
            console.error(e)
        });
    }

    return {
        handleRequest
    }
})();