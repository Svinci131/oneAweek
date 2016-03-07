var React = require('react');
var ReactDOM = require('react-dom');
var Emitter = require('event-emitter');
var ee = Emitter({});
var KeyBoard = require('./keyboard')
var Dashes = require('./dashes')
var GameOver = require('./gameOver')
var wordURL = "http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=5&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
//var searchURL = "//http://api.wordnik.com/v4/words.json/reverseDictionary?query=jonquil&includeSourceDictionaries=%20wiktionary%20webster%20wordnet%20ahd%20century&minCorpusCount=5&maxCorpusCount=-1&minLength=1&maxLength=-1&includeTags=false&skip=0&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
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
	var arr = [];
	return new Promise(function(resolve, reject ){
		doRequest(wordURL, apiFunctions.setWords)
		.then(function (){
			Model.words.forEach(function (word, i) {
			 	word = word.word;
			 	//push to array 
				arr.push(doRequest('dictionary/'+word, apiFunctions.getDefinition));
			});
		}).then (function(){
			//handle errors- either fix them or ignore them and resolve
			//ERR_EMPTY_RESPONSE
			//ERR_CONNECTION_REFUSED
		
			Promise.all(arr).then(function(){
				console.log("here", Model.list)
			})
			Model.words = null;
			
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
getandSet ()
render.render(Model, ee); 


//before
//getDefinition
//renderGameOver - data - definition 
ee.on('keyClicked', renderFactory(updatedClicked))


