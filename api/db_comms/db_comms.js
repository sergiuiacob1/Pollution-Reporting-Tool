const mysql = require('mysql');

module.exports = (() => {
    'use strict';

    const get_users = () => {
        return new Promise((resolve, reject) => {
            var con = mysql.createConnection({
                host: "91.92.128.27",
                user: "remotePRT",
                password: "makeplacesbetter",
                database: "prt_db"
            });

            con.connect(function (err) {
                if (err)
                    reject(err);
            });

            con.query("SELECT * FROM users", function (err, result, fields) {
                if (err)
                    reject(err);

                resolve(result);
            });
        });
    };

    return {
        get_users
    }
})();