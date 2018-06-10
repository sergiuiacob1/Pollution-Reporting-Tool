module.exports = (() => {

    const allowedUrl = ["/api/reports", "/api/users", "/api/locations"];

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
                if (value === String(req.url).split('?')[0]) {
                    return true;
                }
            })) {
            return true;
        } else
            return false;
    }

    function validatePostRequest(req) {
        if (allowedUrl.some(function (value) {
                if (value === String(req.url).split('?')[0]) {
                    return true;
                }
            })) {
            return true;
        } else
            return false;
    }

    return {
        validate
    }
})();