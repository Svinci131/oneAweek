var check = require('./check');
var render = require('../renderFunctions');
var model = require('../model');

module.exports = function (obj, ee, letter) {
	return new Promise (function (resolve, reject) {
		check (obj, letter)
		render.render (model, ee)
	});
}
