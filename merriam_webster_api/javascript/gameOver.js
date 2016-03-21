var React = require('react');

module.exports = React.createClass({
	showDef:function () {
		this.props.ee.emit("buttonClick");
	},
	render: function () {
		return (<div>
			<p>Game Over</p>
			<p><i>{this.props.data.word}</i></p>
			<button onClick={this.showDef}>show definitions</button>
			</div>)
	}
});