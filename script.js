$('body').append('<script defer src="https://maps.googleapis.com/maps/api/js?key=' + key + '&callback=initializeMap"></script>');

console.log(window);
var map;
var searchInput;
var url;
var stateCode;
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



function initializeMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: mapCenter.lat, lng: mapCenter.lng},
        zoom: 1,
    });
}

function addMarkers(markers) {
    var marker;
    for (let i = 0; i < markers.length; i++) {
        marker = new google.maps.Marker({
            position: {lat: markers[i].lat, lng: markers[i].lng}, 
            map: map
        });
    }
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
    
    
    markers = [];

    $.ajax({
        url: url,
        method: "GET"
    }).then(function(response) {
        
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
        
        if (response.results[0].address_components[0].types[0] === "administrative_area_level_1") {
            
            console.log("it's a state");

            // Getting the short_name from the search results to provide the state code which can be used to pull NPS results
            stateCode = response.results[0].address_components[0].short_name;
            console.log('stateCode:', stateCode)

        } else if (response.results[0].address_components[0].types[0] === "locality") {
            
            console.log("it's a locality");
            stateCode = response.results[0].address_components[2].short_name;
            console.log('stateCode:', stateCode)
            
        } else if (response.results[0].address_components[0].types[0] === "street_number") {
            
            console.log("it's a street number");
            stateCode = response.results[0].address_components[6].short_name;
            console.log('stateCode:', stateCode)

        } else if (response.results[0].address_components[0].types[0] === "route") {

            console.log("it's a route");
            stateCode = response.results[0].address_components[4].short_name;
            console.log('stateCode:', stateCode)

        } else if (response.results[0].address_components[0].types[0] === "administrative_area_level_2") {

            console.log("it's a county");
            stateCode = response.results[0].address_components[1].short_name;
            console.log('stateCode:', stateCode)

        } else if (response.results[0].address_components[0].types[0] === "neighborhood") {

            console.log("it's a neighborhood");
            stateCode = response.results[0].address_components[4].short_name;
            console.log('stateCode:', stateCode)

        } else if (response.results[0].address_components[0].types[0 || 1 || 2] === 'establishment') {

            console.log("it's an establishment");
            stateCode = response.results[0].address_components[6].short_name;
            console.log('stateCode:', stateCode)
        } else {
            console.log("we don't recognize your search");
        }

        npsURL = "https://developer.nps.gov/api/v1/parks?statecode=" + stateCode + "&api_key=" + npsAPIkey;

        npsResults(npsURL);
        searchedMap();
        // addMarkers();
    })


});


