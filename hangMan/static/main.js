var React = require('react');
var ReactDOM = require('react-dom');
var letters = drawButtons ();
//var word = require('./search')

function drawButtons () {
	var letters = [];
	for (var i = 65; i<=90; i++) {
		var l = String.fromCharCode(i);
		letters.push(l)
	}
	return letters;
}

//Dashes <Dashes data={word}/> 
// //for each letter in word draw dashes 
// var Dashes = React.createClass({
// 	//for each letter in word draw dashes 
// 	//return <>-<>
// 	render: function() {}
// });

//Score
// var Score = React.createClass({
// 	render: function() {}
// });


var KeyBoard = React.createClass({
	//onclick disable - update 
	render: function() {
		var keys = letters.map(function(letter) {
	  		return (
	  			<button id="letter" >{letter}</button>
	  		)
	  	});

		return( <div>
        {keys}
      	</div>)
	}
});

var Game = React.createClass({
  getInitialState: function () {
  	currentLetter: "a";
  },
  render: function() {
    return (
     <KeyBoard/>
      
    );
  }
});

ReactDOM.render(
  <Game />,
  document.getElementById('example')
);





alert("bar")