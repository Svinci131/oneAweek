var React = require('react');
var ReactDOM = require('react-dom');
var Emitter = require('event-emitter');
var Fetch = require('fetch');
// var server = require('./server');
var ee = Emitter({});
var KeyBoard = require('./keyboard')
var Dashes = require('./dashes')
var GameOver = require('./gameOver')
// var Render = require('./renderFunctions');
var Model = {
	word: "blotsofletters".split(''),
	numGuesses: 7,
	keysGuessed: [],
	rightGuesses: 0,
	list:[]
}
var gameFunctions = require('./gameFunctions')

///render pages 
function render() {
	// console.log(Model.words)
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
///render pages 

///ee events
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
}



//set up game
var wordObj = gameFunctions.updateWordObj (Model);
Model.lettersShown = wordObj;
render(); 



ee.on('keyClicked', renderFactory(updatedClicked))
// ee.on('importFromOMDB', function () {


// }


ee.on('importFromOMDB', function () {
	var Dictionary = require('./dictionary'),
	dict = new Dictionary({
		key: "5590eec7-58b6-40f8-b912-60c2e61c7f6a"
	});

//sample method
// dict.define("bread", function(error, result){
// 	if (error == null) {
// 		for(var i=0; i<result.length; i++){
// 			console.log("What",result);
// 			console.log('Part of speech: '+result[i].partOfSpeech);
// 			console.log('Definitions: '+result[i].definition);
// 			console.log(result[i].definition)
// 		}
// 	}
// 	else if (error === "suggestions"){
// 		//console.log(process.argv[3] + ' not found in dictionary. Possible suggestions:');
// 		for (var i=0; i<result.length; i++){
// 			console.log(result[i]);
// 		}
// 	}
// 	else console.log(error);
// });


// 	var url = "http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
	
// 	fetch(url, {mode: 'no-cors'})  
// 	  .then(  
// 	    function(response) {  
// 	      if (response.status !== 200) {  
// 	        console.log('Looks like there was a problem. Status Code: ' +  
// 	          response);  
// 	        return;  
// 	      }

// 	      // Examine the text in the response  
// 	      response.json().then(function(data) {  
// 	        console.log(data);  
// 	      });  
// 	    }  
// 	  )  
// 	  .catch(function(err) {  
// 	    console.log('Fetch Error :-S', err);  
// 	  });

// });

// // 	var Dictionary = require('./dictionary'),
// // 	dict = new Dictionary({
// // 		key: "5590eec7-58b6-40f8-b912-60c2e61c7f6a"
// // 	});
// // 	dict.define("bread", function(error, result){
// // 	if (error == null) {
// // 		for(var i=0; i<result.length; i++){
// // 			console.log("What",result);
// // 			console.log('Part of speech: '+result[i].partOfSpeech);
// // 			console.log('Definitions: '+result[i].definition);
// // 			console.log(result[i].definition)
// // 		}
// // 	}
// // 	// else if (error === "suggestions"){
// // 	// 	//console.log(process.argv[3] + ' not found in dictionary. Possible suggestions:');
// // 	// 	for (var i=0; i<result.length; i++){
// // 	// 		console.log(result[i]);
// // 	// 	}
// // 	// }
// // 	else console.log(error);
// // });


});

var xhr = new XMLHttpRequest();
xhr.addEventListener('load', function(data){
	console.log(data);
})
xhr.open('GET', 'dictionary/bread');
xhr.send();
