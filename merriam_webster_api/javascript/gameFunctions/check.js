var render = require('../renderFunctions');
var model = require('../model');

module.exports = function (obj, ee, letter) {
	return new Promise (function (resolve, reject) {
		console.log("BR")
		var word = obj.word;
		var isRight = false; 
		var l = letter.toLowerCase()
		  for (var i = word.length-1; i >=0 ; i--){
		  	if (word[i].toLowerCase() === l) {
		  		isRight = true; 
		  		obj.rightGuesses +=1;
		  	}

		  }
		  	if (!isRight) {
		  		obj.numGuesses -= 1;
		  		obj.keysGuessed[l]= false;
		  		} 
		  	else {
		  		obj.keysGuessed[l]= true;
		  	} 

		render.render (model, ee)	
	});
}
