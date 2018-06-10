module.exports = (() => {
    'use strict';

    const {con} = require('../db_comms/connection');
    class Report {

        constructor(tuple) {
            console.log('Report');
            this.title = tuple.title ? tuple.title : this.title;
            this.description = tuple.description ? tuple.description : this.description;
            this.id_user = tuple.id_user ? tuple.id_user : this.id_user;
            this.id_location = tuple.id_location ? tuple.id_location : this.id_location;
            this.report_type = tuple.report_type ? tuple.report_type : this.report_type;
            this.report_date = tuple.report_date ? tuple.report_date : this.report_date;
            this.id = tuple.id ? tuple.id : this.id ;

        }

        update(tuple) {

            this.title = tuple.title ? tuple.title : this.title;
            this.description = tuple.description ? tuple.description : this.description;
            this.id_user = tuple.id_user ? tuple.id_user : this.id_user;
            this.id_location = tuple.id_location ? tuple.id_location : this.id_location;
            this.report_type = tuple.report_type ? tuple.report_type : this.report_type;
            this.report_date = tuple.report_date ? tuple.report_date : this.report_date;

            this.assertReport();
        }

        delete(){

            if(this.id)
            {
                con.query("delete from reports where id = " + this.id,function(err,result,fields){
                    if(err)
                        throw err;
                    console.log('Report deleted: ' + result );
                    delete this;
                })
            }
            else
            {
                console.log('Report doesn\'t have id set. This instance has been created, not requested. It needs to be stored before it can be deleted.');
            }



        }

        save() {
            if(!(this.id_user && this.title && this.description && this.id_location && this.report_date))
            {
                console.log('Object has null fields. Update before storing!');
            }
            else {

                let valuetitles = [];
                let values = [];

                if (this.title) {
                    valuetitles.push("title");
                    values.push("'" +this.title + "'");
                }
                if (this.description) {
                    valuetitles.push("description");
                    values.push("'" + this.description + "'");
                }
                if (this.report_type) {
                    valuetitles.push("report_type");
                    values.push("'" + this.report_type + "'");
                }
                if (this.id_location) {
                    valuetitles.push("id_location");
                    values.push("'" + this.id_location + "'");
                }
                if (this.id_user) {
                    valuetitles.push("id_user");
                    values.push("'" + this.id_user + "'");
                }
                if(this.report_date){
                    valuetitles.push("report_date");
                    values.push("'" + this.report_date + "'");
                }

                let titleClause = "(";
                let valueClause = "(";

                valuetitles.forEach(function (title) {
                    titleClause += title + ",";
                })
                values.forEach(function (value) {
                    valueClause += value + ",";
                })

                titleClause = titleClause.substr(0,titleClause.length-1) + ")";
                valueClause = valueClause.substr(0,valueClause.length-1) + ")";
                console.log(titleClause + valueClause);
                if(this.id) {
                    con.query("insert into reports" + titleClause + " values" + valueClause, function (err, result, fields) {
                        if (err) {
                            return false;
                        }


                        console.log('Report inserted: ' + JSON.stringify(result));
                        this.id = result.insertId;
                        console.log('Instance is now valid.');
                        return true;
                    });
                }
                else
                {
                    let updateClause = "";
                    let i=0;
                    for(i=0;i<valuetitles.length;i++)
                    {
                        updateClause += valuetitles[i] + "=" + values[i] + ",";
                    }
                    updateClause = updateClause.substr(0,updateClause.length-1);

                    con.query("update reports set " + updateClause + "where id = " + this.id , function (err, result, fields) {
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

        assertReport() {
            if(this.id_location && this.id_user)
            {
                if(this.id_location < 0) this.id_location = null;
                if(this.id_user < 0) this.id_user = null;
            }
        }
    }

    return {
        Report
    }
})();