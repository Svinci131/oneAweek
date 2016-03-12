var React = require('react');
var ReactDOM = require('react-dom');
var ee = require('event-emitter');
var xhr = new XMLHttpRequest();

//make api call- generic functions
function GET (url) {
	return new Promise (function(reject, resolve){
		xhr.addEventListener('load', function(e){
			var data = JSON.parse( e.currentTarget.response );
			resolve(data)
		});
		xhr.addEventListener('fail', function(e){
			reject( e );
		});
		xhr.open('GET', url);
		xhr.send();
	});
}
function doRequest (url) {
	return new Promise (function (reject, resolve) {
		GET( url )
		.then(function(data){
			console.log(data)
			resolve();	
		});
	});
}
// dictionary/bread

ReactDOM.render(
	<h1>HangMan</h1>,
	document.getElementById('title')
);

