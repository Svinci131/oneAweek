var React = require('react');
var ReactDOM = require('react-dom');
var Emitter = require('event-emitter');
var ee = Emitter({});
var KeyBoard = require('./keyboard')
var Dashes = require('./dashes')
var GameOver = require('./gameOver')
var wordURL = "http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"	
var Model = {
	word: "blotsofletters".split(''),
	numGuesses: 7,
	keysGuessed: [],
	rightGuesses: 0,
	list:[]
}
var gameFunctions = require('./gameFunctions')
var apiFunctions = require('./apiFunctions')
///render pages 
function render() {
	console.log(Model.words)
	ReactDOM.render(
	  <h1>HangMan</h1>,
	  document.getElementById('title')
	);

	ReactDOM.render(
	  <KeyBoard data={Model} url={wordURL} ee={ee} />,
	  document.getElementById('keyBoard')
	);
	ReactDOM.render(
		<Dashes data={Model} />,
		document.getElementById('dashes'));
}
function renderGameOver() { 
	ReactDOM.render(
		<GameOver data={Model} />,
		document.getElementById('gameOver'));
}
///render pages 

///ee events
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
////
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
function doRequest(url, cb) {
	return new Promise(function(resolve, reject ){
		gameFunctions.GET( url )
		.then(function(data){
			cb(Model, data)
			// Model.words = data;
			// console.log(data.entry)
			
		}).then (function(){
			// var word = Model.words[0].word
			// console.log("here", Model.words)
			// render(); 
			// search and update 
			resolve();
		});
	});
}

///ee events


//set up game
var wordObj = gameFunctions.updateWordObj (Model);
Model.lettersShown = wordObj;
doRequest(wordURL, apiFunctions.setWords);
doRequest('dictionary/bread', apiFunctions.getDefinition);
render(); 


//before
//getDefinition
//renderGameOver - data - definition 
ee.on('keyClicked', renderFactory(updatedClicked))

///get definition
// var xhr = new XMLHttpRequest();
// xhr.addEventListener('load', function(data){
// 	// console.log("here", data.currentTarget.response);
// })
// xhr.open('GET', 'dictionary/bread');
// xhr.send();
