var React = require('react');
var setgetgo = "http://randomword.setgetgo.com/get.php";


module.exports = React.createClass({
	showDef:function () { 
		this.props.ee.emit("buttonClick", setgetgo);
	},
	render: function () {
		return (<div>
					<button className="ui primary button" onClick={this.showDef}>New Game</button>
				</div>)
	}
});