var React = require('react');
var setgetgo = "http://randomword.setgetgo.com/get.php";
var getDefinition = require('../gameFunctions/getDef');

module.exports = React.createClass({
	showDef:function () { 
		this.props.ee.emit("buttonClick", setgetgo, getDefinition);
	},
	render: function () {
		return (
			<button className={this.props.cLass} onClick={this.showDef}>New Game</button>
		)
	}
});