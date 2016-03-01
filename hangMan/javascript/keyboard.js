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
			keysGuessed:[],
			number: 2,
			letters:letters

		}
  },
  addItem: function( e ) {
  	var letter = e.target.getAttribute('id'); 
	this.props.ee.emit('keyClicked', letter);
  },
  render: function() {
  	console.log(this.props.data.keysGuessed.length)
    return (
    <div>
	    <h4>Remaining Guesses: <span>{this.props.data.keysGuessed.length}</span></h4>
	    <button onClick={this.addItem}>test</button>
	    <div>
	   	{this.state.letters.map(function(l){
	  		return (<button id={l} onClick={this.addItem}>{l}</button>)
	  	}.bind(this))}
	   </div>
    </div>
    );
  }
});


