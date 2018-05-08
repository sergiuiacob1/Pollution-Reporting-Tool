var express = require("express");
var bodyParser = require("body-parser")
var app = express();
var fs = require("fs");
var path = require('path');
var jsonObj = {"users":[]};
var globalData;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/src',express.static( 'public/src'));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get("/", function (req, res) {

  res.sendFile(path.resolve("./../index.html"));
});

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("PRT Listening at http://%s:%s", host, port);
});