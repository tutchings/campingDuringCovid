$('body').append('<script defer src="https://maps.googleapis.com/maps/api/js?key=' + key + '&callback=initializeMap"></script>');

$(document).ready(function () {
    $('.parallax').parallax();
    $('.sidenav').sidenav();
});

// console.log(this);
var map;
var searchInput;
var url;
var stateCode;
var npsURL;
var youAreHere = 'youAreHere.png'
var mqCityState;

// Initialize Modal
$(document).ready(function () {
    $('.modal').modal();
});

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

function currentLocation(position) {
    var mqLat = position.coords.latitude;
    var mqLng = position.coords.longitude;
    var mqCoords = mqLat + ',' + mqLng;
    console.log('mqCoords:', mqCoords);

    var mqURL = 'http://www.mapquestapi.com/geocoding/v1/reverse?key=' + mqKey + '&location=' + mqCoords;

    $.ajax({
        url: mqURL,
        method: "GET"
    }).then(function (response) {
        console.log('mqresponse', response);

        var mqState = response.results[0].locations[0].adminArea3;
        var mqCity = response.results[0].locations[0].adminArea5;
        mqCityState = mqCity + ' ' + mqState;
        mqCityState = mqCityState.replace(' ', '+');
        console.log('mqCityState:', mqCityState)


        runApplication();
    })



}

function initializeMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: mapCenter.lat, lng: mapCenter.lng },
        zoom: 1,
    });
}

function addMarkers(markers) {
    var marker = [];

    marker[0] = new google.maps.Marker({
        position: { lat: markers[0].lat, lng: markers[0].lng },
        map: map,
        icon: youAreHere,
        title: markers[0].park,
    });
    marker[0].addListener('click', function (event) {
        // event.preventDefault();
        markers[0].createInfoWindow.open(map, marker[0]);
    });

    for (let i = 1; i < markers.length; i++) {
        marker[i] = new google.maps.Marker({
            position: { lat: markers[i].lat, lng: markers[i].lng },
            map: map,
            title: markers[i].park,
        });
        marker[i].addListener('click', function (event) {
            // event.preventDefault();
            markers[i].createInfoWindow.open(map, marker[i]);
        });
    }
}

function addList() {
    for (let i = 0; i < searchResults.length; i++) {
        parkName = searchResults[i].name;
        var pkBtn = $("<button>");
        pkBtn.addClass("waves-effect waves-light btn-flat btn-large modal-trigger");
        pkBtn.attr({ "href": "#modal1", "data-index": i });
        pkBtn.text(parkName);
        $(".park-list").append(pkBtn);

        //Function to populate modal
        pkBtn.click(function () {
            $(".park-name").empty();
            $(".distance").empty();
            $(".images").empty();
            $(".description").empty();
            $(".NPSurl").empty();

            $(".park-name").append(searchResults[i].name);
            $(".distance").append(Math.round(searchResults[i].distance) + ' Miles Away');
            $(".images").attr('src', searchResults[i].images);
            $(".description").append(searchResults[i].description1);
            $(".NPSurl").append(searchResults[i].name + ' Online');
            $(".NPSurl").attr('href', searchResults[i].url);
        });
    }
}

function searchedMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: mapCenter.lat, lng: mapCenter.lng },
        zoom: 7,
    });
}

function runApplication() {

    if ($('#searchInput').val()) {
        searchInput = $('#searchInput').val().trim();
        searchInput = searchInput.replace(' ', '+');
        console.log('searchInput:', searchInput)
        $('#searchInput').val('');
        url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + searchInput + '&key=' + key;
    } else {
        url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + mqCityState + '&key=' + key;
    }

    markers = [];

    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {

        // console.log('google maps results', response);

        mapCenter.lat = response.results[0].geometry.location.lat;
        mapCenter.lng = response.results[0].geometry.location.lng;

        var markerObject = {};
        markerObject.lat = response.results[0].geometry.location.lat;
        markerObject.lng = response.results[0].geometry.location.lng;
        markerObject.park = 'Searched Location';
        markerObject.distance = '0 Miles Away';
        markerObject.infoHTML = '<div id="markerContent">' + '<h4>' + markerObject.park + '</h4>' + '<p>' + markerObject.distance + '</p>' + '</div>';
        markerObject.createInfoWindow = new google.maps.InfoWindow({
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
        addList();
        // addMarkers();
    })
}


$('#searchBtn').on('click', runApplication);


$('#currentLocationBtn').on('click', function (event) {
    event.preventDefault();

    markers = [];

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(currentLocation);
    }

});


