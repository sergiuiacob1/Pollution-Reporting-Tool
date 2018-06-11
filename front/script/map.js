var hostname = "http://91.92.128.27:3000";
// var hostname = "http://localhost:3000";

var map;

$(document).ready(function () {
	var script = document.createElement("script");
	script.src =
		"https://maps.googleapis.com/maps/api/js?key=AIzaSyDamjhWg7wcyotS8tgBoI69RFOx9onVpDs&callback=initMap";
	document.head.appendChild(script);
});

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
	addEventListeners();
	updateCenterLocation();
}

function addEventListeners() {
	google.maps.event.addListener(map, 'dragend', updateCenterLocation);
}

function updateCenterLocation() {
	document.getElementById("stage1-location").value = map.getCenter();
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

	$.get(getURL)
	.done(function (result, status) {
		addReportsToMap(result);
	}).fail(function () {
		console.log('GET /api/reports failed');
	});
}

function addReportsToMap(result) {
	result.reports.forEach(report => addReportToMap(report));
}

function addReportToMap(report) {
	let pos = {
		lat: report.location.lat_coord,
		lng: report.location.long_coord
	};
	let contentPopup = createPopupContent(report);

	let infowindow = new google.maps.InfoWindow({
		content: contentPopup,
		maxWidth: 350
	});

	let marker = new google.maps.Marker({
		position: pos,
		map: map,
		title: 'Uluru (Ayers Rock)'
	});
	marker.opened = 0;

	marker.addListener('click', function () {
		if (!marker.opened)
			infowindow.open(map, marker);
		else
			infowindow.close(map, marker);
		marker.opened = 1 - marker.opened;
	});
	google.maps.event.addListener(map, 'click', function () {
		infowindow.close(map, marker);
	});

	map.panTo(pos);
}


function createPopupContent(report) {
	let content = document.createElement('div');
	let pTitle = document.createElement('div');
	let pDesc = document.createElement('div');

	content.setAttribute("id", "popup-info");
	pTitle.className = "popup-info-title";
	pTitle.innerHTML = report.title;
	pDesc.className = "popup-info-description";
	pDesc.innerHTML = report.description;

	content.appendChild(pTitle);
	content.appendChild(pDesc);

	return content;
}