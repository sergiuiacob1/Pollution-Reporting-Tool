const mysql = require('mysql');

module.exports = {
    connect: function () {
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

    get_users: function () {
    var con = module.exports.connect();
    con.query("SELECT * FROM customers", function (err, result, fields) {
	    if (err) throw err;
	    console.log(result);
	    return result;
        });
    }
}
