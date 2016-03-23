var check = require('./check');
var render = require('../renderFunctions');

module.exports = function (model, ee, letter) {
	check (model, letter)
	if (model.numGuesses === 0 || model.rightGuesses === model.word.length){
	  	render.renderHome(model, ee);
	}
	else {
		render.render (model, ee)
	}
}
