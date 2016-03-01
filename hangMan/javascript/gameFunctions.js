module.exports = {

	updateWordObj: function updateWordObj (obj){
		var word = obj.word;
		var wordObj = {}
		for (var i = word.length-1; i >=0 ; i--){
			wordObj[word[i]] = false;
		}
	}
}
