module.exports = (() => {
    'use strict';

    const {con} = require('../db_comms/connection');
    class User {

        constructor(tuple) {
            console.log('User');
            this.name = tuple.name ? tuple.name : this.name;
            this.surname = tuple.surname ? tuple.surname : this.surname;
            this.email = tuple.email ? tuple.email : this.email;
            this.password = tuple.password ? tuple.password : this.password;
            this.avatar_link = tuple.avatar_link ? tuple.avatar_link : this.avatar_link;
            this.id = tuple.id ? tuple.id : -1 ;

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

            con.connect(function (err) {
                if (err)
                    throw err;
            });

            if(this.email)
            {
                con.query("delete from users where email = " + this.email,function(err,result,fields){
                    if(err)
                        throw err;
                    console.log('User deleted.');
                    delete this;
                })
            }
            else
            {
                console.log('User doesn\'t have email set. Object is invalid untill updated');
            }



        }

        save() {

            if(this.name && this.surname && this.email && this.password && this.avatar_link) {
                con.query("inert into users(name,surname,email,password,avatar_link) values (" + this.name + "," + this.surname + "," + this.email + "," + this.password + "," + this.avatar_link + ")", function (err, result, fields) {
                    if (err)
                        throw err;

                    console.log('User saved : ' + result);

                });
            }
            else
            {
                console.log("User object has null fields. Update them before storing");
            }
        }

        assertUser() {
            if(this.password )
                if (this.password.length < 6)
                    this.password = null;


        }
    }

    return {
        User
    }
})();