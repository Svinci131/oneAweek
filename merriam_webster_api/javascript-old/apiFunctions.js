module.exports = {

	setWords: function setWords(obj, data) {
		///create a new promise obj that 
		obj.words = data;
		// //then does get definition 
		// console.log(obj, data)
	},
	//for each word search
	getDefinition: function getDefinition(obj, data) {
		// they seem to usually all work or fail 

		var arr = data.entry_list.entry//array of defintions
		///if it exists 
		if (typeof arr === "undefined"){
			// console.log("remove", arr)
			return;
		}
		else {
			//lets just get the first one //arr[0]
			//.def[0].dt- just get the buried text, only ever 0\
			var def = arr[0].def[0].dt[0]._
			// console.log("Here", def)
			if (typeof def === "undefined" || def === ":") {
				return;
			}

			else {
				var word  = arr[0].$.id
				obj.list[word] = def;
				// console.log("keep", def, arr[0].$.id)
				
			}
		}
		console.log(obj.list)
	}
}