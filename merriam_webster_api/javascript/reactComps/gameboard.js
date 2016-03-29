var React = require('react');
var KeyBoard = require('./keyBoard');
var Dashes = require('./dashes');
var HangMan = require('./hangMan')
var Home = require('./home')
var Definitions = require('./definitions');

module.exports = React.createClass({
	winOrLose: function (){
		var remaining = this.props.data.numGuesses; 
		var isGuessed = this.props.data.keysGuessed;
		var rightGuesses = this.props.data.rightGuesses; 
		//if you haven't won or lost return dashes and key board 
		if (rightGuesses !== this.props.data.word.length && remaining > 1) {
			return (<div className="game">
					<Dashes data={this.props.data} ee={this.props.ee}/>
		            <KeyBoard data={this.props.data} ee={this.props.ee} />
		            <Home cLass="ui primary button" data={this.props.data} ee={this.props.ee} /> 
		            </div>
		            )
		}
		else {
			return (
				<div className="game">
					<div>
						<h1>HangMan</h1>
						<p className="word">{this.props.data.word}</p>
					</div>
					<Definitions data={this.props.data.def} />
					<Home cLass="ui primary button" data={this.props.data} ee={this.props.ee} />
				</div>)
		}
	}, 
	render: function () {
		return (
			<div>
				<div id="hangMan" className="container top">
					<HangMan data={this.props.data} />
	    		</div>
				<div className="container bottom">
		            <div className="hang spacer">
		            </div>
		            	{this.winOrLose()}
		        </div>
		    </div>
		    )
	}
});