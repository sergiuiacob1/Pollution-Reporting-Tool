module.exports = (() => {
    'use strict';

    const {
        con
    } = require('../db_comms/connection');
    const {
        getUpdateClause,
        getInsertClause
    } = require('../db_comms/db_utils');
    class Location {

        constructor(tuple) {
            console.log('Location');
            this.lat_coord = tuple.lat_coord ? tuple.lat_coord : this.lat_coord;
            this.long_coord = tuple.long_coord ? tuple.long_coord : this.long_coord;
            this.id = tuple.id ? tuple.id : this.id;
        }

        update(tuple) {

            this.lat_coord = tuple.lat_coord ? tuple.lat_coord : this.lat_coord;
            this.long_coord = tuple.long_coord ? tuple.long_coord : this.long_coord;

            this.assertLocation();
        }

        delete() {

            if (this.id) {
                con.query("delete from locations where id = " + this.id, function (err, result, fields) {
                    if (err)
                        throw err;
                    console.log('Location deleted: ' + result);
                    delete this;
                })
            } else {
                console.log('Location doesn\'t have id set. This instance has been created, not requested. It needs to be stored before it can be deleted.');
            }



        }

        save() {
            return new Promise((resolve, reject) => {
                if (!(this.lat_coord && this.long_coord)) {
                    console.log('Object has null fields. Update before storing!');
                    reject('Object has null fields. Update before storing!');
                } else {
                    let valueNames = [];
                    let values = [];

                    if (this.long_coord) {
                        valueNames.push("long_coord");
                        values.push("'" + this.long_coord + "'");
                    }
                    if (this.lat_coord) {
                        valueNames.push("lat_coord");
                        values.push("'" + this.lat_coord + "'");
                    }

                    let insertClause = getInsertClause(valueNames, values);
                    console.log('Querry : insert into locations ' + insertClause);
                    if (!this.id) {
                        con.query("insert into locations " + insertClause, (err, result, fields) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            }
                            console.log('Location inserted: ' + JSON.stringify(result));
                            this.id = result.insertId;
                            console.log('Instance is now valid.');
                            resolve(this);
                        });
                    } else {
                        let updateClause = getUpdateClause(valueNames, values);

                        con.query("update locations set " + updateClause + "where id = " + this.id, (err, result, fields) => {
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
        assertLocation() {

        }
    }

    return {
        Location
    }
})();