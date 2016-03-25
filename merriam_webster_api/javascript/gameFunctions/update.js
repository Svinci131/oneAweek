var check = require('./check');
var render = require('../renderFunctions');
var model = require('../model');

module.exports = function (obj, ee, letter) {
	return new Promise (function (resolve, reject) {
		check (obj, letter)
		// if (model.numGuesses === 0) {
		//   	render.renderGameOver(model, ee, "lose");
		// }
		// else if (model.rightGuesses === model.word.length){
		// 	render.renderGameOver(model, ee, "win");

		// }
		render.render (model, ee)
	});
}
