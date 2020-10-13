$('body').append('<script defer src="https://maps.googleapis.com/maps/api/js?key=' + key + '&callback=initializeMap"></script>');

var map;
var searchInput;
var url;

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

function addMarkers() {
    var marker = new google.maps.Marker({
        position: {lat: markers[0].lat, lng: markers[0].lng}, 
        map: map
    });
}

function searchedMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: mapCenter.lat, lng: mapCenter.lng},
        zoom: 9,
    });
}

$('#searchBtn').on('click', function(event){
    event.preventDefault();

    searchInput = $('#searchInput').val().trim();
    searchInput = searchInput.replace(' ', '+');
    url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + searchInput + '&key=' + key;
    console.log('search input: ', searchInput);
    console.log('url: ', url);


    $.ajax({
        url: url,
        method: "GET"
    }).then(function(response) {
        
        console.log(response);

        mapCenter.lat = response.results[0].geometry.location.lat;
        mapCenter.lng = response.results[0].geometry.location.lng;

        var markerObject = {};
        markerObject.lat = response.results[0].geometry.location.lat;
        markerObject.lng = response.results[0].geometry.location.lng;

        markers = [];
        markers.push(markerObject);

        // markers[0].lat = response.results[0].geometry.location.lat;
        // markers[0].lng = response.results[0].geometry.location.lng;
        

        searchedMap();
        addMarkers();
    })


});


