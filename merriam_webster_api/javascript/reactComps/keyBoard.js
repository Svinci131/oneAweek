var React = require('react');
var Definitions = require('./definitions');

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
		var model = this.props.data;
		this.props.ee.emit('keyClicked', model, this.props.ee, letter);
	},
	keys:function () {
		var isGuessed = this.props.data.keysGuessed;
		var arr = this.letters()
		var buttons = arr.map(function(l){ 
				l = l.toLowerCase()
				if (typeof isGuessed[l] === "undefined") {
					return (<button className='ui inverted grey button' id={l} onClick={this.addItem}>{l}</button>)
				}
				else {
					return (<button id={l} className='ui inverted grey button' disabled>{l}</button>)
				}
			}.bind(this));
		return(buttons)
	},
	render: function () {
		return (<div>
			{this.keys()}
			</div>)
	}
	
	
});

