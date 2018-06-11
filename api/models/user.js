module.exports = (() => {
    'use strict';

    const {con} = require('../db_comms/connection');
    const {getUpdateClause,getInsertClause} = require('../db_comms/db_utils');
    class User {

        constructor(tuple) {
            this.name = tuple.name ? tuple.name : this.name;
            this.surname = tuple.surname ? tuple.surname : this.surname;
            this.email = tuple.email ? tuple.email : this.email;
            this.password = tuple.password ? tuple.password : this.password;
            this.avatar_link = tuple.avatar_link ? tuple.avatar_link : this.avatar_link;
            this.join_date = tuple.join_date ? tuple.join_date : this.join_date;
            this.id = tuple.id ? tuple.id : this.id ;

        }

        update(tuple) {

            this.name = tuple.name ? tuple.name : this.name;
            this.surname = tuple.surname ? tuple.surname : this.surname;
            this.email = tuple.email ? tuple.email : this.email;
            this.password = tuple.password ? tuple.password : this.password;
            this.join_date = tuple.join_date ? tuple.join_date : this.join_date;
            this.avatar_link = tuple.avatar_link ? tuple.avatar_link : this.avatar_link;

            this.assertUser();
        }

        delete(){

            if(this.id)
            {
                con.query("delete from users where id = " + this.id,function(err,result,fields){
                    if(err)
                        throw err;
                    console.log('User deleted: ' + result );
                    delete this;
                })
            }
            else
            {
                console.log('User doesn\'t have id set. This instance has been created, not requested. It needs to be stored before it can be deleted.');
            }



        }

        save() {
            return new Promise((resolve, reject) => {
                if (!(this.email && this.name && this.surname && this.password && this.join_date)) {
                    console.log('Object has null fields. Update before storing!');
                }
                else {

                    let valueNames = [];
                    let values = [];

                    if (this.name) {
                        valueNames.push("name");
                        values.push("'" + this.name + "'");
                    }
                    if (this.surname) {
                        valueNames.push("surname");
                        values.push("'" + this.surname + "'");
                    }
                    if (this.avatar_link) {
                        valueNames.push("avatar_link");
                        values.push("'" + this.avatar_link + "'");
                    }
                    if (this.password) {
                        valueNames.push("password");
                        values.push("'" + this.password + "'");
                    }
                    if (this.email) {
                        valueNames.push("email");
                        values.push("'" + this.email + "'"
                        );
                    }
                    if(this.join_date) {
                        valueNames.push("join_date");
                        values.push("date_format('" + this.join_date + "','YYYY-MM-DD HH:mm:ss')");
                    }

                    let insertClause = getInsertClause(valueNames, values);

                    console.log('insert into users ' + insertClause);
                    if (!this.id) {
                        con.query("insert into users " + insertClause,(err, result, fields)  => {
                            if (err) {
                                reject(err);
                            }


                            console.log('User inserted: ' + JSON.stringify(result));
                            this.id = result.insertId;
                            console.log('Instance is now valid.');
                            resolve(this);
                        });
                    }
                    else {
                        let updateClause = getUpdateClause(valueNames, values);

                        con.query("update users set " + updateClause + "where id = " + this.id,(err, result, fields) => {
                            if (err) {
                                reject(err);
                            }


                            console.log('User updated ' + JSON.stringify(result));
                            this.id = result.insertId;
                            console.log('Instance is valid.');
                            resolve(this);
                        });
                    }

                }
            });

        }

        assertUser() {
            if(this.password )
                if (this.password.length < 6) {
                    this.password = null;
                    console.log('Password is too short. Setting null password to invalidate object.');
                }


        }
    }

    return {
        User
    }
})();