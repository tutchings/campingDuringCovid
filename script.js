

console.log(Date.now(), "hello, your javascript is working")

// newsAPI does not work unless server or in browser

// bing news search from rapidapi see < https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/bing-news-search1?endpoint=apiendpoint_2bef1167-41a0-4a2c-9b49-4be435bf94c5 >
var bingNewsResults = {
	"async": true,
	"crossDomain": true,
	"url": "https://bing-news-search1.p.rapidapi.com/news/search?freshness=Day&q=covid&count=5&textFormat=Raw&safeSearch=Off",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
		"x-rapidapi-key": "46f46b0243msh7a994a14c64f248p1d7d65jsn11182e395fb3",
		"x-bingapis-sdk": "true"
	}
}
$.ajax(bingNewsResults).done(function (response1) {
    console.log(response1, "Bing news search 5 news articles from past 30 days");
});



// add for loop here for populating html (could use a card or a list)
// $.ajax(settings).done(function (response) {
//     console.log(response);
    
//     for (var i = 0; i < response.length; i++) {
//         var element = response[i];
//         var newLi = $("<li>")
//         $(newLi).addClass()
//     }

    
//     $(".headlines").append(card)

// });

// covid search but no maps, see < https://corona.lmao.ninja/docs/#/COVID-19%3A%20JHUCSSE/get_v3_covid_19_jhucsse_counties__county_ >
var county = "Beaufort";

      // Constructing a queryURL using the animal name
      var queryURL = "https://disease.sh/v3/covid-19/jhucsse/counties/" + county;

      // Performing an AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After data comes back from the request
        .then(function(response) {
          console.log(queryURL);

          console.log(response, "jhu covid api results");
          // storing the data from the AJAX request in the results variable
        //   var results = response.data;

        //   // Looping through each result item
        //   for (var i = 0; i < results.length; i++) {

        //     // Creating and storing a div tag
        //     var countyDiv = $("<div>");

        //     // Creating a paragraph tag with the result item's rating
        //     var p = $("<p>").text("Rating: " + results[i].rating);

        //     // Creating and storing an image tag
        //     var countyImage = $("<img>");
        //     // Setting the src attribute of the image to a property pulled off the result item
        //     countyImage.attr("src", results[i].images.fixed_height.url);

        //     // Appending the paragraph and image tag to the animalDiv
        //     countyDiv.append(p);
        //     countyDiv.append(countyImage);

        //     // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        //     $("#gifs-appear-here").prepend(countyDiv);
        //   }
        });

        // covid data from < https://rapidapi.com/Yatko/api/coronavirus-map?endpoint=apiendpoint_6c397b43-e924-4a95-85ee-9a2af405099c >
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://coronavirus-map.p.rapidapi.com/v1/spots/week?region=north%20carolina",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-map.p.rapidapi.com",
                "x-rapidapi-key": "46f46b0243msh7a994a14c64f248p1d7d65jsn11182e395fb3"
            }
        }
        
        $.ajax(settings).done(function (response) {
            console.log(response, "coronavirus-map week by state or country");
        });

        // var settings2 = {
        //     "async": true,
        //     "crossDomain": true,
        //     "url": "https://coronavirus-map.p.rapidapi.com/v1/spots/summary",
        //     "method": "GET",
        //     "headers": {
        //         "x-rapidapi-host": "coronavirus-map.p.rapidapi.com",
        //         "x-rapidapi-key": "46f46b0243msh7a994a14c64f248p1d7d65jsn11182e395fb3"
        //     }
        // }
        
        // $.ajax(settings).done(function (response) {
        //     console.log(response);
        // });

        var state1 = "nc";
        var urlByState = "https://api.covidtracking.com/v1/states/" + state1 + "/info.json"
        $.ajax({
            url: urlByState,
            method: "GET"
          })
          .then(function(response) {
            console.log(queryURL);
  
            console.log(response, "by state live covid data");
        });