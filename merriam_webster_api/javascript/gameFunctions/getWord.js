var GET = require('./get');
var model = require('../model');

module.exports = function (url, cb) {
	return new Promise (function (resolve, reject) {
		GET(url)
			.then(function(data){
				console.log("almost done!!")
				model.word = data;
				cb('dictionary/bread');
				resolve();
			});
	});
}