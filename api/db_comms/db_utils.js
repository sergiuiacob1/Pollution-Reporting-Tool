module.exports = (() => {

    const moment = require('moment');

    const getUpdateClause = (names,values)  => {
        let updateClause = "";
        let i=0;
        for(i=0;i<names.length;i++)
        {
            updateClause += names[i] + "=" + values[i] + ",";
        }
        updateClause = updateClause.substr(0,updateClause.length-1);

        return updateClause;
    };

    const getInsertClause = (name,values) => {

        let nameClause = "(";
        let valueClause = "(";

        name.forEach(function (name) {
            nameClause += name + ",";
        })
        values.forEach(function (value) {
            valueClause += value + ",";
        })

        nameClause = nameClause.substr(0,nameClause.length-1) + ")";
        valueClause = valueClause.substr(0,valueClause.length-1) + ") ";

        return (nameClause + " values " + valueClause);
    };

    const getNowTime = () => {
        return moment.format('YYYY-MM-DD HH:mm:ss');
    };

    const createExpireTime = () => {
        return moment.add(30,'minutes').calendar().format('YYYY-MM-DD HH:mm:ss');
    };

    return {
        getUpdateClause,
        getInsertClause,
        getNowTime,
        createExpireTime
    }
})();