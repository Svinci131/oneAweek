var React = require('react');

module.exports = React.createClass({
	drawGuy: function () {
		var remaining = this.props.data.numGuesses; 
		var bodyEquals = ["rope","head", "torso", "arm-right", "arm", "leg-right", "leg"]
		var wrongGuesses = 7-remaining;
		var arr = bodyEquals.map(function(part, i){
			console.log("rfd")
			var cLass = "guy "+part
			var style= {border: "1px solid red"}
			if (i <= wrongGuesses) {
				return (<div style={style} className={cLass}></div>)
			}
			
		});
		return (arr)
	}, 
	render: function () {
		console.log("1")
		return (
			<div className="hang">
           		 <div className="gallows">
			
				{this.drawGuy()}
				</div>
			</div>)
	}
});