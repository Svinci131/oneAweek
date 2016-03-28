var GET = require('./get');
var resetModel = require('./reset');
var model = require('../model');
var setgetgo = "http://randomword.setgetgo.com/get.php";
var getDefinition = require('../gameFunctions/getDef');

//calls resets object, updates word and calls get def
module.exports = function (url, cb) {
	return new Promise (function (resolve, reject) {
		resetModel();
		GET(setgetgo)
			.then(function(data){
				model.word = data;
				cb('dictionary/'+data);
				resolve();
			});
	});
}