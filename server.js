var request = require('request');
var express = require('express');

var app = express();
var port = 3016;
var feedURL = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q=https://news.ycombinator.com/rss"

app.get('/', function(req, res){
	request({
	    url: feedURL, //URL to hit
	    method: 'GET',
	}, function(error, response, body){
		if(error) {
	        console.log(error);
	    } 
	    else {
	        if(response.statusCode == 200){
				data = JSON.parse(body).responseData.feed.entries
				console.log(data);
			}
		}
	})
});

app.listen(port);
console.log("Listening to port " + port);
















