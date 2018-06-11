const db_comms = require('./../db_comms/db_comms.js');
const tables = require('../models/tables')
const {
    Token
} = require('./../models/token.js');
const url = require('url');



module.exports = (() => {

    const allowedUrl = ["/api/reports", "/api/users", "/api/locations", "/authenticate", "/register", "/api/image"];

    function validate(req) {
        return new Promise((resolve, reject) => {
            switch (req.method) {
                case "GET":
                    validateGetRequest(req).then(() => {
                            resolve();
                        })
                        .catch(() => {
                            reject();
                        });
                    break;
                case "POST":
                    validatePostRequest(req).then(() => {
                            resolve();
                        })
                        .catch(() => {
                            reject();
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

            if (i == allowedUrl.length)
                reject();
            else
                resolve();
        });
    }

    function validatePostRequest(req) {
        return new Promise((resolve, reject) => {
            let i;
            for (i = 0; i < allowedUrl.length; ++i)
                if (allowedUrl[i] === String(req.url).split('?')[0])
                    break;

            if (i == allowedUrl.length)
                reject();

            let url_parts = url.parse(req.url, true);
            let query = url_parts.query;

            console.log('validating: ' + query.token);

            db_comms.get(tables.token, {
                token: query.token
            }).then((rows) => {
                if (rows.length === 0)
                    reject();
                else
                    resolve();
            });
        });
    }

    return {
        validate
    }
})();