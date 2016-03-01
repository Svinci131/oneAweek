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
	lettersShown: function(){
		var word = Model.word;
		var obj = {};
		for (var i = word.length-1; i >=0 ; i--){
			obj[word[i]] = false;
		}
		return obj
	},
	numGuesses: 7,
	keysGuessed: []
}
//Dashes
//KeyBoard 
//draw letters if this.props.data.keysGuessed[letter] !== undefined - add attr disabled
//onClick add to keysGuessed
//check if its in the word 
//if it is update dashes 
//if not decrease number of guesses 

ee.on('keyClicked', function (letter) {
	Model.keysGuessed.push(letter)
	//console.log("foo",Model.keysGuessed)
	check (letter)
	
});


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
	// console.log(Model.lettersShown()[s])
  //for (var i = word.length-1; i >=0 ; i--){
  	// if (word[i] === l) {
  		//isRight = true; 
  		//}
  //}
  	//if (!isRight) {
  			//Model.numGuesses -= 1
  		//} 
  	// else {
  		//Model.lettersShown()[l.toLowerCase()] = true;
  	// }
  	render();
}



