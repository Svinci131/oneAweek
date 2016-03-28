var React = require('react');
var ReactDOM = require('react-dom');
var Home = require('./reactComps/home')
var GameBoard = require('./reactComps/gameBoard')

module.exports = {
	renderBoard:function(obj, ee) {
		ReactDOM.render(
			<GameBoard data={obj} ee={ee} />,
			document.getElementById('wrapper')
		);
	}, 
	renderHome:function (obj, ee) {
		ReactDOM.render(
			<Home data={obj} ee={ee} cLass="start ui primary button" />,
			document.getElementById('main')
		);
	}
}