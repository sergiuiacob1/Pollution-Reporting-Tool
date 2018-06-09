const mysql = require('mysql');

function connect () {
    var con = mysql.createConnection({
        host: "91.92.128.27",
        user: "remotePRT",
        password: "makeplacesbetter"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!")
        return con;
    });
}

module.exports = (() => {
    'use strict';

	const get_users = () => {
        var con = mysql.createConnection({
            host: "91.92.128.27",
            user: "remotePRT",
            password: "makeplacesbetter",
            database: "prt_db"
        });

        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!")
            return con;
        });

        con.query("SELECT * FROM users", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            return result;
        });
    };

	return {
		get_users
	}
})();

