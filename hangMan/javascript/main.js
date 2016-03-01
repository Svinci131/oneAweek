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
	word: "flowers",
	keysGuessed: []
}
//Dashes
//KeyBoard 
ee.on('keyClicked', function (letter) {
	Model.keysGuessed.push(letter)
	console.log("foo",Model.keysGuessed)
	render();
});


render() 


function render() {
	ReactDOM.render(
	  <KeyBoard data={Model} ee={ee} />,
	  document.getElementById('keyBoard')
	);
}





