const db_comms = require('./../db_comms/db_comms.js');
const tables = require('../models/tables')
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
        }
    }

    function getReportsFromDB(res) {
        console.log('GET reports request');
        // let report1 = {
        //     title: 'Zgomot de la muncitori',
        //     description: 'Dau nebunii aia cu picamaru de-mi sparg urechile boss',
        //     id_user: "1",
        //     id_location: "1",
        //     report_type: "5",
        //     report_date: '2018-06-15'
        // };
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
        });
    }

    function buildReportsResponse(rows) {
        let reports = [];
        return new Promise((resolve, reject) => {
            for (let i = 0; i < rows.length; ++i) {
                reports.push(rows[i]);
                db_comms.get(tables.location, {
                    "id": rows[i].id_location
                }).then((location) => {
                    reports[i].location = new Object();
                    reports[i].location.lat_coord = location[0].lat_coord;
                    reports[i].location.long_coord = location[0].long_coord;

                    db_comms.get(tables.reportpics, {
                        "id": reports[i].id
                    }).then( (pics) => {
                        console.log ('images: ');
                        console.log (pics);
                    });

                    if (i == rows.length - 1)
                        resolve (reports);
                });
            }

            //resolve(reports);
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
                console.log('Got: ' + rows);
                res.write(JSON.stringify(rows));
                res.end();
            },
            err => {
                console.log(err);
            });
    }

    return {
        handleRequest
    }
})();