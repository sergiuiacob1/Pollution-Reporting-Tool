const mysql = require('mysql');
module.exports = (() => {

    const con = mysql.createConnection({
        host: "91.92.128.27",
        user: "remotePRT",
        password: "makeplacesbetter",
        database: "prt_db"
    });

    con.connect(function (err) {
        if (err)
            throw err;
    });

    return  {
        con
    }
})();