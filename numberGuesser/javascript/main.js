/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
$(document).ready (function (){
	var playersGuess,
	    winningNumber,
	    finalAnswer,
	    error,
	    pastGuesses = [];

	/* **** Guessing Game Functions **** */

	// Generate the Winning Number
	function generateWinningNumber(){
		return Math.ceil(Math.random() * (1,100));
	}

	// Fetch the Players Guess
	function playersGuessSubmission(){
		//if wrong error 
		playersGuess = parseInt($("input").val());
		error = false; 
		$("input").val('')
		$(".text").empty()
		
	}

	function checkErrors () {
	
		// if (playersGuess > 100) { 
		// 	$(".text").append ("<p style='color:white'>Remember between 1 - 100!</p>")
		// }
		// else {
			checkGuess;
		//}
		
	}
	
	
    // Check if the Player's Final Answer
    function checkFinal(){
    	playersGuessSubmission();
    	if (winningNumber === playersGuess) {
    		$(".text").append ("<p style='color:white'>VICTORY!!!!!</p>")
    		$(".text").append ("<p style='color:white'>"+playersGuess+"</p>")
    	}
    	else if (playersGuess > 100) {
			$(".text").append ("<p style='color:white'>Remember between 1 - 100!</p>")
		}
		else if (isNaN(playersGuess)) {
			$(".text").append ("<p style='color:white'>Not a number</p>")
		}
    	else {
    		$(".text").append ("<p style='color:white'>Sorrow and Defeat</p>")
    	}
    	$("#hint").attr("disabled", "disabled")
    	$("#submit").attr("disabled", "disabled")
    	$("input").attr("readonly", true)
    }
	// Check if the Player's Guess is the winning number 
	function checkGuess() {
		playersGuessSubmission();
		if (winningNumber === playersGuess) {
			$(".text").append ("<p style='color:white'>Scorching!!!</p>")
		}
		else if (playersGuess > 100) {
			$(".text").append ("<p style='color:white'>Remember between 1 - 100!</p>")
		}
		else if (isNaN(playersGuess)) {
			$(".text").append ("<p style='color:white'>Not a number</p>")
		}
		else {
			WarmerOrColder(); 
		}
	}
	// Create a provide hint button that provides additional clues to the "Player"
	function provideHint() {
		$(".text").empty()
		if (pastGuesses.length === 0) {
			$(".text").prepend("<p style='color:white'>Really? You just started. Think of the children.</p>");
		}
		else {
			$(".text").prepend ("<p style='color:white'><em>PSSSST! "+lowerOrHigher()+"</em></p>")
		}
	}
	// Determine if the next guess should be a lower or higher number
	function lowerOrHigher() {
		var direction;
        if (playersGuess < winningNumber) {
        	direction = "Higher..";
        }
        else {
        	direction = "Lower..";
        }

        return direction
    }
	// Determine if the current guess is closer than the last guess
	function WarmerOrColder() {
		//if its the first guess just say cold for now
		if (pastGuesses.length === 0) {
			$(".text").append ("<p style='color:white'>Cold</p>")
			pastGuesses.push(playersGuess)
		}
		else {
			var lastGuess = pastGuesses[pastGuesses.length-1],
				lastDiff  = Math.abs(winningNumber - pastGuesses[pastGuesses.length-1]);
				currDiff  = Math.abs(winningNumber - playersGuess)
			if (currDiff > lastDiff) {
				if (currDiff >= 80){
					$(".text").append ("<p style='color:white'>BRRRRRRRR</p>")
				}
				else {
					$(".text").append ("<p style='color:white'>Colder</p>")
				}
				
			}
			else {
				if (currDiff <= 10){
					$(".text").append ("<p style='color:white'>HOT</p>")
				}
				else {
					$(".text").append ("<p style='color:white'>Warmer</p>")
				}
				
			}
			pastGuesses.push(playersGuess);
		}	
	}
	// Allow the "Player" to Play Again
	function playAgain(){
		location.reload()
	}
/* **** Event Listeners/Handlers ****  */
	winningNumber = generateWinningNumber()
	/* **** starting ****  */

	$("#guess").on ("click", function(){
		checkGuess()
	});
	$("input").on ("keypress", function(e){
		if (e.which === 13) {
			checkGuess()
		}
	});
	$("#again").on ("click", function (){
		playAgain();
	});
	$("#hint").on ("click", function (){
		provideHint();
	});
	$("#submit").on ("click", function (){
		checkFinal();
	});

});
