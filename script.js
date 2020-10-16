$('body').append('<script defer src="https://maps.googleapis.com/maps/api/js?key=' + key + '&callback=initializeMap"></script>');

$(document).ready(function(){
    $('.parallax').parallax();
  });

// console.log(this);
var map;
var searchInput;
var url;
var stateCode;
var npsURL;
var youAreHere = 'youAreHere.png'

//lat and lng info
//positve lat = North
//negative lat = South
//positive lng = east
//negative lng = west

var mapCenter = {
    lat: 44.4280,
    lng: -110.5885
};

var markers = [];



function initializeMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: mapCenter.lat, lng: mapCenter.lng},
        zoom: 1,
    });
}

function addMarkers(markers) {
    var marker = [];

    marker[0] = new google.maps.Marker({
        position: {lat: markers[0].lat, lng: markers[0].lng}, 
        map: map,
        icon: youAreHere,
        title: markers[0].park,
    });
    marker[0].addListener('click', function(event) {
        // event.preventDefault();
        markers[0].createInfoWindow.open(map, marker[0]);
    });

    for (let i = 1; i < markers.length; i++) {
        marker[i] = new google.maps.Marker({
            position: {lat: markers[i].lat, lng: markers[i].lng}, 
            map: map,
            title: markers[i].park,
        });
        marker[i].addListener('click', function(event) {
            // event.preventDefault();
            markers[i].createInfoWindow.open(map, marker[i]);
        });
    }
}


function addMarkerLabels(markers) {

}

function searchedMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: mapCenter.lat, lng: mapCenter.lng},
        zoom: 7,
    });
}

$('#searchBtn').on('click', function(event){
    event.preventDefault();

    searchInput = $('#searchInput').val().trim();
    searchInput = searchInput.replace(' ', '+');
    url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + searchInput + '&key=' + key;
    
    
    markers = [];

    $.ajax({
        url: url,
        method: "GET"
    }).then(function(response) {
        
        // console.log('google maps results', response);

        mapCenter.lat = response.results[0].geometry.location.lat;
        mapCenter.lng = response.results[0].geometry.location.lng;

        var markerObject = {};
        markerObject.lat = response.results[0].geometry.location.lat;
        markerObject.lng = response.results[0].geometry.location.lng;
        markerObject.park = 'Your Location';
        markerObject.distance = '0 Miles Away';
        markerObject.infoHTML = '<div id="content">' + '<div id="siteNotice">' + '</div>' + '<h4>' + markerObject.park + '</h4>' + '<p>' + markerObject.distance + '</p>';
        markerObject.createInfoWindow = new google.maps.InfoWindow( {
            content: markerObject.infoHTML
        });

        markers = [];
        markers.push(markerObject);

        // markers[0].lat = response.results[0].geometry.location.lat;
        // markers[0].lng = response.results[0].geometry.location.lng;
        

        var addressComponents = response.results[0].address_components;
        // console.log('addressComponents:', addressComponents)

        for (var i = 0; i < addressComponents.length; i++) {
            if (addressComponents[i].types[0] === 'administrative_area_level_1') {
                stateCode = addressComponents[i].short_name;
                // console.log('stateCode', stateCode);
                break;
            }
            
        }
        
        runCovid(stateCode);

        npsURL = "https://developer.nps.gov/api/v1/parks?statecode=" + stateCode + "&api_key=" + npsAPIkey;

        npsResults(npsURL);
        searchedMap();
        // addMarkers();
    })


});


