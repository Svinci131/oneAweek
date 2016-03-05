// // var url = "http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"

// // var data = [1,2,3];

// function getDefinition (word) {
// 	var url = {
// 			base: "http://www.dictionaryapi.com/api/v1/references/sd2/xml/",
// 			query: word,
// 			key:"key=5590eec7-58b6-40f8-b912-60c2e61c7f6a"
// 		}

// 	$.ajax({
//         type: "GET",
//         url: url.base+url.query+url.key,
//         dataType: "xml"
//         // jsonpCallback: 'RandomWordComplete'
//     })
//     .done(function( data ) { 
//         console.log(data)
//     });

// }

// getDefinition ("shoes")