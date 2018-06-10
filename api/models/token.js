module.exports = (() => {
    'use strict';

    const {con} = require('../db_comms/connection');
    const {getUpdateClause,getInsertClause} = require('../db_comms/db_utils');
    class Token {

        constructor(tuple) {
            console.log('Token');
            this.id_user = tuple.id_user ? tuple.id_user : this.id_user;
            this.token = tuple.token ? tuple.token : this.token;
            this.expire = tuple.expire ? tuple.expire : this.expire;
            this.id = tuple.id ? tuple.id : this.id ;

        }

        update(tuple) {

            this.id_user = tuple.id_user ? tuple.id_user : this.id_user;
            this.token = tuple.token ? tuple.token : this.token;
            this.expire = tuple.expire ? tuple.expire : this.expire;

            this.assertToken();
        }

        delete(){

            if(this.id)
            {
                con.query("delete from session_tokens where id = " + this.id,function(err,result,fields){
                    if(err)
                        throw err;
                    console.log('Token deleted: ' + result );
                    delete this;
                })
            }
            else
            {
                console.log('Token doesn\'t have id set. This instance has been created, not requested. It needs to be stored before it can be deleted.');
            }



        }

        save() {
            if(!(this.id_user && this.token))
            {
                console.log('Object has null fields. Update before storing!');
            }
            else {

                let valueNames = [];
                let values = [];

                if (this.token) {
                    valueNames.push("token");
                    values.push("'" + this.token + "'");
                }
                if (this.id_user) {
                    valueNames.push("id_user");
                    values.push("'" + this.id_user + "'");
                }
                if(this.expire) {
                    valueNames.push("expire");
                    values.push("TO_DATE('" + this.expire + "','YYYY-MM-DD HH:mm:ss')");
                }

                let insertClause = getInsertClause(valueNames,values);
                console.log('Querry : insert into session_tokens ' + insertClause);
                if(!this.id) {
                    con.query("insert into session_tokens " + insertClause, function (err, result, fields) {
                        if (err) {
                            return false;
                        }


                        console.log('Token inserted: ' + JSON.stringify(result));
                        this.id = result.insertId;
                        console.log('Instance is now valid.');
                        return true;
                    });
                }
                else
                {
                    let updateClause = getUpdateClause(valueNames,values);

                    con.query("update session_tokens set " + updateClause + "where id = " + this.id , function (err, result, fields) {
                        if (err) {
                            return false;
                        }


                        console.log('report updated ' + JSON.stringify(result));
                        this.id = result.insertId;
                        console.log('Instance is valid.');
                        return true;
                    });
                }

            }

        }

        assertToken() {

        }
    }

    return {
        Token
    }
})();