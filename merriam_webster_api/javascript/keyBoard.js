var React = require('react');

module.exports = React.createClass({
	letters: function  () {
		var arr = [];
		for (var i = 65; i<=90; i++) {
			var l = String.fromCharCode(i);
			arr.push(l)
		}
		return (arr)
	},
	addItem: function(e) {
		var letter = e.target.getAttribute('id'); 
		// passing these args to my event emitter
		this.props.ee.emit('keyClicked', letter);
	},
	keys:function () {
		var arr = this.letters()
		var buttons = arr.map(function(l){ 
			// calling my function on click
				return (<button id={l} onClick={this.addItem}>{l}</button>)
			}.bind(this));
		console.log(buttons)
		return(buttons)
	},
	render: function () {
		return (<div>
			<h1>TEST</h1>
			{this.keys()}
			</div>)
	}
	
	
});

