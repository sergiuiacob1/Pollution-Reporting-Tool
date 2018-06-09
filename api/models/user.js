module.exports = (() => {
    'use strict';

    var {con} = require('../db_comms/connection');
    class User {

        constructor(tuple) {
            console.log('User');
            this.name = tuple.name ? tuple.name : this.name;
            this.surname = tuple.surname ? tuple.surname : this.surname;
            this.email = tuple.email ? tuple.email : this.email;
            this.password = tuple.password ? tuple.password : this.password;
            this.avatar_link = tuple.avatar_link ? tuple.avatar_link : this.avatar_link;

        }
        update(tuple) {

            this.name = tuple.name ? tuple.name : this.name;
            this.surname = tuple.surname ? tuple.surname : this.surname;
            this.email = tuple.email ? tuple.email : this.email;
            this.password = tuple.password ? tuple.password : this.password;
            this.avatar_link = tuple.avatar_link ? tuple.avatar_link : this.avatar_link;
        }

        delete(){
            this.delete()
        }

        save() {
            con.connect(function (err) {
                if (err)
                    throw err;
            });

            con.query("inert into users(name,surname,email,password,avatar_link) values (" + this.name + "," + this.surname + "," + this.email + "," + this.password + "," + this.avatar_link + ")" , function (err, result, fields) {
                if (err)
                    throw err;

                console.log('User saved : ' + result);
            });
        }
    }

    return {
        User
    }
})();