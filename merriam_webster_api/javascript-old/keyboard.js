var React = require('react');
var letters = drawBlanks ()

function drawBlanks () {
	var arr = [];
	for (var i = 65; i<=90; i++) {
		var l = String.fromCharCode(i);
		arr.push(l)
	}
	return arr
}

module.exports = React.createClass({
  getInitialState: function () {
		return {
			letters:letters
		}
  },
  addItem: function( e ) {
  	var letter = e.target.getAttribute('id'); 
  	// console.log(letter)
	this.props.ee.emit('keyClicked', letter);
  },
  makeAPICall:function () {
  	var url = this.props.url
  	// console.log("here", url)
  	this.props.ee.emit('importFromOMDB', url);
  },
  render: function() {
  	var props = this.props.data
    return (
    <div>
	    <h4>Remaining Guesses: <span>{this.props.data.numGuesses}</span></h4>
	    <button onClick={this.makeAPICall}>Import</button>
	    <div>
	   	{this.state.letters.map(function(l){
	   		//rewrite this is bad
	   		if (props.keysGuessed.indexOf(l) >= 0 ){
	   			return (<button id={l} disabled onClick={this.addItem}>{l}</button>)
	   		}
	   		else {
	   			return (<button id={l} onClick={this.addItem}>{l}</button>)
	   		}
	  	}.bind(this))}
	   </div>
    </div>
    );
  }
});


