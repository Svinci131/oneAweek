module.exports = function (obj, l) {
	
	var word = obj.word;
	var isRight = false; 
	l = l.toLowerCase()
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
}
