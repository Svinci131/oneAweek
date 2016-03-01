var React = require('react');
var ReactDOM = require('react-dom');
var Emitter = require('event-emitter');
var KeyBoard = require('./keyboard')
var ee = Emitter({});

//model 
// var Model = {
// 	//keys guessed 
// 	keysGuessed: null
// }

// //KeyBoard 

// ee.on('keyClicked', function () {
// 	alert ("foo");
// }







/////
ReactDOM.render(
  <KeyBoard />,
  document.getElementById('example')
);





