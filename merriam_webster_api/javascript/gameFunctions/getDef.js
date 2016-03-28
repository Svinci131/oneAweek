var GET = require('./get');
var model = require('../model');
var getWord = require("./getWord")

module.exports = function (url) {
	return new Promise (function (resolve, reject) {
		GET(url)
			.then(function(data){
				data = JSON.parse( data );
				var arr  = data.entry_list.entry
				var def  = {};
				if (arr) {
					var newObj = Object.keys(arr).map(function(num, i){
					var arrObj = arr[num].def[0].dt[0];
					if (typeof arrObj === "object") {
						arrObj = arrObj._
					}
					def[num] = arrObj; 
					})
					model.def = def;
					
					
				}
				else {
					def[0] = "no definitions available"
					model.def = def;

				}
				console.log("here", model)
				resolve();
				// else {
				// 	def[0] = "no definitions available"
				// }
				
				
			 });
	});
}