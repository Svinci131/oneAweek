var React = require('react');
var ReactDOM = require('react-dom');
var Emitter = require('event-emitter');
var ee = Emitter({});
var KeyBoard = require('./keyboard')
var Dashes = require('./dashes')
var GameOver = require('./gameOver')
var wordURL = "http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"	
var Model = require('./model')
var gameFunctions = require('./gameFunctions')
var apiFunctions = require('./apiFunctions')
var render = require('./renderFunctions')

//generic/ee events
function renderFactory( cb ) {
	return function() {
		var onCb;
		if ( cb ) {
			onCb = cb.apply( null, arguments );
		}
		if ( onCb.then ) {
			onCb.then(function() {
				render.render(Model, ee);
			});
		}
		else {
			render.render(Model, ee);
		}	
	}
}

function doRequest(url, cb) {
	return new Promise(function(resolve, reject ){
		gameFunctions.GET( url )
		.then(function(data){
			cb(Model, data)
			resolve();	
		});
	});
}
function getandSet () {
	return new Promise(function(resolve, reject ){
		doRequest(wordURL, apiFunctions.setWords)
		.then(function (){
			doRequest('dictionary/'+word, apiFunctions.getDefinition);
			resolve();
		});
	});
}

///game events that couldn't be broken out
function updatedClicked (letter){
	Model.keysGuessed.push(letter)
	console.log("here", letter)
	gameFunctions.check (Model, letter)

	if (Model.numGuesses === 0 || Model.rightGuesses === Model.word.length){
	  	render.renderGameOver(Model);
	}
	else {
		render.render(Model, ee);
	}
}
///game events that couldn't be broken out

//set up game
var wordObj = gameFunctions.updateWordObj (Model);
Model.lettersShown = wordObj;
// doRequest(wordURL, apiFunctions.setWords);
var word = "shoes"
getandSet ()
// doRequest('dictionary/'+word, apiFunctions.getDefinition);
render.render(Model, ee); 


//before
//getDefinition
//renderGameOver - data - definition 
ee.on('keyClicked', renderFactory(updatedClicked))


