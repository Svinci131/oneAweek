var React = require('react');
var ReactDOM = require('react-dom');
//require event emitter
var Emitter = require('event-emitter');
//create new ee object
var ee = Emitter({});
var KeyBoard = require('./keyBoard');
var Dashes = require('./dashes');
var HangMan = require('./hangMan')
var model = {
	word: "test",
	numGuesses: 7,
	keysGuessed: {},
	rightGuesses: 0
}
//functions
var gameFunctions= require('./gameFunctions');
var render = require('./renderFunctions')
var xhr = new XMLHttpRequest();




//START
render.render (model, ee)
//TEST EE LISTENER
ee.on('buttonClick', function (word) {
	console.log (word)
});

ee.on('keyClicked', function (letter) {
	gameFunctions.check (model, letter)
	if (model.numGuesses === 0 || model.rightGuesses === model.word.length){
		console.log("OVER")
	  	render.renderGameOver(model, ee);
	}
	else {
		render.render (model, ee)
	}
});









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



