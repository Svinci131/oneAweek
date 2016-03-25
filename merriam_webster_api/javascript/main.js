var React = require('react');
var ReactDOM = require('react-dom');
var Emitter = require('event-emitter');
var ee = Emitter({});
var model = require('./model');
var render = require('./renderFunctions');
var makeCall = require('./makeCall');
var xhr = new XMLHttpRequest();
var check = require('./gameFunctions/check');

function renderFactory( cb ) {
	return function() {
		var onCb; 

		// if (cb) {
			cb.apply( null, arguments );
		// 	onCb = cb.apply( null, arguments );
		// 	console.log(onCb)
		// 	console.log("after", onCb)
		// }
		// if ( onCb.then ) {
		// 	onCb.then(function() {
		// 		render.renderHome (model, ee)
		// 	});
		// }
		// else {
		// 	render.renderHome (model, ee)
		// } 
		// console.log("after", arguments, cb)

		
	}
}
function GET (url) {
	return new Promise (function (resolve, reject){
		var xhr = new XMLHttpRequest();
			xhr.addEventListener('load', function(data){
				resolve(data.currentTarget.response)
			});
			xhr.open('GET', url);
			xhr.send();
	});
}
function getWord (url, cb) {
	return new Promise (function (reject, resolve) {
		GET(url)
			.then(function(data){
				cb(model, data, getDefinition('dictionary/bread'))
			}).then (function(){
				console.log("4")
				render.render (model, ee);
				resolve();
			});
	});
}

function getDefinition (url) {
	return new Promise (function (resolve, reject) {
		GET(url)
			.then(function(data){
				data = JSON.parse( data );
				var arr  = data.entry_list.entry
				var def  = {};
				var newObj = Object.keys(arr).map(function(num, i){
					var arrObj = arr[num].def[0].dt[0];
					if (typeof arrObj === "object") {
						arrObj = arrObj._
					}
					def[num] = arrObj; 
				})
				model.def = def;
				console.log("here", model)
				resolve();
			 });
	});
}



//initial start button
render.renderHome (model, ee)

ee.on('keyClicked', renderFactory(check))
ee.on('buttonClick', renderFactory(getWord)) 













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



