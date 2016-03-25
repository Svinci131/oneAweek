var model = require('../model');

function getDefinition (url) {
	return new Promise (function (resolve, reject) {
		GET(url)
			.then(function(data){
				data = JSON.parse( data );
				var arr  = data.entry_list.entry
				var def  = {};
				var newObj = Object.keys(arr).map(function(num, i){
					var arrObj = arr[num].def[0].dt[0];
					if (typeof arrObj === "object") {
						arrObj = arrObj._
					}
					def[num] = arrObj; 
				})
				model.def = def;
				console.log("here", model)
				resolve();
			 });
	});
}