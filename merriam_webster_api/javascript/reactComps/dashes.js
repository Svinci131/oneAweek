var React = require('react');

module.exports = React.createClass({
	dashes:function () {
		var isGuessed = this.props.data.keysGuessed;
		var arr = this.props.data.word.split("")
		var spaces = arr.map(function(l){ 
				l = l.toLowerCase()
				//if the game isn't over
				if (!isGuessed[l]) {
					return (<span className="blank" >_</span>)
				}
				else {
					return (<span className="blank" >{l}</span>)
				}
			});
		return (spaces)
	},
	render:function(){
		// var word = this.props.data.word;
		return (<div>
			<h1>HangMan</h1>
			<p>{this.dashes()}</p>
			</div>)
	}
});