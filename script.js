$('body').append('<script defer src="https://maps.googleapis.com/maps/api/js?key=' + key + '&callback=initializeMap"></script>');

$(document).ready(function () {
    $('.parallax').parallax();
});

console.log(this);
var map;
var searchInput;
var url;
var stateCode;
var parkName;
var npsURL;

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

// Initialize Modal
$(document).ready(function () {
    $('.modal').modal();
});

function initializeMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: mapCenter.lat, lng: mapCenter.lng },
        zoom: 1,
    });
}

function addMarkers(markers) {
    var marker;
    for (let i = 0; i < markers.length; i++) {
        marker = new google.maps.Marker({
            position: { lat: markers[i].lat, lng: markers[i].lng },
            map: map
        });
    }
}

// Function to create list
function addList() {
    for (let i = 0; i < searchResults.length; i++) {
        parkName = searchResults[i].name;
        var pkBtn = $("<button>");
        pkBtn.addClass("waves-effect waves-light btn-flat btn-large modal-trigger");
        pkBtn.attr({ "href": "#modal1", "data-index": i });
        pkBtn.text(parkName);
        $(".park-list").append(pkBtn);
    }
    //Use an on-click to generate content
}


function searchedMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: mapCenter.lat, lng: mapCenter.lng },
        zoom: 7,
    });
}

$('#searchBtn').on('click', function (event) {
    event.preventDefault();

    searchInput = $('#searchInput').val().trim();
    searchInput = searchInput.replace(' ', '+');
    url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + searchInput + '&key=' + key;


    markers = [];

    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {

        console.log('google maps results', response);

        mapCenter.lat = response.results[0].geometry.location.lat;
        mapCenter.lng = response.results[0].geometry.location.lng;

        var markerObject = {};
        markerObject.lat = response.results[0].geometry.location.lat;
        markerObject.lng = response.results[0].geometry.location.lng;

        markers = [];
        markers.push(markerObject);

        // markers[0].lat = response.results[0].geometry.location.lat;
        // markers[0].lng = response.results[0].geometry.location.lng;


        var addressComponents = response.results[0].address_components;
        console.log('addressComponents:', addressComponents)

        for (var i = 0; i < addressComponents.length; i++) {
            if (addressComponents[i].types[0] === 'administrative_area_level_1') {
                stateCode = addressComponents[i].short_name;
                console.log('stateCode', stateCode);
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


});


