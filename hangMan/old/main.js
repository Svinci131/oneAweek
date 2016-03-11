var words,
	hiddenWord,
	numGuesses, 
	numSpaces; 
var key = "a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
var url = "http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
//var searchURL = "http://api.wordnik.com/v4/words.json/reverseDictionary?query=jonquil&includeSourceDictionaries=%20wiktionary%20webster%20wordnet%20ahd%20century&minCorpusCount=5&maxCorpusCount=-1&minLength=1&maxLength=-1&includeTags=false&skip=0&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
var searchURL = {
	url_base: "http://api.wordnik.com/v4/words.json/reverseDictionary",
	args: {
		// query: "jonquil",
		includeSourceDictionaries: "wiktionary%20webster%20wordnet%20ahd%20century",
		minCorpusCount:"5",
		maxCorpusCount:"-1",
		minLength:"1",
		maxLength:"-1",
		includeTags:"false",
		skip:"0",
		limit:"10",
		api_key: key
	}
}

function makeSearchCall(searchQuery) {
  var _localArgs = {
     url: searchURL.url_base,
     data: $.extend({}, searchURL.args, { query: searchQuery }),
     dataType: 'jsonp'
  };

  return $.ajax( _localArgs );
}
//call search api, set definition and call setup Game
function getDefinitions (word) {
	makeSearchCall(word).done(function(data){
		 var definition = {
	        	results: data.results,
	        	total: data.totalResults
	        }
	      words[0].definition = definition
	      console.log("here", words)
	      setUpGame ();
	})
}
//call word api, set words, and call definition
function getWords () {
		$.ajax({
	        type: "GET",
	        url: url,
	        dataType: "jsonp"
	        // jsonpCallback: 'RandomWordComplete'
	    })
	    .done(function( data ) { 
	        words = data;
	        getDefinitions (data[0].word) 
	    });
}
//check definition, set variables, set up board
function setUpGame ( data ){
	//check to make if the word has a valid definition, if not search again
	if (words[0].definition.total === 0){
		getWords ()
	}
	else {

		hiddenWord = words[0].word; 
		numGuesses = 7; 
		numSpaces = hiddenWord.length, 
		guy = {
				6: "head", 
				5: "torso",
				4: "arm-right", 
				3: "arm",
				2: "leg-right", 
				1: "leg"
			}
		console.log(hiddenWord)
		drawBlanks (); 
		updateGuesses ();

	}
}

//make place holders for letters
function drawBlanks () {
	$("#blanks").empty();
	for (var i = 0; i<hiddenWord.length; i++){
		if (hiddenWord[i] === "-" || hiddenWord[i] === "'" || hiddenWord[i] === " " ) {
			$("#blanks").append("<span class='blank hiddenWord[i]'>"+hiddenWord[i]+"</span>")
		}
		else {
			$("#blanks").append("<span class='blank hiddenWord[i]'>_</span>")
		}
	}
}
//creates buttons a-b 
function drawButtons () {
	$(".keys").empty();
	for (var i = 65; i<=90; i++) {
		var l = String.fromCharCode(i);
		$(".keys").append("<button class='ui inverted grey button'>"+l+"</buton>");
	}
}
//updateGuesses--checks win or lose and updates guess
function updateGuesses () {
	if (numGuesses === 1) {
		hang ()
		gameOver()
	}
	if (numSpaces === 0) {
		free()
		gameOver()

		// getWords ()
	}
	else {
		$("#remainingGuesses").html(""+numGuesses);
	}
}

//drop the little guy
function hang () {
	$(".guy").each (function (){
    	$(this).css("box-shadow", "0 0 0 2px #ff695e inset!important");
		$(this).css("border", "1px solid #ff695e")
		$(this).css("background-color", "transparent")
		var position = $(this).css("top");
		position = position.substring(0,position.length-2);
		position = parseInt(position);
		position+=100
		$(this).css("top", position);
	})
	$(".rope2").css("visibility", "initial")
}
//drop the little guy
function free () {
	$(".gallows").children().each(function(i, el){
		$(el).css("visibility","initial")
		$(".rope2").css("visibility","hidden")
	})
	$(".guy").each (function (){
		var position = $(this).css("top");
		position = position.substring(0,position.length-2);
		position = parseInt(position);
		position+=28
		$(this).css("top", position);
	});
}
//show word and definition
function gameOver() {
	$("#playAgain").css("visibility","initial")
	for (var i = 0; i<hiddenWord.length; i++){
		$("#blanks span").eq(i).html(hiddenWord[i].toUpperCase()); 
	}
	$(".keys").html(" ")
	for (key in words[0].definition.results) {
		$(".keys").prepend("<p class='definition'>"+words[0].definition.results[key].text+"<br><em class>"+words[0].definition.results[key].partOfSpeech+"</em><br>   -"+words[0].definition.results[key].attributionText+"</p>")
	}
}

////event based code
drawButtons ();
getWords ();

$(".keys button").click (function (){
	var buttonletter = $(this).html();
	var isRight = false; 
	for (var i = 0; i<hiddenWord.length; i++){
		if (hiddenWord[i].toLowerCase() === buttonletter.toLowerCase()) {
			$("#blanks span").eq(i).html(buttonletter); 
			isRight = true
			numSpaces --
		}
	}
	if (!isRight){
		//take away a guess 
		numGuesses --
		$("."+guy[numGuesses]).css("visibility","initial")
	}
	$(this).attr( "disabled", "disabled" );
	updateGuesses ();
});

$("#playAgain").on("click", function() {
	drawButtons ();
	getWords ();
})