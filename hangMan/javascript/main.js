var React = require('react');
var ReactDOM = require('react-dom');
var Emitter = require('event-emitter');
var ee = Emitter({});
var KeyBoard = require('./keyboard')
var Dashes = require('./dashes')
var GameOver = require('./gameOver')
var Model = {
	word: "floss".split(''),
	numGuesses: 7,
	keysGuessed: [],
	rightGuesses: 0,
	list:[]
}
var gameFunctions = require('./gameFunctions')
var wordObj = {}


// function updateWordObj (){
// 		var word = Model.word;
// 		for (var i = word.length-1; i >=0 ; i--){
// 			wordObj[word[i]] = false;
// 		}
// }

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

function check (l) {
	var word = Model.word;
	var isRight = false; 
	l = l.toLowerCase()
	  for (var i = word.length-1; i >=0 ; i--){
	  	if ( word[i]=== l) {
	  		isRight = true; 
	  		Model.rightGuesses +=1;
	  		}
	  }
  	if (!isRight) {
  			Model.numGuesses -= 1
  		} 
  	else {
  		var obj = Model.lettersShown
  		obj[l] = true;
  		Model.lettersShown = obj
  		// console.log (Model.lettersShown[l])
  	}
  	if (Model.numGuesses === 0 || Model.rightGuesses === word.length){
  		renderGameOver();
  	}
  	else {
  		render();
  	}
}

function updatedClicked (letter){
	Model.keysGuessed.push(letter)
	check (letter)
}
function GET( url ) {
	return new Promise(function(resolve, reject){
		var xhr = new XMLHttpRequest();

		xhr.addEventListener('load', function(e){
			var data = JSON.parse( e.currentTarget.response );

			resolve( data );
		});

		xhr.addEventListener('fail', function(e){
			reject( e );
		})

		xhr.open('GET', url);
		xhr.send();
	});
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
		GET( url )
		.then(function(data){
			// var words = data.map(function(item){
			// 	console.log("api", item.word)
			// });
			Model.words = data;
			console.log(Model.words)
			resolve();
		});
	});
}//for each of these words look up definition 


ee.on('importFromOMDB', renderFactory( doRequest ) );
ee.on('keyClicked', renderFactory(updatedClicked));
	


gameFunctions.updateWordObj (Model);
Model.lettersShown = wordObj;
render(); 




