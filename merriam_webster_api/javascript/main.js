var React = require('react');
var ReactDOM = require('react-dom');
var Emitter = require('event-emitter');
var ee = Emitter({});
var model = require('./model');
var render = require('./renderFunctions');
var makeCall = require('./makeCall');
var xhr = new XMLHttpRequest();
var setgetgo = "http://randomword.setgetgo.com/get.php";
var update = require('./gameFunctions/update.js')

//START
// function start (model, ee) {
// 	render.render (model, ee)
// }

// function GET (url) {
// 	return new Promise (function (resolve, reject){
// 		var xhr = new XMLHttpRequest();
// 			xhr.addEventListener('load', function(data){
// 				resolve(data.currentTarget.response)
// 			});
// 			xhr.open('GET', url);
// 			xhr.send();
// 	});
// }
// function doRequest (url) {
// 	return new Promise (function (reject, resolve) {
// 		GET(url)
// 			.then(function(data){
// 				//then do stuff when data is back
// 				model.word = data;
// 				console.log("here", model.word)
				
// 			}).then(function(){
// 				resolve();	
// 			})
// 	});
// }

// function getDefinition (url) {
// 	return new Promise (function (resolve, reject) {
// 		resolve();
// 	}) 
// }

function renderFactory( cb ) {
	return function() {
		var onCb; 

		if (cb) {
			console.log("before", onCb)
			onCb = cb.apply( null, arguments );
			console.log(onCb)
			console.log("after", onCb)
		}
		if ( onCb.then ) {
			onCb.then(function() {
				render.renderHome (model, ee)
			});
		}
		else {
			render.renderHome (model, ee)
		} 
		// console.log("after", arguments, cb)

		
	}
}
//wrote a seperate function for updating my model

//initial set up 
render.render (model, ee)
// render.renderHome (model, ee)

ee.on('keyClicked', renderFactory( update))

//replace 
// ee.on('buttonClick', renderFactory(doRequest)) 













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



