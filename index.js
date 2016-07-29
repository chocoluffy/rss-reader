var express = require('express');
var Slack = require('node-slack');

var slack = new Slack('https://hooks.slack.com/services/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');

var app = express();
var port = 3010;
var feedURL = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q=http://feeds.bbci.co.uk/news/rss.xml"

app.get('/', function(req, res){
	slack.send({
		text: "hi"
	})
});

app.listen(port);
console.log("Listening to port " + port);
















