/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
$(document).ready (function (){
	var playersGuess,
	    winningNumber,
	    finalAnswer,
	    error,
	    pastGuesses = [];

	/* **** Guessing Game Functions **** */

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


	// Generate the Winning Number
	function generateWinningNumber(){
		return Math.ceil(Math.random() * (1,100));
	}

	// Fetch the Players Guess
	function playersGuessSubmission(){
		playersGuess = parseInt($("input").val());
		error = false; 
		$("input").val('')
		$(".text").empty()	
	}
	
    // Check if the Player's Final Answer
    function checkFinal(){
    	playersGuessSubmission();  
    	//check errors
    	if (playersGuess > 100) {
			$(".text").append ("<p style='color:white'>Remember between 1 - 100!</p>")
		}
		else if (isNaN(playersGuess)) {
			$(".text").append ("<p style='color:white'>Not a number</p>")
		}

		else {
			var winStatus;
			if (winningNumber === playersGuess) {
	    		winStatus = "VICTORY";   
    		}
    		else {
    			winStatus = "Sorrow and Defeat";
    		}
    		gameOver(winStatus);
		}
    }
	// Check if the Player's Guess is the winning number 
	function checkGuess() {
		playersGuessSubmission();
		//check win
		if (winningNumber === playersGuess) {
			$(".thermometer").html (""+playersGuess+"&deg")
			$("#therm").removeAttr('class');
			$("#therm").addClass("thermometer scorching");
			$(".text").append ("<p style='color:white'>Scorching!!!</p>")
		}
		//check errors
		else if (playersGuess > 100) {
			$(".text").append ("<p style='color:white'>Remember between 1 - 100!</p>")
		}
		else if (isNaN(playersGuess)) {
			$(".text").append ("<p style='color:white'>Not a number</p>")
		}
		//check and update
		else {
			$(".thermometer").html (""+playersGuess+"&deg")
			WarmerOrColder(); 
		}
	}
	
	// Determine if the current guess is closer than the last guess
	function WarmerOrColder() {
		//if its the first guess just say cold for now
		if (pastGuesses.length === 0) {
			$(".text").html ("Warm")
			pastGuesses.push(playersGuess)
		}
		else {
			var lastGuess = pastGuesses[pastGuesses.length-1],
				lastDiff  = Math.abs(winningNumber - pastGuesses[pastGuesses.length-1]);
				currDiff  = Math.abs(winningNumber - playersGuess)
				$("#therm").removeAttr('class');
				$("#therm").addClass("thermometer");

			if (currDiff > lastDiff) {
				if (currDiff >= 80){
					$(".text").html ("BRRRRRRRR")
					$("#therm").addClass("BRRRRRRRR");
				}
				else {
					$(".text").html ("Colder")
					$("#therm").addClass("Colder");
				}
			}
			else {
				if (currDiff <= 10){
					$(".text").html("HOT")
					$("#therm").addClass("Hot");
				}
				else {
					$(".text").html("Warmer")
					$("#therm").addClass("Warmer");

				}
				
			}
			pastGuesses.push(playersGuess);
		}	
	}
	// Allow the "Player" to Play Again
	function playAgain(){
		location.reload()
	}
	//Show GameOver Screen
	function gameOver (text) {
		$("#main").css('display', 'none')
		$(".gameOver-title h1").html(text)
		$(".gameOver").css('display', 'initial')
	}

/* **** Event Listeners/Handlers ****  */
	winningNumber = generateWinningNumber()
	/* **** starting ****  */

	$("#guess").on ("click", function(){
		checkGuess()
		console.log(winningNumber)
	});
	$("input").on ("keypress", function(e){
		if (e.which === 13) {
			checkGuess()
		}
	});
	$(".again").on ("click", function (){
		playAgain();
	});
	$("#hint").on ("click", function (){
		provideHint();
	});
	$("#submit").on ("click", function (){
		checkFinal();
	});

});
