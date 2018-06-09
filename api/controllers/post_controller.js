const db_comms = require('./../db_comms/db_comms.js');

module.exports = (() => {

    function handleRequest(req, res) {
        console.log('POST at url: ' + req.url);
        res.write('POST');
        res.end();
    }

    return {
        handleRequest
    }
})();