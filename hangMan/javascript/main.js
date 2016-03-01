var React = require('react');
var ReactDOM = require('react-dom');
var Emitter = require('event-emitter');
var ee = Emitter({});
var KeyBoard = require('./keyboard')
var Dashes = require('./dashes')
var GameOver = require('./gameOver')
var Model = {
	word: "flowers".split(''),
	numGuesses: 7,
	keysGuessed: [],
	rightGuesses: 0
}
var wordObj = {}


function updateWordObj (){
		var word = Model.word;
		for (var i = word.length-1; i >=0 ; i--){
			wordObj[word[i]] = false;
		}
}

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
  		console.log (Model.lettersShown[l])
  	}
  	if (Model.numGuesses === 0 || Model.rightGuesses === word.length){
  		renderGameOver();
  	}
  	else {
  		render();
  	}
}

ee.on('keyClicked', function (letter) {
	Model.keysGuessed.push(letter)
	check (letter)
	
});


updateWordObj ();
Model.lettersShown = wordObj;
console.log (Model.lettersShown)
render(); 




