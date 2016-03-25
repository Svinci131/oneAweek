var React = require('react');
var setgetgo = "http://randomword.setgetgo.com/get.php";
var apiFuctions = require("../makeCall");
var setWord = apiFuctions.setWord;

module.exports = React.createClass({
	showDef:function () { 
		// setWord(this.props.data)
		this.props.ee.emit("buttonClick", setgetgo, setWord);
	},
	render: function () {
		return (<div>
					<button className="ui primary button" onClick={this.showDef}>Start New Game</button>
				</div>)
	}
});