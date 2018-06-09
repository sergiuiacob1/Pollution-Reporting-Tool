const mysql = require('mysql');
    
exports.connect = function (req) {
	var con = mysql.createConnection({
	    host: "91.92.128.27",
	    user: "remotePRT",
	    password: "makeplacesbetter"
	});

	con.connect(function(err) {
	    if (err) throw err;
	    console.log("Connected!")
	    return {success:true, message:'Connected to database.'}
	});
};
