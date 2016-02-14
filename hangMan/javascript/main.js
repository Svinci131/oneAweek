/* CURRENTLY IN: javascript/main.js */
var words,
	hiddenWord,
	numGuesses, 
	numSpaces; 
//pick a word 
function setUpGame (){
	words=["guy","code","javascript", "math", "bread","orange","cows"]; 
	hiddenWord = guess(); 
	numGuesses = 7; 
	numSpaces = hiddenWord.length, 
	guy = {
			6: "head", 
			5: "torso",
			4: "arm", 
			3: "arm .right",
			2: ".leg", 
			1: "leg .right"  
		},
	drawBlanks (); 
	updateGuesses ();
}

function guess () {
	var randomIndex = Math.floor(Math.random()* words.length);
	return words[randomIndex];
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
	if (numGuesses === 0) {
		alert("LOSE!!!!")
		setUpGame();
	}
	if (numSpaces === 0) {
		alert("WIN!!!!")
		setUpGame();
	}
	else {
		$("#remainingGuesses").html(""+numGuesses);
	}
}
// function reload () {
// 	location.reload()
// }
////event based code
drawButtons ();
setUpGame();

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
		if (guy[numGuesses].split(" ").length > 1){
			$("."+guy[numGuesses]+".right")
		}
		$("."+guy[numGuesses]).css("visibility","initial")
	}
	$(this).attr( "disabled", "disabled" );
	updateGuesses ();
});