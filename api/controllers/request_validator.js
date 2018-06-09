module.exports = (() => {

    const allowedUrl = ["/api/reports", "/api/users"];

    function validate(req) {
        switch (req.method) {
            case "GET":
                return validateGetRequest(req);
                break;
            case "POST":
                return validatePostRequest(req);
                break;
        }
    }

    function validateGetRequest(req) {
        if (allowedUrl.some(function (value) {
                if (value === req.url) {
                    return true;
                }
            })) {
            return true;
        } else
            return false;
    }

    function validatePostRequest(req) {
        return false;
    }

    return {
        validate
    }
})();