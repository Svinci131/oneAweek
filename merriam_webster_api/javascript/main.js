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
function renderFactory( cb ) {
	return function() {
		//use the apply method to pass the arguments from my emmitter 
		//on my cb function
			//rememeber this: this.props.ee.emit('keyClicked', letter);
		cb.apply( null, arguments );
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


ee.on('buttonClick', function (url) {
	function get (url) {
		return new Promise (function (resolve, reject){
			var xhr = new XMLHttpRequest();
				xhr.addEventListener('load', function(data){

					// model.word = data.currentTarget.response
					// console.log("here", model.word);
					// render.render (model, ee)
					resolve(data.currentTarget.response)
				});
				xhr.open('GET', url);
				xhr.send();
		});
	}
	get(url)
	.then(function(data){
			console.log("Data",data)
		});

});


///////////////Here I'm calling my factory function and passing in a ser











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
			console.log("Data",data)
			resolve();	
		});
	});
}
// dictionary/bread



