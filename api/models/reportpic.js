module.exports = (() => {
    'use strict';

    const {
        con
    } = require('../db_comms/connection');
    const {
        getUpdateClause,
        getInsertClause
    } = require('../db_comms/db_utils');
    class ReportPic {

        constructor(tuple) {
            this.id_report = tuple.id_report ? tuple.id_report : this.id_report;
            this.pic_link = tuple.pic_link ? tuple.pic_link : this.pic_link;
            this.id = tuple.id ? tuple.id : this.id;
        }

        update(tuple) {

            this.id_report = tuple.id_report ? tuple.id_report : this.id_report;
            this.pic_link = tuple.pic_link ? tuple.pic_link : this.pic_link;

            this.assertReportPic();
        }

        delete() {

            if (this.id) {
                con.query("delete from report_pics where id = " + this.id, function (err, result, fields) {
                    if (err)
                        throw err;
                    console.log('ReportPic deleted: ' + result);
                    delete this;
                })
            } else {
                console.log('ReportPic doesn\'t have id set. This instance has been created, not requested. It needs to be stored before it can be deleted.');
            }



        }

        save() {
            return new Promise((resolve, reject) => {
                if (!(this.id_report && this.pic_link)) {
                    console.log('Object has null fields. Update before storing!');
                    reject('Object has null fields. Update before storing!');
                } else {
                    let valueNames = [];
                    let values = [];

                    if (this.pic_link) {
                        valueNames.push("pic_link");
                        values.push("'" + this.pic_link + "'");
                    }
                    if (this.id_report) {
                        valueNames.push("id_report");
                        values.push("'" + this.id_report + "'");
                    }

                    let insertClause = getInsertClause(valueNames, values);
                    //console.log('Querry : insert into report_pics ' + insertClause);
                    if (!this.id) {
                        con.query("insert into report_pics " + insertClause, (err, result, fields) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            }
                            console.log('ReportPic inserted: ' + JSON.stringify(result));
                            this.id = result.insertId;
                            console.log('Instance is now valid.');
                            resolve(this);
                        });
                    } else {
                        let updateClause = getUpdateClause(valueNames, values);

                        con.query("update report_pics set " + updateClause + "where id = " + this.id, (err, result, fields) => {
                            if (err) {
                                reject(err);
                            }

                            console.log('report updated ' + JSON.stringify(result));
                            this.id = result.insertId;
                            console.log('Instance is valid.');
                            resolve(this);
                        });
                    }
                }
            });
        }
        assertReportPic() {

        }
    }

    return {
        ReportPic
    }
})();