var React = require('react');
var setgetgo = "http://randomword.setgetgo.com/get.php"

module.exports = React.createClass({
	showDef:function () { 
		this.props.ee.emit("buttonClick", setgetgo);
	},
	render: function () {
		return (<div>
					<button onClick={this.showDef}>Start New Game</button>
				</div>)
	}
});