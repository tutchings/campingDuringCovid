

console.log(Date.now(), "hello, your javascript is working")

// newsAPI does not work unless server or in browser
// console.log("sample URL structure of News API with Covid articles from last 30 days", "http://newsapi.org/v2/everything?q=covid&from=2020-09-09&sortBy=publishedAt&apiKey=c453b5b715154b56a4081dd94b610d67")

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

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://coronavirus-map.p.rapidapi.com/v1/spots/week?region=south%20carolina",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-map.p.rapidapi.com",
                "x-rapidapi-key": "46f46b0243msh7a994a14c64f248p1d7d65jsn11182e395fb3"
            }
        }
        
        $.ajax(settings).done(function (response) {
            console.log(response, "coronavirus-map week by state or country");
        });