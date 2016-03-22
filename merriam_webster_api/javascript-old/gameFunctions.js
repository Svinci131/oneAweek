module.exports = {

	updateWordObj: function updateWordObj (obj){
		var word = obj.word;
		var wordObj = {}
		for (var i = word.length-1; i >=0 ; i--){
			wordObj[word[i]] = false;
		}
		return wordObj;
	}, 

	check: function check (obj, l) {
		var word = obj.word;
		var isRight = false; 
		l = l.toLowerCase()
		  for (var i = word.length-1; i >=0 ; i--){
		  	if ( word[i]=== l) {
		  		isRight = true; 
		  		obj.rightGuesses +=1;
		  		}
		  }
	  	if (!isRight) {
	  			obj.numGuesses -= 1
	  		} 
	  	else {
	  		var newObj = obj.lettersShown
	  		newObj[l] = true;
	  		obj.lettersShown = newObj
	  		// console.log (Model.lettersShown[l])
	  	}
	  	
	},
	GET:  function GET( url ) {
		return new Promise(function(resolve, reject){
			var xhr = new XMLHttpRequest();

			xhr.addEventListener('load', function(e){
				var data = JSON.parse( e.currentTarget.response );
				resolve( data );
			});

			xhr.addEventListener('fail', function(e){
				reject( e );
			})

			xhr.open('GET', url);
			xhr.send();
		});
	},
	// Test: function () {
	// 	return new Promise(function(resolve, reject) {
	// 		var Dictionary = require('./dictionary');
	// 			var	dict = new Dictionary({
	// 				 key: "5590eec7-58b6-40f8-b912-60c2e61c7f6a"
	// 			});

	// 		dict.define("bread", function(error, result){
	// 			if (error == null) {
					
	// 			}

	// 	}
	// },




	GETXML: function GETXML( url ) {
		return new Promise(function(resolve, reject){
			var xhr = new XMLHttpRequest();

			xhr.addEventListener('load', function(e){ 
				console.log(e.currentTarget.response)
				resolve(e.currentTarget.response)
			})
			
			xhr.addEventListener('fail', function(e){
				reject( e );
			})

			xhr.open('GET', url);
			xhr.send();
		});
	}
}


// function doXMLRequest() {
// 	var url = "http://www.dictionaryapi.com/api/v1/references/sd2/xml/blue?key=5590eec7-58b6-40f8-b912-60c2e61c7f6a";
// 	return new Promise(function(resolve, reject ){
// 		gameFunctions.GETXML( url )
// 		.then (function(data) {
// 			console.log(data)
// 		});
// 	});

// }

	// renderGameOver: function renderGameOver() { 
	// 	ReactDOM.render(
	// 		<GameOver data={Model} />,
	// 		document.getElementById('gameOver'));
	// 	}
	// }

