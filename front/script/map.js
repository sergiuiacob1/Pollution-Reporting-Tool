// var hostname = "http://91.92.128.27:3000";
var hostname = "http://localhost:3000";

var map;

$(document).ready(function () {
	var script = document.createElement("script");
	script.src =
		"https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyDamjhWg7wcyotS8tgBoI69RFOx9onVpDs&callback=initMap";
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
	createSearchBox();
}

function createSearchBox() {
	var input = document.getElementById('pac-input');
	var searchBox = new google.maps.places.SearchBox(input);
	map.addListener('bounds_changed', function () {
		searchBox.setBounds(map.getBounds());
	});
	searchBox.addListener('places_changed', function () {
		var places = searchBox.getPlaces();
		if (places.length == 0) {
			return;
		}

		// For each place, get the icon, name and location.
		var bounds = new google.maps.LatLngBounds();
		places.forEach(function (place) {
			if (!place.geometry) {
				console.log("Returned place contains no geometry");
				return;
			}
			if (place.geometry.viewport) {
				bounds.union(place.geometry.viewport);
			} else {
				bounds.extend(place.geometry.location);
			}
		});
		map.fitBounds(bounds);
	});
}

function addEventListeners() {
	google.maps.event.addListener(map, 'center_changed', updateCenterLocation);
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
			updateCenterLocation();
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
	if (result.reports != null)
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
		maxWidth: 350,
		maxHeight: 50
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
}


function createPopupContent(report) {
	let content = document.createElement('div');
	let pTitle = document.createElement('div');
	let pDesc = document.createElement('div');
	let pDivImages = document.createElement('div');

	content.setAttribute("id", "popup-info");
	pTitle.className = "popup-info-title";
	pTitle.innerHTML = report.title;
	pDesc.className = "popup-info-description";
	pDesc.innerHTML = report.description;
	pDivImages.className = "popup-info-images";

	for (let i = 0; i < report.images.length; ++i) {
		let getURL = hostname + `/api/image?id=${report.images[i]}`;

		$.get(getURL)
			.done((result) => {
				let img = document.createElement('img');
				img.src = 'data:image/jpeg;base64,' + result;
				pDivImages.append(img);
			})
			.fail(() => {
				console.log('buba');
				console.log(errorThrown);
			});
		// $.ajax({
		// 	url: getURL,
		// 	type: "GET",
		// 	processData: false,
		// 	success: (result) => {
		// 		console.log(result);
		// 		let img = document.createElement('img');
		// 		img.src = 'data:image/jpeg;base64,' + btoa(unescape(encodeURIComponent(result)));
		// 		pDivImages.append(img);
		// 	},
		// 	error: function (jqXHR, textStatus, errorThrown) {
		// 		console.log('buba');
		// 		console.log(errorThrown);
		// 	}
		// });
	}

	content.appendChild(pTitle);
	content.appendChild(pDesc);
	content.appendChild(pDivImages);

	return content;
}