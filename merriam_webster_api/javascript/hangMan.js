var React = require('react');

module.exports = React.createClass({
	render: function () {
		return (<div>
			<p>Remaining Guesses: <span>{this.props.data.numGuesses}</span></p>
			</div>)
	}
});