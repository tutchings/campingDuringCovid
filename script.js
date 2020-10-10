// Set Variables

var APIkey = "2QOl3ZbVjUkPb9LU91TKb48NWLSI7Eay1i2EZteX";
var stateCode = "";
var queryURL = "";


// jQuery Dropdown Initializer
$('.dropdown-trigger').dropdown();

// jQuery Modal Initializer

$('.modal').modal();


// Dropdown Selection, Console Logging Results

$(".state").on("click", function () {
    stateCode += $(this).text();

    var queryURL = "https://developer.nps.gov/api/v1/parks?statecode=" + stateCode + "&api_key=" + APIkey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function run(results) {
            console.log("URL", queryURL);
            console.log("Dropdown selection results", results);
        });

});