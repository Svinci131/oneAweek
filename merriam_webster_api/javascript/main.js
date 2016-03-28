var React = require('react');
var ReactDOM = require('react-dom');
var Emitter = require('event-emitter');
var ee = Emitter({});
var model = require('./model');
var render = require('./renderFunctions');
var getWord = require('./gameFunctions/getWord');
var check = require('./gameFunctions/check');

function renderFactory( cb ) {
	return function() {
		var onCb;
		if ( cb ) {
			//like we did before except we set onCB to be 
			//the promise object our function returns 
			onCb = cb.apply( null, arguments );
		}
		//rerender our page
		onCb.then(function() {
			render.renderBoard (model, ee)
		});
	}
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



