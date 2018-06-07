var http = require('http');
var url  = require('url');
var fs   = require('fs');


http.createServer(function(req, res) {
    console.log(req.url)
    if (req.url == '/index.html' || req.url == '/') {
	res.write('dat way')
	res.end()
    }else {
	res.write('wrong way')
	res.end()
    }
}).listen(3000);
console.log('Server running.')
