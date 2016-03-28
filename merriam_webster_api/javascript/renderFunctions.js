var React = require('react');
var KeyBoard = require('./reactComps/keyBoard');
var Dashes = require('./reactComps/dashes');
var HangMan = require('./reactComps/hangMan')
var Home = require('./reactComps/home')
var ReactDOM = require('react-dom');

module.exports = {
	render: function (obj, ee) {
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
	renderHome:function (obj, ee) {
		ReactDOM.render(
			<Home data={obj} ee={ee} />,
			document.getElementById('main')
		);
	}
}