var crystalNumberArray = [];
var totalScore = 0;
var wins = 0;
var losses = 0;
var randomNum = 0;
var numDOM = $("#random_start_number");
var scoreDOM = $("#total_score");
var lossDOM = $("#losses");
var winDOM = $("#wins");
var playCount = 0;
var gameOn = false;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

//>>> This function returns true if the letter has already been guessed by the user.
function numberInArray(array, value) {
	var count = 0 
	for (var i = 0; i < array.length; i++) {
		if (array[i] == value) count++;
	}
	if (count === 2) {
		console.log(array);
		array.pop();
		console.log(count===2);
		console.log(array);
		return true;
	}	
	else {
		return false;
		console.log(array);
	}

}

function crystalShuffle() {
	var count = 1;
	var frame = setInterval(shuffle, 200);

	function shuffle() {
		
		if ((count < 5) && (count%2 != 0)) {
		
			console.log($("#crystal" + count).css("order"));
			$("#crystal" + count).css("order", "1");
			$("#crystal" + count).css("width", "30%");
			$("#crystal" + count).css("opacity", "1");

			var crystalAudio = new Audio("assets/audio/crystal" + count + ".mp3");
			crystalAudio.play();
			count++;
		} 

		else if ((count < 5) && (count%2 === 0)) {
			
			console.log($("#crystal" + count).css("order"));
			$("#crystal" + count).css("order", "1");
			$("#crystal" + count).css("width", "25%");
			$("#crystal" + count).css("opacity", "1");
			var crystalAudio = new Audio("assets/audio/crystal" + count + ".mp3");
			crystalAudio.play();
			count++;
		}

		else {
			console.log("stop");
			console.log(count);
			$(".crystals-grp").css("width", "30%");
			$("#crystal1").css("order", "4");
			$("#crystal2").css("order", "3");
			$("#crystal3").css("order", "2");
			$("#crystal4").css("order", "1");
			clearInterval(frame);
		}
	}	
}



function generateCrystalNumber() {


	
	for (var i = 1; crystalNumberArray.length < 4; i++) {
		var crystalId = $("#crystal" + i);	
		crystalId.attr('value', getRandomIntInclusive(1,12));
		var crystalNum = crystalId.attr('value');
		crystalNumberArray.push(crystalNum);
		crystalNum = crystalNumberArray[crystalNumberArray.length - 1];
	
		if (numberInArray(crystalNumberArray, crystalNum)) {
			numberInArray(crystalNumberArray, crystalNum);
			crystalId.attr('value', getRandomIntInclusive(1,12));			
			crystalNum = crystalId.attr('value');
			crystalNumberArray.push(crystalNum);
			crystalNum = crystalNumberArray[crystalNumberArray.length];
		}

		console.log(crystalNumberArray);
	}
}

function generateGameStartNumber() {
	numDOM.attr('value', getRandomIntInclusive(19,120));
	randomNum = numDOM.attr('value');
	// numDOM.text(randomNum);
	var interval = setInterval(frame, 20);
	var numMatch = 0;
	var num = parseInt(randomNum);

	function frame() {	
		
		if (numMatch === num) {
			
			clearInterval(interval);
			$("#random_start_number").css("font-size", "140px");
			$("#random_start_number").css("opacity", ".4");
			numDOM.text(num);

		} else {
			numMatch++;
			$("#random_start_number").css("font-size", "140px");
			$("#random_start_number").css("opacity", ".4");
			numDOM.text(numMatch);
		}	
	}
}


function gameStart() {
	playCount++;
		
	setTimeout(function() {
		if (playCount > 1) {
			numDOM.text("Click here to play again!");
			numDOM.css("font-size", "40px");
			numDOM.css("opacity", "1");
			$(".crystals-grp").css("opacity", ".5");
			$(".crystals-grp").css("width", "25%");
		}
	}, 4000);
	
	totalScore = 0;
	scoreDOM.text("Score: 0");

}
$("#random_start_number").click(function () {
gameOn = true;
generateCrystalNumber();
generateGameStartNumber();
crystalShuffle();
crystalShuffle();
setTimeout(crystalShuffle, (parseInt(randomNum)*20)-(200*4));

});

$(".crystals-grp").on("click", function() {
	if (gameOn === true) {

		$(".crystals-grp").css("width", "25%");
		$(this).css("width", "45%");
		
		totalScore = totalScore + parseInt($(this).attr("value"));
	   
	    scoreDOM.text("Score: " + totalScore); 

	    if (totalScore == randomNum) {
	    	alert("you win!");
	    	wins++;
	    	numDOM.text("You win!");
			numDOM.css("font-size", "40px");
	    	var winAudio = new Audio("assets/audio/win2.mp3");
			winAudio.play();
	    	winDOM.text("Wins: " + wins);
	    	gameStart();
	    	gameOn = false;

	    }

	    if (totalScore > randomNum) {
	    	alert("you lose!")
	    	losses++;
	    	numDOM.text("You lose!");
			numDOM.css("font-size", "40px");
	    	var loseAudio = new Audio("assets/audio/lose2.mp3");
			loseAudio.play();
	    	lossDOM.text("Losses: " + losses);
	    	gameStart();
	    	gameOn = false;
	    }
	} else {
		null
	}

});

gameStart();