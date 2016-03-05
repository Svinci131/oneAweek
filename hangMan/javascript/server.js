var express = require('express');
var serveStatic = require('serve-static');
var http = require('http');
var app = express();
var PORT = 9001;
// var fs = require('fs');

app.set('port', PORT);

// app.use ()
app.use('/', serveStatic( '../', {'index': [ 'index.html' ]}));

app.get('/foo/:id', function(req, reply) {
	reply.send('<h1>Hello</h1>' + req.params.id);
});

// app.get('/bar.html', function(req, reply){

// 	fs.readFile('../index.html', 'utf8', function(err, data){
// 		reply.send(data)
// 	});
// })

http.createServer(app).listen(app.get('port'), 'localhost', function(){
  console.log("Express server listening on port " + app.get('port'));
});
 // 


// var http = require('http');
// var fs = require('fs');

// http.createServer(function(request, response) {
//   response.writeHead(200);
//    fs.readFile("../index.html", function(error, contents){
//     response.write(contents);
//     response.end();
//   });
// }).listen(8080);

//http://www.dictionaryapi.com/api/v1/references/sd2/xml/blue?key=5590eec7-58b6-40f8-b912-60c2e61c7f6a