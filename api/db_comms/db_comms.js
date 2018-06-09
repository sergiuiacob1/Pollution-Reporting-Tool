const tables = require('../models/tables');
const {User} = require ('../models/user');
const {con} = require('./connection')

module.exports = (() => {
    'use strict';

    const get_users = () => {
        return new Promise((resolve, reject) => {

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

    const get  = (table,tuple) =>{
        return new Promise((resolve,reject) => {
            con.connect(function (err) {
                if (err)
                    reject(err);
            });
            switch (table) {
                case tables.user :
                    console.log('Querry : ' + "select * from " + tables.user);
                    con.query("select * from " + tables.user, function (err, result, fields) {
                        if (err)
                           reject(err);
                        let gicu = new User(result);
                        console.log(gicu);
                        resolve(result);
                    });

            }
        })
    };

    return {
        get
    }
})();