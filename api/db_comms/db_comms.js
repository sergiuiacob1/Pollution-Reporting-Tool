const tables = require('../models/tables');
const {
    User
} = require('../models/user');
const {
    Report
} = require('../models/report');
const {
    Token
} = require('../models/token');
const {
    Comment
} = require('../models/comment');
const {
    ReportPic
} = require('../models/reportpic');
const {
    Location
} = require('../models/location');
const {
    con
} = require('./connection')
const {
    getNowTime,
    createExpireTime
} = require('./db_utils');

module.exports = (() => {
    'use strict';

    const get = (table, tuple) => {
        return new Promise((resolve, reject) => {
            let whereClause = "";
            let conditions = [];
            switch (table) {
                case tables.user:
                    whereClause = "";
                    conditions = [];
                    if (!tuple) tuple = {};
                    tuple.name ? conditions.push(" name = '" + tuple.name + "'") : null;
                    tuple.surname ? conditions.push(" surname = '" + tuple.surname + "'") : null;
                    tuple.email ? conditions.push(" email = '" + tuple.email + "'") : null;
                    tuple.password ? conditions.push(" password = '" + tuple.password + "'") : null;
                    tuple.avatar_link ? conditions.push(" avatar_link = '" + tuple.avatar_link + "'") : null;
                    tuple.id ? conditions.push(" id = " + tuple.id) : null;

                    conditions.forEach(function (condition) {
                        whereClause += " AND " + condition;
                    });

                    if (whereClause.length > 5) {
                        whereClause = whereClause.slice(5, whereClause.length);
                        whereClause = " where " + whereClause;
                    } else whereClause = "";
                    console.log("Querry: select * from " + tables.user + whereClause);
                    con.query("select * from " + tables.user + whereClause, (err, result, fields) => {
                        if (err)
                            reject(null);
                        console.log('Querry executed successfully.');
                        console.log(result);

                        if (result) {
                            let userList = [];

                            let i;
                            for (i = 0; i < result.length; i++) {
                                userList.push(new User(result[i]));
                            }

                            resolve(userList);
                        } else resolve(null);
                    });
                    break;
                case tables.report:
                    whereClause = "";
                    conditions = [];
                    if (!tuple) tuple = {};
                    tuple.title ? conditions.push(" title = '" + tuple.title + "'") : null;
                    tuple.description ? conditions.push(" description = " + tuple.description) : null;
                    tuple.id_location ? conditions.push(" id_location = " + tuple.id_location) : null;
                    tuple.id_user ? conditions.push(" id_user = " + tuple.id_user) : null;
                    tuple.report_type ? conditions.push(" report_type = " + tuple.report_type) : null;
                    tuple.report_date ? conditions.push(" report_date = " + tuple.report_date) : null;
                    tuple.id ? conditions.push(" id = " + tuple.id) : null;

                    conditions.forEach(function (condition) {
                        whereClause += " AND " + condition;
                    });

                    if (whereClause.length > 5) {
                        whereClause = whereClause.slice(5, whereClause.length);
                        whereClause = " where " + whereClause;
                    } else whereClause = "";
                    console.log("Querry: select * from " + tables.report + whereClause);
                    con.query("select * from " + tables.report + whereClause, (err, result, fields) => {
                        if (err)
                            reject(err);
                        console.log('Querry executed successfully.');

                        let reportList = [];

                        let i;
                        for (i = 0; i < result.length; i++) {
                            reportList.push(new Report(result[i]));
                        }

                        resolve(reportList);

                    });
                    break;
                case tables.comment:
                    console.log("Comment list required");
                    whereClause = "";
                    conditions = [];
                    if (!tuple) tuple = {};
                    tuple.comment_text ? conditions.push(" comment_text = '" + tuple.comment_text + "'") : null;
                    tuple.id_user ? conditions.push(" id_user = " + tuple.id_user) : null;
                    tuple.id_report ? conditions.push(" id_report = " + tuple.report) : null;
                    tuple.comment_date ? conditions.push(" comment_date = " + tuple.comment_date) : null;
                    tuple.id ? conditions.push(" id = " + tuple.id) : null;

                    conditions.forEach(function (condition) {
                        whereClause += ", " + condition;
                    });

                    whereClause = whereClause.slice(2, whereClause.length);
                    if (whereClause.length > 3)
                        whereClause = " where " + whereClause;
                    else whereClause = "";
                    console.log("Querry: select * from " + tables.comment + whereClause);
                    con.query("select * from " + tables.comment + whereClause, (err, result, fields) => {
                        if (err)
                            reject(err);
                        console.log('Querry executed successfully.');

                        if (result.length == 1)
                            resolve(new Comment(result));
                        else {
                            let commentList = [];
                            result.forEach(function (row) {
                                commentList.push(new Comment(row));
                            });
                            resolve(commentList);
                        }
                    });
                    break;
                case tables.location:
                    whereClause = "";
                    conditions = [];
                    if (!tuple) tuple = {};
                    tuple.lat_coord ? conditions.push(" lat_coord = " + tuple.lat_coord) : null;
                    tuple.long_coord ? conditions.push(" long_coord = " + tuple.long_coord) : null;
                    tuple.id ? conditions.push(" id = " + tuple.id) : null;

                    conditions.forEach(function (condition) {
                        whereClause += " AND " + condition;
                    });

                    if (whereClause.length > 5) {
                        whereClause = whereClause.slice(5, whereClause.length);
                        whereClause = " where " + whereClause;
                    } else whereClause = "";
                    console.log("Querry: select * from " + tables.location + whereClause);
                    con.query("select * from " + tables.location + whereClause, (err, result, fields) => {
                        if (err)
                            reject(err);
                        console.log('Querry executed successfully.');


                        let locationList = [];

                        let i;
                        for (i = 0; i < result.length; i++) {
                            locationList.push(new Location(result[i]));
                        }


                        resolve(locationList);

                    });
                    break;
                case tables.reportpics:
                    whereClause = "";
                    conditions = [];
                    if (!tuple) tuple = {};
                    tuple.id_report ? conditions.push(" id_report = " + tuple.id_report) : null;
                    tuple.pic_link ? conditions.push(" pic_link = '" + tuple.pic_link + "'") : null;
                    tuple.id ? conditions.push(" id = " + tuple.id) : null;

                    conditions.forEach(function (condition) {
                        whereClause += " AND " + condition;
                    });

                    if (whereClause.length > 5) {
                        whereClause = whereClause.slice(5, whereClause.length);
                        whereClause = " where " + whereClause;
                    } else whereClause = "";
                    console.log("Querry: select * from " + tables.reportpics + whereClause);
                    con.query("select * from " + tables.reportpics + whereClause, (err, result, fields) => {
                        if (err)
                            reject(err);
                        console.log('Querry executed successfully.');

                        let picList = [];

                        let i;
                        for (i = 0; i < result.length; i++) {
                            picList.push(new ReportPic(result[i]));
                        }
                        resolve(picList);

                    });
                    break;
                case tables.token:
                    whereClause = "";
                    conditions = [];
                    if (!tuple) tuple = {};
                    tuple.id_user ? conditions.push(" id_user = " + tuple.id_user) : null;
                    tuple.token ? conditions.push(" token = '" + tuple.token + "'") : null;
                    tuple.id ? conditions.push(" id = " + tuple.id) : null;
                    conditions.forEach(function (condition) {
                        whereClause += " AND " + condition;
                    });

                    if (whereClause.length > 5) {
                        whereClause = whereClause.slice(5, whereClause.length);
                        whereClause = " where " + whereClause;
                    } else whereClause = "";
                    console.log("Querry: select * from " + tables.token + whereClause);
                    con.query("select * from " + tables.token + whereClause, (err, result, fields) => {
                        if (err)
                            reject(err);
                        console.log('Querry executed successfully.');

                        console.log(result);

                        let tokenList = [];

                        let i;
                        for (i = 0; i < result.length; i++) {
                            tokenList.push(new Token(result[i]));
                        }
                        resolve(tokenList);

                    });
            }
        });
    };

    return {
        get
    }
})();