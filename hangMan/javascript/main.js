var React = require('react');
var ReactDOM = require('react-dom');
var Emitter = require('event-emitter');
var ee = Emitter({});
var KeyBoard = require('./keyboard')
var Dashes = require('./dashes')

ReactDOM.render(
  <h1>HangMan</h1>,
  document.getElementById('title')
);




//model 
var Model = {
	//keys guessed 
	word: "flowers".split(''),
	numGuesses: 7,
	keysGuessed: []
}
var wordObj = {}

function updateWordObj (){
		var word = Model.word;
		for (var i = word.length-1; i >=0 ; i--){
			wordObj[word[i]] = false;
		}
	}

ee.on('keyClicked', function (letter) {
	Model.keysGuessed.push(letter)
	//console.log("foo",Model.keysGuessed)
	check (letter)
	
});



updateWordObj ();
Model.lettersShown = wordObj;
console.log (Model.lettersShown)
render(); 

function render() {
	ReactDOM.render(
	  <KeyBoard data={Model} ee={ee} />,
	  document.getElementById('keyBoard')
	);
	ReactDOM.render(
		<Dashes data={Model} />,
		document.getElementById('dashes'));
	//render dashes here to 
}

function check (l) {
	var word = Model.word;
	var isRight = false; 
	l = l.toLowerCase()
	// console.log(Model.lettersShown()[s])
	  for (var i = word.length-1; i >=0 ; i--){
	  	if ( word[i]=== l) {
	  		isRight = true; 
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
  	render();
}



