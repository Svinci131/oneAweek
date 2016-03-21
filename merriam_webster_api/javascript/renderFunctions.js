var React = require('react');
var ReactDOM = require('react-dom');
var KeyBoard = require('./keyboard')
var Dashes = require('./dashes')
var HangMan = require('./hangMan')

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
	}
}