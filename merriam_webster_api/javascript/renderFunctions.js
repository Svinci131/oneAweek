var React = require('react');
var ReactDOM = require('react-dom');
var KeyBoard = require('./keyboard')
var Dashes = require('./dashes')
var HangMan = require('./hangMan')
var GameOver = require('./gameOver')

module.exports = {
	render: function render(obj, ee) {
		ReactDOM.render(
			<KeyBoard data={obj} ee={ee} />,
			document.getElementById('keyBoard')
		);
		ReactDOM.render(
			<Dashes data={obj} ee={ee}/>,
			document.getElementById('dashes')
		);
		ReactDOM.render(
			<HangMan data={obj} />,
			document.getElementById('hangMan')
		);
	},
	renderGameOver: function (obj, ee) {
		ReactDOM.render(
			<GameOver data={obj} ee={ee} />,
			document.getElementById('gameOver')
		);
	}
}