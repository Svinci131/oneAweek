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
function doRequest (url, cb) {
	// return new Promise (function (reject, resolve) {
		GET(url)
			.then(function(data){
				//then do stuff when data is back
				
				cb(model, data, getDefinition('dictionary/bread'))
				
				
			}).then(function(){
				// console.log("here", model.word)
			})
	// });
}

//make dorequest setgetgo 
//which takes in set get go 
//which updates the model.word and prints out the word and the string and calls do request
// which prints out the word and the string which calls doreq 

//get dorequest(getDef)
//which prints out foo



function getDefinition (url) {
	return new Promise (function (resolve, reject) {
		GET(url)
			.then(function(data){
				// var def  = {};
				data = JSON.parse( data );
				var arr  = data.entry_list.entry
				model.def = arr;
				

				// console.log("gD", typeof data, data)
			}).then (function(){
				var arr = model.def;
				var def  = {};
				var newObj = Object.keys(arr).map(function(num, i){

					var arrObj = arr[num].def[0].dt[0];
					def[num] = arrObj; 
					// console.log("here", arrObj, num)
				})
				console.log("here", def)
				resolve();
			});
	});

	// return new Promise (function (resolve, reject) {
	// 	resolve();
	// }) 
}



//initial set up 
render.render (model, ee)
render.renderHome (model, ee)

ee.on('keyClicked', renderFactory( update))

//replace 
ee.on('buttonClick', renderFactory(doRequest)) 













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



