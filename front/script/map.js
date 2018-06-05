var map;
let popups = [];

window.onload = init();

function init() {
  var script = document.createElement("script");
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyDamjhWg7wcyotS8tgBoI69RFOx9onVpDs&callback=initMap";
  document.head.appendChild(script);

  addPopupsToMap();
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.866, lng: 151.196 },
    zoom: 8
  });
}

function addPopupsToMap(){
    popup = new Popup(
        new google.maps.LatLng(-33.866, 151.196),
        document.getElementById('popups'));
    popup.setMap(map);
}