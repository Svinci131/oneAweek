var Dictionary = require('./dictionary'),
	dict = new Dictionary({
		key: "5590eec7-58b6-40f8-b912-60c2e61c7f6a"
	});

//sample method
dict.define("bread", function(error, result){
	if (error == null) {
		for(var i=0; i<result.length; i++){
			console.log("What",result);
			console.log('Part of speech: '+result[i].partOfSpeech);
			console.log('Definitions: '+result[i].definition);
			console.log(result[i].definition)
		}
	}
	else if (error === "suggestions"){
		//console.log(process.argv[3] + ' not found in dictionary. Possible suggestions:');
		for (var i=0; i<result.length; i++){
			console.log(result[i]);
		}
	}
	else console.log(error);
});

