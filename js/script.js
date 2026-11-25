/*
  Gavin Lao - Project 3
  One script for all four pages. It is linked from the head with defer, so it
  runs after the page is parsed. Each feature checks that its element exists
  first, so no page throws an error.
*/
(function () {
  "use strict";

  var API_KEY = "AIzaSyBM1F-BpX660SBK3-Vw9O9f7AEvTAIH8rI";
  var EMAIL = "gavin.theodore.lao@gmail.com";
  var CHICAGO = { lat: 41.8781, lng: -87.6298 };
  var map = null;
  var userMarkers = [];

  // Questions button: two line alert
  function setUpQuestionsButton() {
    var button = document.getElementById("questions-btn");
    if (!button) {
      return;
    }
    button.addEventListener("click", function () {
      alert("If you have questions, contact me at:\n" + EMAIL);
    });
  }

  // Clear button: removes every pin the visitor dropped
  function setUpClearButton() {
    var button = document.getElementById("clear-pins");
    if (!button) {
      return;
    }
    button.addEventListener("click", function () {
      userMarkers.forEach(function (marker) {
        marker.setMap(null);
      });
      userMarkers = [];
    });
  }

  // Google Maps callback. Base map plus three added features.
  function initMap() {
    var container = document.getElementById("map");
    if (!container || !window.google || !window.google.maps) {
      return;
    }

    map = new google.maps.Map(container, {
      center: CHICAGO,
      zoom: 12,
      mapTypeControl: true
    });

    // Feature 1: custom marker (bouncing, with a hover title)
    var homeMarker = new google.maps.Marker({
      position: CHICAGO,
      map: map,
      title: "Downtown Chicago",
      animation: google.maps.Animation.DROP
    });

    // Feature 2: info window that opens when the marker is clicked
    var infoWindow = new google.maps.InfoWindow({
      content: "<strong>Chicago, Illinois</strong><br>Where I live, train, and work."
    });
    homeMarker.addListener("click", function () {
      infoWindow.open({ anchor: homeMarker, map: map });
    });

    // Feature 3: click anywhere on the map to drop a numbered pin
    map.addListener("click", function (event) {
      var pin = new google.maps.Marker({
        position: event.latLng,
        map: map,
        label: String(userMarkers.length + 1)
      });
      userMarkers.push(pin);
    });
  }

  // Load the Maps API from this file so the HTML stays free of inline scripts
  function loadMaps() {
    if (!document.getElementById("map")) {
      return;
    }
    window.initMap = initMap;
    var script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + API_KEY +
      "&callback=initMap";
    script.async = true;
    document.head.appendChild(script);
  }

  setUpQuestionsButton();
  setUpClearButton();
  loadMaps();
})();
