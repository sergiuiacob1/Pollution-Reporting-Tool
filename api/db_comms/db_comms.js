const tables = require('../models/tables');
const {User} = require ('../models/user');
const {con} = require('./connection')

module.exports = (() => {
    'use strict';

    const get  = (table,tuple) => {
        return new Promise((resolve,reject) => {
            switch (table) {
                case tables.user :
                    let whereClause = "";
                    let conditions = [];
                    if(!tuple) tuple = {};
                    tuple.name ? conditions.push(" name = " + tuple.name) : null;
                    tuple.surname ? conditions.push(" surname = " + tuple.surname) : null;
                    tuple.email ? conditions.push(" email = " + tuple.email) : null;
                    tuple.password ? conditions.push(" password = " + tuple.password) : null;
                    tuple.avatar_link ? conditions.push(" avatar_link = " + tuple.avatar_link) : null;
                    tuple.id ? conditions.push(" id = " + tuple.id) : null;

                    conditions.forEach(function(condition) {
                        whereClause += ", " + condition;
                    });

                    whereClause = whereClause.slice(2,whereClause.length);
                    if(whereClause.length > 5)
                        whereClause = " where " + whereClause;
                    else whereClause = "";
                    console.log("Querry: select * from " + tables.user + whereClause );
                    con.query("select * from " + tables.user + whereClause, function (err, result, fields) {
                        if (err)
                           reject(err);
                        console.log('Querry executed successfully.');
                        console.log(result);

                        if(result.size == 1)
                            resolve(new User(result));
                        else {
                            let userList = [];
                            result.forEach(function (row) {
                                userList.push(new User(row));
                            });
                            resolve(userList);
                        }
                    });

            }
        })
    };

    return {
        get
    }
})();