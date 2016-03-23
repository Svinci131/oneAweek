var React = require('react');
var ReactDOM = require('react-dom');
var Emitter = require('event-emitter');
var ee = Emitter({});
var model = {
	word: "test",
	numGuesses: 7,
	keysGuessed: {},
	rightGuesses: 0
}
var gameFunctions= require('./gameFunctions');
var render = require('./renderFunctions')
var makeCall = require('./makeCall')
var xhr = new XMLHttpRequest();
var setgetgo = "http://randomword.setgetgo.com/get.php"
//START

function start (model, ee) {
	render.render (model, ee)
}

function get (url) {
	return new Promise (function (resolve, reject){
		var xhr = new XMLHttpRequest();
			xhr.addEventListener('load', function(data){
				resolve(data.currentTarget.response)
			});
			xhr.open('GET', url);
			xhr.send();
	});
}
function doRequest (url) {
	get(url)
		.then(function(data){
			//then do stuff when data is back
			model.word = data;
		}).then (function(){
			//then render game
			render.render (model, ee)
		});
}



function renderFactory( cb ) {
		return function() {
		//defines oncall back 
		var onCb;
		//if it's t
		if ( cb ) {
			onCb = cb.apply( null, arguments );
		}

		if ( onCb.then ) {
			onCb.then(function() {
				render();
			});
		}
		else {
			render();
		}
	}
}
//wrote a seperate function for updating my model
function update(letter) {
	gameFunctions.check (model, letter)
	if (model.numGuesses === 0 || model.rightGuesses === model.word.length){
		console.log("OVER")
	  	render.renderHome(model, ee);
	}
	else {
		render.render (model, ee)
	}
}
//initially 
render.renderHome (model, ee)

//calling my generic factory function on key click
//and pass in my new function as an argument
ee.on('keyClicked', renderFactory( update))


//this is ok for the first api call- but not very reusable
//on start click
ee.on('buttonClick', function (url) {
	//make call 
	doRequest (url) 
});

///////////////Here I'm calling my factory function and passing in a ser











//make api call- generic functions
// function GET (url) {
// 	return new Promise (function(reject, resolve){
// 		xhr.addEventListener('load', function(e){
// 			var data = JSON.parse( e.currentTarget.response );
// 			resolve(data)
// 		});
// 		xhr.addEventListener('fail', function(e){
// 			reject( e );
// 		});
// 		xhr.open('GET', url);
// 		xhr.send();
// 	});
// }
// function doRequest (url) {
// 	return new Promise (function (reject, resolve) {
// 		GET( url )
// 		.then(function(data){
// 			console.log("Data",data)
// 			resolve();	
// 		});
// 	});
// }
// dictionary/bread



