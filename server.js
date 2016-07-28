var request = require('request');
var express = require('express');

var app = express();
var port = 3010;
var feedURL = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q=http://feeds.bbci.co.uk/news/rss.xml"

app.get('/rss', function(req, res){
	var mostRecentFeeds = []

	var updateFeeds = function(){
		request({
		    url: feedURL, //URL to hit
		    method: 'GET',
		}, function(error, response, body){
			if(error) {
		        console.log(error);
		    } 
		    else {
		        if(response.statusCode == 200){
					data = JSON.parse(body).responseData.feed.entries;
					if(mostRecentFeeds.length > 0){
						// if mostRecentFeeds contains previous feeds.
						var mostRecentTitle = mostRecentFeeds[0]['title'];
						var stopIndex = 0;
						for(var i=0; i<data.length; i++){
							if(data[i]['title'].localeCompare(mostRecentTitle) == 0){
								// no update yet.
								break;
							}
							else{
								stopIndex = i; 
							}
						}
						// update mostRecentFeeds with data sliced till stopIndex.
						mostRecentFeeds = data.slice(0, stopIndex);

						if(mostRecentFeeds.length > 0){
							// forwards latest feeds to slack bot.
							for(var i=0; i<mostRecentFeeds.length; i++){
								request.post({
								  url: 'https://hooks.slack.com/services/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',
								  headers: {'content-type' : 'application/json'},
								  data: {'text' : mostRecentFeeds[i]['title'] + ' ' + mostRecentFeeds[i]['link']}
								}, function(error, response, body){
								  console.log(body);
								});
							}
						}
					}
					else{
						// init mostRecentFeeds array.
						mostRecentFeeds = data;
					}
					console.log(mostRecentFeeds);
				}
			}
		})
	}
	
	setInterval(updateFeeds, 500000);

	res.send("No worries, it's running.");
});

app.listen(port);
console.log("Listening to port " + port);
















