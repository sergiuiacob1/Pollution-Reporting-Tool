const db_comms = require('./../db_comms/db_comms.js');
const tables = require('../models/tables')
const {
    Token
} = require('./../models/token.js');
const url = require('url');



module.exports = (() => {

    const allowedUrl = ["/api/reports", "/api/users", "/api/locations", "/authenticate", "/register", "/api/image","/api/csvreports"];

    function validate(req) {
        return new Promise((resolve, reject) => {
            switch (req.method) {
                case "GET":
                    validateGetRequest(req).then(() => {
                            resolve();
                        })
                        .catch(() => {
                            reject(['Bad GET request', 400]);
                        });
                    break;
                case "POST":
                    validatePostRequest(req).then(() => {
                            resolve();
                        })
                        .catch((err) => {
                            reject(err);
                        });
                    break;
            }
        });
    }

    function validateGetRequest(req) {
        return new Promise((resolve, reject) => {
            let i;
            for (i = 0; i < allowedUrl.length; ++i)
                if (allowedUrl[i] === String(req.url).split('?')[0])
                    break;

            if (i === allowedUrl.length)
                reject();
            else
                resolve();
        });
    }

    function validatePostRequest(req) {
        return new Promise((resolve, reject) => {
            if (String(req.url).split('?')[0] === "/register") {
                resolve();
                console.log('am register, trec mai departe');
            }
            let i;
            for (i = 0; i < allowedUrl.length; ++i)
                if (allowedUrl[i] === String(req.url).split('?')[0])
                    break;

            if (i == allowedUrl.length)
                reject(['Bad POST request', 400]);

            let url_parts = url.parse(req.url, true);
            let query = url_parts.query;

            console.log('validating: ' + query.token);

            db_comms.get(tables.token, {
                token: query.token
            }).then((rows) => {
                console.log (rows[0]);
                if (rows.length === 0)
                    reject(['Please log in!', 403]);
                else
                    resolve();
            });
        });
    }

    return {
        validate
    }
})();