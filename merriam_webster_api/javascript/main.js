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
var makeCall = require('./makeCall')
var xhr = new XMLHttpRequest();

//START
render.render (model, ee)
render.renderGameOver(model, ee);
makeCall();

//TEST EE LISTENER
ee.on('buttonClick', function () {
	var setgetgo = "http://randomword.setgetgo.com/get.php"
	var xhr = new XMLHttpRequest();
		xhr.addEventListener('load', function(data){
			model["def"] = data.currentTarget.response
			console.log("here", data.currentTarget.response);
		});
		xhr.open('GET', setgetgo);
		xhr.send();
});


function renderFactory( cb ) {
	console.log("here", cb.prototype)
	//return this function
	return function() {
		//which calls the call back and adds the args to it? 
		cb.apply( null, arguments );

		// var onCb;
		// if ( cb ) {
		//initially set up onCb as cb function with args
		// 	onCb = cb.apply( null, arguments );
		// }
		//if its the second then do all this stuff 
		// // if ( onCb.then ) {
		// // 	onCb.then(function() {
		// // 		render.render(Model, ee);
		// // 	});
		// // }
		// else {
		// 	//call 
		// 	render.render(model, ee);
		// }	
	}
}

ee.on('keyClicked', renderFactory(updateClicked));

function updateClicked (letter) {
	gameFunctions.check (model, letter)
	if (model.numGuesses === 0 || model.rightGuesses === model.word.length){
		console.log("OVER")
	  	render.renderGameOver(model, ee);
	}
	else {
		render.render (model, ee)
	}
}









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



