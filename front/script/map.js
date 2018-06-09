var hostname = "http://localhost:3000";
var map;

window.onload = init();

function init() {
	var script = document.createElement("script");
	script.src =
		"https://maps.googleapis.com/maps/api/js?key=AIzaSyDamjhWg7wcyotS8tgBoI69RFOx9onVpDs&callback=initMap";
	document.head.appendChild(script);

	getReports();
}

function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		center: {
			lat: -33.866,
			lng: 151.196
		},
		zoom: 8
	});
}

function getReports() {
	var getURL = hostname + "/api/reports";

	console.log ('getting');

	$.ajax({
		url: getURL,
		type: 'GET',
		dataType: 'json'
	}).done(function (result) {
		console.log('a mers');
		addReportsToMap(result);
	}).fail(function () {
		console.log('ceva nu a mers bine');
	});
}

function addReportsToMap(reports) {
	console.log(reports);
	console.log('sadasda');
}