var React = require('react');

module.exports = React.createClass({
	winOrLose: function () {
		var rightGuesses = this.props.data.rightGuesses; 
		if (rightGuesses === this.props.data.word.length) {
			return (<div className="win-wrapper">
						<p className="win">You Win</p>
					</div>)
		}
		else {
			return (
	           	<div className="gallows">
					{this.drawGuy()}
				</div>);
		}
	}, 
	drawGuy: function () {
		var remaining = this.props.data.numGuesses; 
		var bodyEquals = ["rope","head", "torso", "arm-right", "arm", "leg-right", "leg"]
		var wrongGuesses = 7-remaining;
		var arr = bodyEquals.map(function(part, i){
			var cLass = "guy "+part
			var style= {border: "1px solid black"}
	
			if (remaining === 1) {
				console.log("bar")
				style= {border: "1px solid red"}
			}
			if (i <= wrongGuesses) {
				return (<div style={style} className={cLass}></div>)
			}
			
		});
		return (arr)
	}, 
	render: function () {
		return (
			<div className="hang">
           		{this.winOrLose()}
			</div>)
	}
});