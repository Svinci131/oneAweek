module.exports = {

	setWords: function setWords(obj, data) {
		obj.words = data;
		console.log(obj, data)
	},
	getDefinition: function getDefinition(obj, data) {
		console.log(obj, data.entry_list.entry)
	}
}