var React = require('react');
var ReactDOM = require('react-dom');
var Emitter = require('event-emitter');
// var server = require('./server');
var ee = Emitter({});
var KeyBoard = require('./keyboard')
var Dashes = require('./dashes')
var GameOver = require('./gameOver')
var Model = {
	word: "blotsofletters".split(''),
	numGuesses: 7,
	keysGuessed: [],
	rightGuesses: 0,
	list:[]
}
var gameFunctions = require('./gameFunctions')
// var Dictionary = require('./dictionary'),
// 	dict = new Dictionary({
// 		key: "5590eec7-58b6-40f8-b912-60c2e61c7f6a"
// 	});

function render() {
	ReactDOM.render(
	  <h1>HangMan</h1>,
	  document.getElementById('title')
	);

	ReactDOM.render(
	  <KeyBoard data={Model} ee={ee} />,
	  document.getElementById('keyBoard')
	);
	ReactDOM.render(
		<Dashes data={Model} />,
		document.getElementById('dashes'));
	//render dashes here to 
}

function renderGameOver() { 
	ReactDOM.render(
		<GameOver data={Model} />,
		document.getElementById('gameOver'));
}

function updatedClicked (letter){
	Model.keysGuessed.push(letter)
	console.log("here", letter)
	gameFunctions.check (Model, letter)

	if (Model.numGuesses === 0 || Model.rightGuesses === Model.word.length){
	  	renderGameOver();
	}
	else {
		render();
	}
}

function renderFactory( cb ) {
	return function() {
		var onCb;
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
function doRequest() {
	var url = "http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
	return new Promise(function(resolve, reject ){
		gameFunctions.GET( url )
		.then(function(data){
			Model.words = data;
			
		}).then (function(){
			var word = Model.words[0].word

			// search and update 
			resolve();
		});
	});
}//for each of these words look up definition 
// function doXMLRequest() {
// 	var url = "http://www.dictionaryapi.com/api/v1/references/sd2/xml/blue?key=5590eec7-58b6-40f8-b912-60c2e61c7f6a";
// 	return new Promise(function(resolve, reject ){
// 		gameFunctions.GETXML( url )
// 		.then (function(data) {
// 			console.log(data)
// 		});
// 	});

// }

// ee.on('importFromOMDB', renderFactory(doRequest));



var wordObj = gameFunctions.updateWordObj (Model);
Model.lettersShown = wordObj;
render(); 


ee.on('keyClicked', renderFactory(updatedClicked))

// ee.on('keyClicked', function (letter) {
// 	Model.keysGuessed.push(letter)
// 	console.log("here", letter)
// 	gameFunctions.check (Model, letter)

// 	if (Model.numGuesses === 0 || Model.rightGuesses === Model.word.length){
// 	  	renderGameOver();
// 	}
// 	else {
// 		render();
// 	}
// });

