var render = require('../renderFunctions');
var model = require('../model');

module.exports = function (obj, ee, letter) {
	//I moved my update function to a new page
	//now it returns a promise
	return new Promise (function (resolve, reject) {
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
		//here I'm resolving after it's done everything it needs to
		resolve();
	});
}


//By turn returning promise objects instead of function, 
	//I can chain them in my factory function. 
	//Then I can do things like render after each event