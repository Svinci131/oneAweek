/* CURRENTLY IN: javascript/main.js */
var words,
	hiddenWord,
	numGuesses, 
	numSpaces; 

var url = "http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"

//pick a word 
function getWords () {
	$.ajax({
        type: "GET",
        url: url,
        dataType: "jsonp"
        // jsonpCallback: 'RandomWordComplete'
    })
    .done(function( data ) { 
        words = data;
        setUpGame ();
    });
}


function setUpGame (){
	hiddenWord = guess(); 
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

function guess () {
	var randomIndex = Math.floor(Math.random()* words.length);
	return words[randomIndex].word;
}
//make place holder
function drawBlanks () {
	$("#blanks").empty();
	for (var i = 0; i<hiddenWord.length; i++){
		$("#blanks").append("<span class='blank hiddenWord[i]'>_</span>")
	}
}
//creates buttons a-b 
function drawButtons () {
	for (var i = 65; i<=90; i++) {
		var l = String.fromCharCode(i);
		$(".game").append("<button class='letter'>"+l+"</buton>");
	}
}
//updateGuesses--checks win or lose and updates guess
function updateGuesses () {
	if (numGuesses === 1) {
		alert("LOSE!!!!")
		hang ()
	}
	if (numSpaces === 0) {
		alert("WIN!!!!")
		getWords ()
	}
	else {
		$("#remainingGuesses").html(""+numGuesses);
	}
}

function hang () {
	$(".guy").each (function (){
		$(this).css("border", "1px solid red")
		$(this).css("background-color", "red")
		var position = $(this).css("top");
		position = position.substring(0,position.length-2);
		position = parseInt(position);
		position+=100
		$(this).css("top", position);
	})
	$(".rope2").css("visibility", "initial")
}

////event based code
drawButtons ();
getWords ();

$(".game button").click (function (){
	var buttonletter = $(this).html();
	var isRight = false; 
	for (var i = 0; i<hiddenWord.length; i++){
		if (hiddenWord[i] === buttonletter.toLowerCase()) {
			$("#blanks span").eq(i).html(buttonletter); 
			isRight = true
			numSpaces --
		}
	}
	if (!isRight){
		//take away a guess 
		numGuesses --
		//draw the little guy
		//console.log("here", guy[numGuesses].split(" "), guy[numGuesses].split(" ").length )
		// if (guy[numGuesses].split(" ").length > 1){
		// 	console.log("here", guy[numGuesses])
		// 	$("."+guy[numGuesses]+".right").css("visibility","initial")
		// 	$("."+guy[numGuesses]+".right").css("color","green")
		// }
		// else {
			$("."+guy[numGuesses]).css("visibility","initial")
		// }
		
	}
	$(this).attr( "disabled", "disabled" );
	updateGuesses ();
});