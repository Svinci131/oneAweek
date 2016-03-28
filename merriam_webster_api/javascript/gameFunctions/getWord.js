var GET = require('./get');
var resetModel = require('./reset');
var model = require('../model');

module.exports = function (url, cb) {
	return new Promise (function (resolve, reject) {
		resetModel();
		GET(url)
			.then(function(data){
				console.log("almost cxzrtetredone!!")
				model.word = data;
				cb('dictionary/bread');
				resolve();
			});
	});
}