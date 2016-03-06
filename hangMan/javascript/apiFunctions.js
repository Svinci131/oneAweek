module.exports = {

	setWords: function setWords(obj, data) {
		///create a new promise obj that 
		obj.words = data;
		//then does get definition 
		console.log(obj, data)
	},
	getDefinition: function getDefinition(obj, data) {
		console.log(obj.words[0].word)
		console.log(obj, data.entry_list.entry)
	}
}