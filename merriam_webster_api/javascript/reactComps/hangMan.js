var React = require('react');

module.exports = React.createClass({
	drawGuy: function () {
		var remaining = this.props.data.numGuesses; 
		var bodyEquals = ["rope","head", "torso", "arm-right", "arm", "leg-right", "leg"]
		var wrongGuesses = 7-remaining;
		var arr = bodyEquals.map(function(part, i){
			console.log(part, i)
			if (i <= wrongGuesses) {
				var style = "guy "+part
				return (<div className={style}></div>)
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