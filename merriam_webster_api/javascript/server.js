var express = require('express');
var serveStatic = require('serve-static');
var http = require('http');
var app = express();
var PORT = 9001;
var https = require("https");
var request = require('request');
var parseString = require('xml2js').parseString;

//general set up 
app.set('port', PORT);
app.use('/', serveStatic( '../', {'index': [ 'index.html' ]}));

//api call 
var API_BASE = 'http://www.dictionaryapi.com/api/v1/references/sd2/xml/';
var args = {
	key: '5590eec7-58b6-40f8-b912-60c2e61c7f6a'
}

app.get('/dictionary/:word', function( req, reply){
	var url = API_BASE + req.params.word + '?' + Object.keys( args ).reduce(function(arr, key, idx) {
		arr.push( key + '=' + args[ key ] );
		return arr;
	}, []).join('&');

	request( url, function( error, response, body ) {
		
		parseString(body, function (err, result) {
		    reply.send( result )
		});
	});
	// request('bread?key=')
});


//create server
http.createServer(app).listen(app.get('port'), 'localhost', function(){
  console.log("Express server listening on port " + app.get('port'));
});








