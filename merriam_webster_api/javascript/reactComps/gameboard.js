var React = require('react');
var KeyBoard = require('./reactComps/keyBoard');
var Dashes = require('./reactComps/dashes');
var HangMan = require('./reactComps/hangMan')
var Home = require('./reactComps/home')

module.exports = React.createClass({
	render: function () {
		return (
			<div>
				<Dashes data={obj} ee={ee}/>,
           		<KeyBoard data={obj} ee={ee} />
			</div>)
	}