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
			keysGuessed:1,
			letters:letters

		}
  },
  addItem: function( e ) {
  	console.log(e.target.getAttribute('id'))
  },
  render: function() {

    return (
    <div>
    <h1>Remaining Guesses: <span>{this.state.keysGuessed}</span></h1>
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


