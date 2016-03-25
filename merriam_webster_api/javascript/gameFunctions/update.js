var check = require('./check');
var render = require('../renderFunctions');

module.exports = function (model, ee, letter) {
	return new Promise (function (resolve, reject) {
		console.log("35")
		check (model, letter)
		if (model.numGuesses === 0 || model.rightGuesses === model.word.length){
		  	render.renderHome(model, ee);
		}
		else {
			render.render (model, ee)
		}
	});
}
