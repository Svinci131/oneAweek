var React = require('react');
var ReactDOM = require('react-dom');
var KeyBoard = require('./keyboard')
var Dashes = require('./dashes')
var GameOver = require('./gameOver')



module.exports = {

	render: function render(obj, ee) {
		ReactDOM.render(
		  <h1>HangMan</h1>,
		  document.getElementById('title')
		);

		ReactDOM.render(
		  <KeyBoard data={obj} ee={ee} />,
		  document.getElementById('keyBoard')
		);
		ReactDOM.render(

			<Dashes data={obj} />,
			document.getElementById('dashes'));
		//render dashes here to 
	}, 

	renderGameOver: function renderGameOver(obj) { 
		ReactDOM.render(
			<GameOver data={obj} />,
			document.getElementById('gameOver'));
	}


}
