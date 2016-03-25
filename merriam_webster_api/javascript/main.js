var React = require('react');
var ReactDOM = require('react-dom');
var Emitter = require('event-emitter');
var ee = Emitter({});
var model = require('./model');
var render = require('./renderFunctions');
var xhr = new XMLHttpRequest();
var GET = require('./gameFunctions/get');
var check = require('./gameFunctions/check');

function renderFactory( cb ) {
	return function() {
		// cb.apply( null, arguments );
		var onCb;
		if ( cb ) {
			onCb = cb.apply( null, arguments );
		}

		if ( onCb.then ) {
			onCb.then(function() {
				render.render (model, ee)
			});
		}
		else {
			render.render (model, ee)
		}
		
	}
}

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
//set up functions
function getWord (url, cb) {
	return new Promise (function (reject, resolve) {
		GET(url)
			.then(function(data){
				console.log("broke out")
				model.word = data;
				getDefinition('dictionary/bread');
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



