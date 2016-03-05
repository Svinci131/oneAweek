var React = require('react');
var ReactDOM = require('react-dom');
var KeyBoard = require('./keyboard')
var Dashes = require('./dashes')
var GameOver = require('./gameOver')

module.exports = {

	render: function render() {
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
	}, 

	renderGameOver: function renderGameOver() { 
		ReactDOM.render(
			<GameOver data={Model} />,
			document.getElementById('gameOver'));
		}
}
