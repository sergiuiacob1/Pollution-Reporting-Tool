module.exports = (() => {
    'use strict';

    var rand = require("random-key");
    const {
        con
    } = require('../db_comms/connection');
    const {
        getUpdateClause,
        getInsertClause
    } = require('../db_comms/db_utils');
    class Token {

        constructor(tuple) {
            this.id_user = tuple.id_user ? tuple.id_user : this.id_user;
            this.token = tuple.token ? tuple.token : this.token;
            this.expire = tuple.expire ? tuple.expire : this.expire;
            this.id = tuple.id ? tuple.id : this.id;

            if(!this.token){
                this.token = rand.generate(64);
            }

        }

        update(tuple) {

            this.id_user = tuple.id_user ? tuple.id_user : this.id_user;
            this.token = tuple.token ? tuple.token : this.token;
            this.expire = tuple.expire ? tuple.expire : this.expire;

            this.assertToken();
        }

        delete() {

            if (this.id) {
                con.query("delete from session_tokens where id = " + this.id, function (err, result, fields) {
                    if (err)
                        throw err;
                    console.log('Token deleted: ' + result);
                    delete this;
                })
            } else {
                console.log('Token doesn\'t have id set. This instance has been created, not requested. It needs to be stored before it can be deleted.');
            }



        }

        save() {
            return new Promise((resolve, reject) => {
                if (!(this.id_user && this.token)) {
                    console.log('Object has null fields. Update before storing!');
                } else {

                    let valueNames = [];
                    let values = [];


                    if (this.token) {
                        valueNames.push("token");
                        values.push("'" + this.token + "'");

                        if (this.id_user) {
                            valueNames.push("id_user");
                            values.push("'" + this.id_user + "'");
                        }
                        if (this.expire) {
                            valueNames.push("expire");
                            values.push("DATE_FORMAT('" + this.expire + "','%Y-%m-%d %H:%i:%s')");
                        }

                        let insertClause = getInsertClause(valueNames, values);
                        console.log('Querry : insert into session_tokens ' + insertClause);
                        if (!this.id) {
                            con.query("insert into session_tokens " + insertClause, (err, result, fields) => {
                                if (err) {
                                    reject(err);
                                }


                                console.log('Token inserted: ' + JSON.stringify(result));
                                this.id = result.insertId;
                                console.log('Instance is now valid.');
                                resolve(this);
                            });
                        } else {
                            let updateClause = getUpdateClause(valueNames, values);

                            con.query("update session_tokens set " + updateClause + "where id = " + this.id, (err, result, fields) => {
                                if (err) {
                                    reject(err);
                                }


                                console.log('Token updated ' + JSON.stringify(result));
                                this.id = result.insertId;
                                console.log('Instance is valid.');
                                resolve(this);
                            });
                        }

                    }

                }
            });
        }

        assertToken() {

        }
    }

    return {
        Token
    }
})();