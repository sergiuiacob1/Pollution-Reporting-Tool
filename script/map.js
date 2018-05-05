let searchBox = document.querySelector(".top-navigation .search input");
searchBox.setAttribute("placeholder", "lui dragos ii place pla");

var Client = require('mysql').Client;
var client = new Client(); 
client.host ='91.92.128.27';
client.user = 'remotePRT';
client.password = 'makeplacesbetter';
console.log("connecting...");
client.connect(function(err, results) {
    if (err) {
        console.log("ERROR: " + err.message);
        throw err;
    }
    console.log("connected.");
    clientConnected(client);
});

clientConnected = function(client)
{
	tableHasData(client);
}           


tableHasData = function(client)
{
    client.query(
        'show databases',
        function selectCb(err, results, fields) {
            if (err) {
                console.log("ERROR: " + err.message);
                throw err;
            }
            console.log("Got "+results.length+" Rows:");
            for(var i in results){
			 
				console.log(results[i]); 
				console.log('\n');
				
            //console.log("The meta data about the columns:");
            //console.log(fields);     
			}
            client.end();
        });
};