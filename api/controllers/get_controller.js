const db_comms = require('./../db_comms/db_comms.js');

module.exports = (() => {

    function handleRequest(req, res) {
        console.log('GET at url: ' + req.url);
        switch (String(req.url)) {
            case "/api/reports":
                getReportsFromDB(res);
                break;
            case "/api/users":
                getUsersFromDB(res);
                break;
        }
    }

    function getReportsFromDB(res) {
        let report1 = {
            title: 'Zgomot de la muncitori',
            description: 'Dau nebunii aia cu picamaru de-mi sparg urechile boss',
            id_user: 1,
            id_location: 1,
            report_type: 5,
            report_date: '2018-06-15'
        };
        var reports = [report1];

        let getResponse = {
            "success": "true",
            "reports": reports
        };

        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.write(JSON.stringify(getResponse));
        res.end();
    }

    function getUsersFromDB(res) {
        var users = db_comms.get_users().then(rows => {
                res.writeHead(200, {
                    "Content-Type": "application/json"
                });
                console.log(rows);
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