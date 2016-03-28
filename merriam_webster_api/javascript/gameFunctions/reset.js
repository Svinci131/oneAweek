var model = require('../model');

module.exports = function () {
	//reset model
	model.word = "test";
	model.numGuesses = 7;
	model.keysGuessed = {};
	model.rightGuesses = 0;
}