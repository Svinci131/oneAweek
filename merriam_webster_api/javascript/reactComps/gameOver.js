var React = require('react');

module.exports = React.createClass({
	showDef:function () {
		this.props.ee.emit("buttonClick");
	},
	render: function () {
		return (<div>
			<p><i>{this.props.status}</i></p>
			</div>)
	}
});