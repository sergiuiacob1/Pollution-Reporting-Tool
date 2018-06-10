var hostname = "http://localhost:3000";
var map;

window.onload = init();

function init() {
	var script = document.createElement("script");
	script.src =
		"https://maps.googleapis.com/maps/api/js?key=AIzaSyDamjhWg7wcyotS8tgBoI69RFOx9onVpDs&callback=initMap";
	document.head.appendChild(script);
}

function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		center: {
			lat: -33.866,
			lng: 151.196
		},
		zoom: 8
	});

	centerMapToUserLocation();

	getReports();
}

function centerMapToUserLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			map.panTo(pos);
		});
	}
}


function placeMarker(position, map) {
	var marker = new google.maps.Marker({
		position: position,
		map: map
	});
	map.panTo(position);
}

function getReports() {
	var getURL = hostname + "/api/reports";

	$.ajax({
		url: getURL,
		type: 'GET',
		dataType: 'json'
	}).done(function (result) {
		console.log('am luat reports');
		addReportsToMap(result);
	}).fail(function () {
		console.log('get reports a esuat');
	});
}

function addReportsToMap(reports) {

	var uluru = {
		lat: -25.363,
		lng: 131.044
	};

	var infowindow = new google.maps.InfoWindow({
		content: 'SALUT'
	});

	var marker = new google.maps.Marker({
		position: uluru,
		map: map,
		title: 'Uluru (Ayers Rock)'
	});
	marker.addListener('click', function () {
		infowindow.open(map, marker);
	});

	map.panTo(uluru);
}