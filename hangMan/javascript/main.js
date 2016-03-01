var React = require('react');
var ReactDOM = require('react-dom');
var Emitter = require('event-emitter');
var KeyBoard = require('./keyboard')
var ee = Emitter({});


ReactDOM.render(
  <KeyBoard data={Model} ee={ee} />,
  document.getElementById('example')
);



//model 
var Model = {
	//keys guessed 
	keysGuessed: null
}

//KeyBoard 

ee.on('keyClicked', function (letter) {
	alert (letter);
});











