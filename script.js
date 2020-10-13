//Variables for map
var newScript = $("<script>")
newScript.attr({ "src": "https://maps.googleapis.com/maps/api/js?key=" + key + "&callback=initializeMap" });
$('body').append(newScript)

var map;
var searchInput;
var url;

//Variables for state/index
var APIkey = "2QOl3ZbVjUkPb9LU91TKb48NWLSI7Eay1i2EZteX";
var stateCode = "";
var queryURL = "";
var distance;
var searchResults = [];

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
        center: { lat: mapCenter.lat, lng: mapCenter.lng },
        zoom: 1,
    });
}

function addMarkers() {
    var marker = new google.maps.Marker({
        position: { lat: markers[0].lat, lng: markers[0].lng },
        map: map
    });
}

function searchedMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: mapCenter.lat, lng: mapCenter.lng },
        zoom: 9,
    });
}

// Thomas's crazy awesome calculateDistance code
function calculateDistance(lat1, lng1, lat2, lng2) {
    var lat1Rad = lat1 / 57.29577951;
    var lng1Rad = lng1 / 57.29577951;

    var lat2Rad = lat2 / 57.29577951;
    var lng2Rad = lng2 / 57.29577951;

    var distance = 3963 * Math.acos((Math.sin(lat1Rad) * Math.sin(lat2Rad)) + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.cos(lng2Rad - lng1Rad));

    distance = distance.toFixed(2);

    return distance;

}

function sort(a, b) {
    var distancea = a.distance;
    var distanceb = b.distance;

    var sort = 0;
    if (distancea > distanceb) {
        sort = 1;
    } else if (distancea < distanceb) {
        sort = -1;
    }

    return sort;
}


$('#searchBtn').on('click', function (event) {

    searchInput = $('#searchInput').val().trim();
    searchInput = searchInput.replace(' ', '+');
    url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + searchInput + '&key=' + key;
    console.log('search input: ', searchInput);
    console.log('url: ', url);


    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {

        console.log("response:", response);

        mapCenter.lat = response.results[0].geometry.location.lat;
        mapCenter.lng = response.results[0].geometry.location.lng;

        var markerObject = {};
        markerObject.lat = response.results[0].geometry.location.lat;
        markerObject.lng = response.results[0].geometry.location.lng;

        markers = [];
        markers.push(markerObject);

        // markers[0].lat = response.results[0].geometry.location.lat;
        // markers[0].lng = response.results[0].geometry.location.lng;

        // response.results.address_components.types["administrative_area_level_1"]


        var shortName = "";

        // If level = administrative_area_level_1, console log "it's a state"
        // If it's locality, console log "it's a locality", etc etc etc

        if (response.results[0].address_components[0].types[0] === "administrative_area_level_1") {
            console.log("it's a state");

            // Getting the short_name from the search results to provide the state code which can be used to pull NPS results
            shortName = response.results[0].address_components[0].short_name;
            console.log("shortName:", shortName);

            var queryURL = "https://developer.nps.gov/api/v1/parks?statecode=" + shortName + "&api_key=" + APIkey;

            $.ajax({
                url: queryURL,
                method: "GET"
            })

                .then(function run(results) {
                    console.log("URL", queryURL);
                    console.log("NPS results for that state:", results);

                    for (var i = 0; i < results.data.length; i++) {
                        var lat1 = results.data[i].latitude;
                        var lng1 = results.data[i].longitude;

                        var lat2 = 44.4280;
                        var lng2 = -110.5885;

                        distance = calculateDistance(lat1, lng1, lat2, lng2);

                        searchResults[i] = {
                            name: results.data[i].fullName,
                            latLng: results.data[i].latLong,
                            distance: distance
                        }
                    }
                    searchResults = searchResults.sort(sort);
                    console.log('sorted searchResults:', searchResults);
                });
        }

        //If you search for a city, the state shortname will be in a different spot. Go and fetch it there instead:
        else if (response.results[0].address_components[0].types[0] === "locality") {
            console.log("it's a locality");
            shortName = response.results[0].address_components[2].short_name;
            console.log("shortName:", shortName);

            var queryURL = "https://developer.nps.gov/api/v1/parks?statecode=" + shortName + "&api_key=" + APIkey;

            $.ajax({
                url: queryURL,
                method: "GET"
            })

                .then(function run(results) {
                    console.log("URL", queryURL);
                    console.log("NPS results for that state:", results);

                    for (var i = 0; i < results.data.length; i++) {
                        var lat1 = results.data[i].latitude;
                        var lng1 = results.data[i].longitude;

                        var lat2 = 44.4280;
                        var lng2 = -110.5885;

                        distance = calculateDistance(lat1, lng1, lat2, lng2);

                        searchResults[i] = {
                            name: results.data[i].fullName,
                            latLng: results.data[i].latLong,
                            distance: distance
                        }
                    }
                    searchResults = searchResults.sort(sort);
                    console.log('sorted searchResults:', searchResults);
                });
        }

        else if (response.results[0].address_components[0].types[0] === "street_number") {
            console.log("it's a street number");
            shortName = response.results[0].address_components[6].short_name;
            console.log("shortName:", shortName);

            var queryURL = "https://developer.nps.gov/api/v1/parks?statecode=" + shortName + "&api_key=" + APIkey;

            $.ajax({
                url: queryURL,
                method: "GET"
            })

                .then(function run(results) {
                    console.log("URL", queryURL);
                    console.log("NPS results for that state:", results);

                    for (var i = 0; i < results.data.length; i++) {
                        var lat1 = results.data[i].latitude;
                        var lng1 = results.data[i].longitude;

                        var lat2 = 44.4280;
                        var lng2 = -110.5885;

                        distance = calculateDistance(lat1, lng1, lat2, lng2);

                        searchResults[i] = {
                            name: results.data[i].fullName,
                            latLng: results.data[i].latLong,
                            distance: distance
                        }
                    }
                    searchResults = searchResults.sort(sort);
                    console.log('sorted searchResults:', searchResults);
                });
        }
        else if (response.results[0].address_components[0].types[0] === "route") {
            console.log("it's a route");
            shortName = response.results[0].address_components[4].short_name;
            console.log("shortName:", shortName);

            var queryURL = "https://developer.nps.gov/api/v1/parks?statecode=" + shortName + "&api_key=" + APIkey;

            $.ajax({
                url: queryURL,
                method: "GET"
            })

                .then(function run(results) {
                    console.log("URL", queryURL);
                    console.log("NPS results for that state:", results);

                    for (var i = 0; i < results.data.length; i++) {
                        var lat1 = results.data[i].latitude;
                        var lng1 = results.data[i].longitude;

                        var lat2 = 44.4280;
                        var lng2 = -110.5885;

                        distance = calculateDistance(lat1, lng1, lat2, lng2);

                        searchResults[i] = {
                            name: results.data[i].fullName,
                            latLng: results.data[i].latLong,
                            distance: distance
                        }
                    }
                    searchResults = searchResults.sort(sort);
                    console.log('sorted searchResults:', searchResults);
                });
        }
        else if (response.results[0].address_components[0].types[0] === "administrative_area_level_2") {
            console.log("it's a county");
            shortName = response.results[0].address_components[1].short_name;
            console.log("shortName:", shortName);

            var queryURL = "https://developer.nps.gov/api/v1/parks?statecode=" + shortName + "&api_key=" + APIkey;

            $.ajax({
                url: queryURL,
                method: "GET"
            })

                .then(function run(results) {
                    console.log("URL", queryURL);
                    console.log("NPS results for that state:", results);

                    for (var i = 0; i < results.data.length; i++) {
                        var lat1 = results.data[i].latitude;
                        var lng1 = results.data[i].longitude;

                        var lat2 = 44.4280;
                        var lng2 = -110.5885;

                        distance = calculateDistance(lat1, lng1, lat2, lng2);

                        searchResults[i] = {
                            name: results.data[i].fullName,
                            latLng: results.data[i].latLong,
                            distance: distance
                        }
                    }
                    searchResults = searchResults.sort(sort);
                    console.log('sorted searchResults:', searchResults);
                });
        }
        else if (response.results[0].address_components[0].types[0] === "neighborhood") {
            console.log("it's a neighborhood");
            shortName = response.results[0].address_components[4].short_name;
            console.log("shortName:", shortName);

            var queryURL = "https://developer.nps.gov/api/v1/parks?statecode=" + shortName + "&api_key=" + APIkey;

            $.ajax({
                url: queryURL,
                method: "GET"
            })

                .then(function run(results) {
                    console.log("URL", queryURL);
                    console.log("NPS results for that state:", results);

                    for (var i = 0; i < results.data.length; i++) {
                        var lat1 = results.data[i].latitude;
                        var lng1 = results.data[i].longitude;

                        var lat2 = 44.4280;
                        var lng2 = -110.5885;

                        distance = calculateDistance(lat1, lng1, lat2, lng2);

                        searchResults[i] = {
                            name: results.data[i].fullName,
                            latLng: results.data[i].latLong,
                            distance: distance
                        }
                    }
                    searchResults = searchResults.sort(sort);
                    console.log('sorted searchResults:', searchResults);
                });
        }
        else if (response.results[0].address_components[0].types[0 || 1 || 2] === 'establishment') {
            console.log("it's an establishment");
            shortName = response.results[0].address_components[6].short_name;
            console.log("shortName:", shortName);

            var queryURL = "https://developer.nps.gov/api/v1/parks?statecode=" + shortName + "&api_key=" + APIkey;

            $.ajax({
                url: queryURL,
                method: "GET"
            })

                .then(function run(results) {
                    console.log("URL", queryURL);
                    console.log("NPS results for that state:", results);

                    for (var i = 0; i < results.data.length; i++) {
                        var lat1 = results.data[i].latitude;
                        var lng1 = results.data[i].longitude;

                        var lat2 = 44.4280;
                        var lng2 = -110.5885;

                        distance = calculateDistance(lat1, lng1, lat2, lng2);

                        searchResults[i] = {
                            name: results.data[i].fullName,
                            latLng: results.data[i].latLong,
                            distance: distance
                        }
                    }
                    searchResults = searchResults.sort(sort);
                    console.log('sorted searchResults:', searchResults);
                });
        }

        else {
            console.log("we don't recognize your search");
        }

        searchedMap();
        addMarkers();

    })


});

// Dropdown Selection, Console Logging Results

