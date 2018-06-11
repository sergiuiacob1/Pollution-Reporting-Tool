module.exports = (() => {
    'use strict';

    const {con} = require('../db_comms/connection');
    const {getUpdateClause,getInsertClause} = require('../db_comms/db_utils');
    class Comment {

        constructor(tuple) {
            this.comment_text = tuple.comment_text ? tuple.comment_text : this.comment_text;
            this.id_user = tuple.id_user ? tuple.id_user : this.id_user;
            this.id_report = tuple.id_report ? tuple.id_report : this.id_report;
            this.comment_date = tuple.comment_date ? tuple.comment_date : this.comment_date;
            this.id = tuple.id ? tuple.id : this.id ;

        }

        update(tuple) {

            this.comment_text = tuple.comment_text ? tuple.comment_text : this.comment_text;
            this.id_user = tuple.id_user ? tuple.id_user : this.id_user;
            this.id_report = tuple.id_report ? tuple.id_report : this.id_report;
            this.comment_date = tuple.comment_date ? tuple.comment_date : this.comment_date;

            this.assertComment();
        }

        delete(){

            if(this.id)
            {
                con.query("delete from comments where id = " + this.id,function(err,result,fields){
                    if(err)
                        throw err;
                    console.log('Comment deleted: ' + result );
                    delete this;
                })
            }
            else
            {
                console.log('Comment doesn\'t have id set. This instance has been created, not requested. It needs to be stored before it can be deleted.');
            }



        }

        save() {
            return new Promise((resolve, reject) => {
                if (!(this.id_user && this.comment_text && this.id_report && this.comment_date)) {
                    console.log('Object has null fields. Update before storing!');
                }
                else {

                    let valueNames = [];
                    let values = [];

                    if (this.comment_text) {
                        valueNames.push("comment_text");
                        values.push("'" + this.comment_text + "'");
                    }
                    if (this.id_report) {
                        valueNames.push("id_report");
                        values.push("'" + this.id_report + "'");
                    }
                    if (this.id_user) {
                        valueNames.push("id_user");
                        values.push("'" + this.id_user + "'");
                    }
                    if (this.comment_date) {
                        valueNames.push("comment_date");
                        values.push("'" + this.comment_date + "'");
                    }

                    let insertClause = getInsertClause(valueNames, values);
                    console.log('Querry : insert into comments ' + insertClause);
                    if (!this.id) {
                        con.query("insert into comments " + insertClause, function (err, result, fields) {
                            if (err) {
                                reject(err);
                            }


                            console.log('Comment inserted: ' + JSON.stringify(result));
                            this.id = result.insertId;
                            console.log('Instance is now valid.');
                            resolve(this);
                        });
                    }
                    else {
                        let updateClause = getUpdateClause(valueNames, values);

                        con.query("update comments set " + updateClause + "where id = " + this.id, (err, result, fields) => {
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

        assertComment() {
            if(this.comment_text)
            {
                if(this.comment_text.length() < 1) this.comment_text = null;
            }
        }
    }

    return {
        Comment
    }
})();