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
	word: "TEST",
	numGuesses: 7,
	keysGuessed: [],
	rightGuesses: 0
}
var xhr = new XMLHttpRequest();


//pass ee in to my component
function render () {
	console.log("foo")
	ReactDOM.render(
	<KeyBoard data={model} ee={ee} />,
	document.getElementById('keyBoard')
	);
	ReactDOM.render(
		<Dashes data={model} ee={ee}/>,
		document.getElementById('dashes')
	);
	ReactDOM.render(
		<HangMan data={model} />,
		document.getElementById('hangMan')
	);
}

render ()

ee.on('buttonClick', function (word) {
	console.log (word)
});

ee.on('keyClicked', function (l) {
	model.keysGuessed.push(l)
	render()
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



