// bing news search from rapidapi see < https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/bing-news-search1?endpoint=apiendpoint_2bef1167-41a0-4a2c-9b49-4be435bf94c5 >
var bingNewsResults = {
	"async": true,
	"crossDomain": true,
	"url": "https://bing-news-search1.p.rapidapi.com/news/search?freshness=Day&q=covid&count=10&textFormat=Raw&safeSearch=Off",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
		"x-rapidapi-key": "46f46b0243msh7a994a14c64f248p1d7d65jsn11182e395fb3",
		"x-bingapis-sdk": "true"
	}
}
$.ajax(bingNewsResults).done(function (response) {
    console.log(response, "Bing news search 10 news articles from past 30 days");
    console.log(response.value);


    var name = response.value[0].name;
    console.log(name);

    var url = response.value[0].url;
    console.log(url);

    var description = response.value[0].description;
    console.log(description);


    for (var i = 0; i < response.value.length; i++) {
        var mynewDiv = $("newDiv") ;

        let newDiv = `<div class=card><span class="card-title"><b>${response.value[i].name}</b></span><br><img src="${response.value[i].image.thumbnail.contentUrl}"alt"${response.value[i].image.name}><div class=card-content><p><b>${response.value[i].provider[0].name}</b></p><p>${response.value[i].description}</p><a href="${response.value[i].url}">Click here to read the full article</a></div></div>`;

        $("section").append(newDiv);

    };

});