module.exports = (() => {
    'use strict';

    const {con} = require('../db_comms/connection');
    const {getUpdateClause,getInsertClause} = require('../db_comms/db_utils');
    class User {

        constructor(tuple) {
            console.log('User');
            this.name = tuple.name ? tuple.name : this.name;
            this.surname = tuple.surname ? tuple.surname : this.surname;
            this.email = tuple.email ? tuple.email : this.email;
            this.password = tuple.password ? tuple.password : this.password;
            this.avatar_link = tuple.avatar_link ? tuple.avatar_link : this.avatar_link;
            this.id = tuple.id ? tuple.id : this.id ;

        }

        update(tuple) {

            this.name = tuple.name ? tuple.name : this.name;
            this.surname = tuple.surname ? tuple.surname : this.surname;
            this.email = tuple.email ? tuple.email : this.email;
            this.password = tuple.password ? tuple.password : this.password;
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
            if(!(this.email && this.name && this.surname && this.password))
            {
                console.log('Object has null fields. Update before storing!');
            }
            else {

                let valueNames = [];
                let values = [];

                if (this.name) {
                    valueNames.push("name");
                    values.push("'" +this.name + "'");
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

                let insertClause = getUpdateClause(valueNames,values);

                if(!this.id) {
                    con.query("insert into users " + insertClause, function (err, result, fields) {
                        if (err) {
                            return false;
                        }


                        console.log('User inserted: ' + JSON.stringify(result));
                        this.id = result.insertId;
                        console.log('Instance is now valid.');
                        return true;
                    });
                }
                else
                {
                    let updateClause = getInsertClause(valueNames,values);

                    con.query("update users set " + updateClause + "where id = " + this.id , function (err, result, fields) {
                        if (err) {
                            return false;
                        }


                        console.log('User updated ' + JSON.stringify(result));
                        this.id = result.insertId;
                        console.log('Instance is valid.');
                        return true;
                    });
                }

            }

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